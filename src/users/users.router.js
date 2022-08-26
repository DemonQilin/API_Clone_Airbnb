import { Router } from 'express';
import userServices from './users.http.js';
import postsServices from '../posts/post.http.js';
import passport from 'passport';
import multer from 'multer';
import middlewareRole from '../middleware/role.middleware.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, './images')
        } catch (error) {
            cb(error);
        }
    },
    filename(req, file, cb) {
        try {
            cb(nu, file.originalname)
        } catch (error) {
            cb(error)
        }
    }
});
const upload = multer({ storage });

router.use('/me', passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(userServices.getAll)
    .post(userServices.register);

router.post('/upload', upload.single('profile_img'), (req, res) => {
    res.status(200).json(req.file);
});


router.route('/me')
    .get(userServices.getMyUser)
    .put(userServices.editMyUser)
    .delete(userServices.removeMyUser);

router.route('/:id')
    .get(userServices.getById)
    .delete(passport.authenticate('jwt', { session: false }), middlewareRole, userServices.remove)
    .put(passport.authenticate('jwt', { session: false }), middlewareRole, userServices.editUser);

router.get('/me/posts', postsServices.getMyPosts);

router.route('/me/posts/:id')
    .get(postsServices.getOneOfMyPosts)
    .put(postsServices.editMyPost)
    .delete(postsServices.deleteMyPost);

export default router;