// Dependencias
import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import fs from 'fs';

// Archivos de rutas
import userRouter from './users/users.router.js';
import authRouter from './auth/auth.router.js';
import postRouter from './posts/post.router.js';

// Middlewares
import authMiddleware from './middleware/auth.middleware.js';

// Base de datos
import db from './utils/database.js';
import { initModels } from './models/init_models.js';

// Autenticación
authMiddleware(passport);

// Autenticación base de datos
(async function () {
    initModels();

    await db.authenticate()
        .then(() => console.log('Database authenticated'))
        .catch(err => console.log("No authenticate"));
    
    await db.sync({force: true})
        .then(() => console.log('Database synced'))
        .catch(err => console.log('No sync'))
})();


// Configuración inicial
const app = express();
const port = process.env.PORT;
const router = express.Router();

// Habilita el req.body
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'All ok!' });
});

app.use('/api/v1', router);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);

// Endpoint imagenes de perfil
router.get('/uploads/:imgName', (req, res) => {
    try {
        const { imgName } = req.params;
        const { pathname: imgPath } = new URL(`../uploads/${imgName}`, import.meta.url);

        if (!fs.existsSync(imgPath)) throw { message: "Image don't found", status: 404 };

        res.status(200).sendFile(imgPath);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

app.listen(port, () => {
    try {
        console.log(`Server started in http://localhost:${port}`);
    } catch (error) {
        console.log(error.message)
    }
});

export default app;