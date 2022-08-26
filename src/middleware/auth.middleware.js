import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userController from '../users/users.controllers.js';

export default function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo"
    };

    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            const data = userController.getUserById(decoded.id);

            if (!data) return done(null, false);

            console.log('decoded jwt', decoded);
            return done(null, decoded);
        })
    )
}