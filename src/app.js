// Dependencias
import 'dotenv/config';
import express from 'express';

// Archivos de rutas
import userRouter from './users/users.router.js';
import authRouter from './auth/auth.router.js';
import postRouter from './posts/post.router.js';
import passport from 'passport';
import authMiddleware from './middleware/auth.middleware.js';

// Autenticación
authMiddleware(passport);

// Configuración inicial
const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'All ok!' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
    try {
        console.log(`Server started in http://localhost:${port}`);
    } catch (error) {
        console.log(error.message)
    }
});

export default app;