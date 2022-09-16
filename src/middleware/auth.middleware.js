import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
import userController from '../users/users.controllers.js';

const wordSecret = process.env.JWT_KEY;
export default function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: wordSecret
    };

    passport.use(
        new JwtStrategy(opts, async (decoded, done) => {
            try {
                const response = await userController.getUserById(decoded.id);
                if (!response) return done(null, false);
                
                console.log('decoded jwt', decoded);
                return done(null, decoded);
            } catch (error) {
                done(error.message);
            }
        })
    )
}