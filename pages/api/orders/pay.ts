import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';
import { db } from '../../../database';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST': 
            return payOrder(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
    }
}

const getPaypalBearerToken = async (): Promise<string|null> => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64Token}`
            }
        })

        return data.access_token;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    // TODO: valdar sesión del usuario
    // TODO: validar mongoID

    const paypalBearerToken = await getPaypalBearerToken();    

    if (!paypalBearerToken) {
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }
    
    const { transactionId = '', orderId = '' } = req.body;

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    })

    if (data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Orden no reconocida' })
    }
    
    await db.connect();
    const dbOrder = await Order.findById(orderId);
    
    if (!dbOrder) {
        await db.disconnect();
        return res.status(404).json({ message: 'No se encontró la orden' })
    }
    
    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect();
        return res.status(400).json({ message: 'Los montos de paypal y nuestra orden no coinciden' })
    }
    
    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    
    dbOrder.save();
    await db.disconnect();

    return res.status(400).json({ message: paypalBearerToken })
}