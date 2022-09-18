import type { NextApiRequest, NextApiResponse } from 'next';
import bcryt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data = 
| { message: string; }
| { 
    token: string; 
    user: {  
        email: string; 
        name: string; 
        role: string; 
    }; 
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return loginUser(req, res);
	}
	res.status(200).json({ message: 'Example' });
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
	const { email = '', password = '' } = req.body;

	await db.connect();
	const user = await User.findOne({ email });
	await db.disconnect();

	if (!user) {
		return res.status(404).json({ message: 'El correo no está registrado' });
	}
    
    if (!bcryt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'La contraseña es incorrecta' });
    }

    const { _id, role, name } = user;

    const token = jwt.signToken(_id, email)

    res.status(200).json({
        token, 
        user: {
            email, role, name 
        }
    })
};
