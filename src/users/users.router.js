import { Router } from 'express';
import userServices from './users.http.js';
import passport from 'passport';
import { middlewareRole } from '../middleware/role.middleware.js';
import { uploadProfile } from '../utils/multer.js';

const router = Router();

router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/', middlewareRole('admin', 'host'), userServices.getAll);

router.route('/me')
    .get(userServices.getMyUser)
    .put(userServices.editUser(false))
    .patch(userServices.editUser(true))
    .delete(userServices.removeMyUser);

router.route('/:id')
    .get(middlewareRole('admin', 'host'), userServices.getById)
    .put(middlewareRole('admin'), userServices.editUser(false))
    .patch(middlewareRole('admin'), userServices.editUser(true))
    .delete(middlewareRole('admin'), userServices.remove);

router.patch('/me/profile-img', uploadProfile, userServices.profileImg);

export default router;