import { Router } from 'express';
import userServices from './users.http.js';
import postsServices from '../posts/post.http.js';
import passport from 'passport';
import middlewareRole from '../middleware/role.middleware.js';
import upload from '../utils/multer.js';

const router = Router();

router.use('/me', passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(userServices.getAll);

router.route('/me')
    .get(userServices.getMyUser)
    .put(userServices.editMyUser)
    .delete(userServices.removeMyUser);

router.post('/me/profile-img', upload.single('profile_img'), userServices.profileImg);

router.get('/me/posts', postsServices.getMyPosts);
    
router.route('/me/posts/:id')
    .get(postsServices.getOneOfMyPosts)
    .put(postsServices.editMyPost)
    .delete(postsServices.deleteMyPost);

router.route('/:id')
    .get(userServices.getById)
    .delete(passport.authenticate('jwt', { session: false }), middlewareRole, userServices.remove)
    .put(passport.authenticate('jwt', { session: false }), middlewareRole, userServices.editUser);

export default router;