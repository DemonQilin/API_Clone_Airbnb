import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { loginUser } from './auth.controllers.js';
import { errorHandlerHttp } from '../utils/error.handler.js';

const wordSecret = process.env.JWT_KEY;
const login = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email || !data.password) throw { message: 'Missing data', status: 400};
        
        const response = await loginUser(data.email, data.password);

        const token = jwt.sign(JSON.stringify({
            id: response.id,
            email: response.email,
            role: response.role.name
        }), wordSecret);

        return res.status(200).json({ message: 'Successful authentication', token });

    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export default {
    login
}