import { Router } from 'express';
import authServices from './auth.http.js'
import usersServices from '../users/users.http.js';

const router = Router();

router.post('/login', authServices.login);
router.post('/register', usersServices.register);

export default router;