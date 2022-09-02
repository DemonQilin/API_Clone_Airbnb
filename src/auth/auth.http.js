import { loginUser } from './auth.controllers.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email || !data.password) throw { message: 'Missing data' };
        
        const response = await loginUser(data.email, data.password);

        const token = jwt.sign(JSON.stringify({
            id: response.id,
            email: response.email,
            rol: response.rol
        }), 'academlo');

        return res.status(200).json({ message: 'Todo melo', token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }



};

export default {
    login
}