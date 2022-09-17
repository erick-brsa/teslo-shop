import type { NextApiRequest, NextApiResponse } from 'next';
import bcryt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return checkJWT(req, res);
	}
	res.status(200).json({ message: 'Example' });
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken(token);

        await db.connect();
        const user = await User.findById(userId);
        await db.disconnect();

        if (!user) {
            return res.status(404).json({ message: 'No existe el usuario'});
        }   
        
        const { _id, email, role, name } = user;
    
        return res.status(200).json({
            token: jwt.signToken(_id, email),
            user: {
                email, 
                role, 
                name
            }
        })

    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no válido'
        })
    }
};

