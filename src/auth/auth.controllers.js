import userControllers from '../users/users.controllers.js';
import { comparePassword } from '../utils/crypts.js';

export const loginUser = (email, password) => {
    const user = userControllers.getUserByEmail(email);
    if (!user) return null;

    const verified_password = comparePassword(password, user.password);
    if (!verified_password) return null;

    return user;
}