import userControllers from '../users/users.controllers.js';
import { comparePassword } from '../utils/crypts.js';

export const loginUser = async (email, password) => {
    const response = await userControllers.getUserByEmail(email);
    if (!response) throw { message: "Invalid Email" };

    const { dataValues: user } = response;

    const verified_password = comparePassword(password, user.password);
    if (!verified_password) throw {message: "Invalid Credentials"};

    return user;
}