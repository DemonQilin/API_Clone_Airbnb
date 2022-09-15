import { Router } from "express";
import passport from "passport";
import { middlewareRole } from "../middleware/role.middleware.js";
import * as accommodationServices from './accommodations.http.js';

const router = Router();

router.route('/')
    .get(accommodationServices.getAll)
    .post(passport.authenticate('jwt', { session: false }), middlewareRole('host'), accommodationServices.create);

router.route('/:id')
    .get(accommodationServices.getOne)
    .put(passport.authenticate('jwt', { session: false }), middlewareRole('admin', 'host'), accommodationServices.update(false))
    .patch(passport.authenticate('jwt', { session: false }), middlewareRole('admin', 'host'), accommodationServices.update(true))
    .delete(passport.authenticate('jwt', { session: false }), middlewareRole('admin', 'host'), accommodationServices.remove);

export default router;