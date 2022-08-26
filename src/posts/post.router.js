import { Router } from 'express';
import postsServices from './post.http.js';
import passport from 'passport';
import middlewareRole from '../middleware/role.middleware.js';

const router = Router();

router.route('/')
    .get(postsServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), postsServices.create);

router.route('/:id')
    .get(postsServices.getOne)
    .put(passport.authenticate('jwt', { session: false }), middlewareRole, postsServices.edit)
    .delete(passport.authenticate('jwt', { session: false }), middlewareRole, postsServices.remove);

export default router;