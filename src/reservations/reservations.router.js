import { Router } from "express";
import passport from 'passport';
import * as reservationServices from './reservations.http.js';

const router = Router();

router.use('/:id', passport.authenticate('jwt', { session: false }));

router.route('/:id')
    .delete(reservationServices.cancel)
    .patch(reservationServices.finish);

export default router;