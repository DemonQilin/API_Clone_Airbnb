import { loginUser } from './auth.controllers.js';
import jwt from 'jsonwebtoken';

const login = (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) return res.status(400).json({ message: 'Missing data' });

    const response = loginUser(data.email, data.password);
    if (!response) return res.status(401).json({ message: 'Invalid Credentials' });

    const token = jwt.sign(JSON.stringify({
        id: response.id,
        email: response.email,
        rol: response.rol
    }), 'academlo');

    return res.status(200).json({ message: 'Todo melo', token });
};

export default {
    login
}