import { Router } from 'express';
import authServices from './auth.http.js'

const router = Router();

router.post('/login', authServices.login);

export default router;