import { Router } from 'express';
import userServices from './users.http.js';
import passport from 'passport';
import { middlewareRole } from '../middleware/role.middleware.js';
import { uploadProfile } from '../utils/multer.js';

const router = Router();

router.route('/')
    .get(userServices.getAll);

router.use('/me', passport.authenticate('jwt', { session: false }));

router.route('/me')
    .get(userServices.getMyUser)
    .put(userServices.editUser(false))
    .patch(userServices.editUser(true))
    .delete(userServices.removeMyUser);

router.route('/:id')
    .get(userServices.getById)
    .put(passport.authenticate('jwt', { session: false }), middlewareRole('admin'), userServices.editUser(false))
    .patch(passport.authenticate('jwt', { session: false }), middlewareRole('admin'), userServices.editUser(true))
    .delete(passport.authenticate('jwt', { session: false }), middlewareRole('admin'), userServices.remove);

router.patch('/me/profile-img', uploadProfile, userServices.profileImg);

export default router;