import 'dotenv/config';
import { errorHandlerHttp } from '../utils/error.handler.js';
import userController from './users.controllers.js';

const getAll = async (req, res) => {
    try {
        const users = await userController.getAllUsers();
    
        res.status(200).json({
            items: users.length,
            users
        });
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await userController.getUserById(id);

        if (!data) throw { message: "User don't found", status: 404};
        
        res.status(200).json(data.toJSON());
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

const register = async (req, res) => {
    try {
        const data = req.body;
    
        if (!Object.keys(data).length) throw { message: 'Missing data', status: 400 };
        
        if (!(
            data.firstName &&
            data.lastName &&
            data.gender &&
            data.birthdayDate &&
            data.email &&
            data.password &&
            data.country &&
            data.continent
        )) throw {
            message: `All fields should be completed`,
            fields: {
                firstName: "MyName",
                lastName: "MyLastName",
                gender: "MyGender",
                birthdayDate: "YYYY-MM-DD",
                email: "example@gmail.com",
                password: "MySecretPasword123",
                country: "MyCountry",
                continent: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica"
            },
            status: 400
        };
    
        const newUser = await userController.createUser(data);
        
        res.status(201).json({ message: `User succesfully created`, newUser});
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userController.deleteUser(id);
        
        if (!data) throw { message: `Invalid ID` };

        res.status(204).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

const editUser = partial => async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const { role } = req.user;

        const condition = partial
            ? (
                data.firstName ||
                data.lastName ||
                data.gender ||
                data.birthdayDate ||
                data.email ||
                (data.country && data.continent) ||
                data.status ||
                data.verified ||
                (data.phone || data.phone === null) ||
                (data.dni || data.dni === null) ||
                (data.address || data.address === null)
            )
            : (
                data.firstName &&
                data.lastName &&
                data.gender &&
                data.birthdayDate &&
                data.email &&
                (data.country && data.continent) &&
                data.status &&
                (data.phone || data.phone === null) &&
                (data.dni || data.dni === null) &&
                (data.address || data.address === null) &&
                ((role === 'admin' && typeof data.verified === 'boolean') || (role !== 'admin'))
            );
        
        if (!Object.keys(data).length) throw { message: 'Missing data', status: 404};

        if (!condition) throw {
            message: partial ? 'The request must contain at least one of the following fields' : `All fields must be completed`,
            fields: {
                firstName: "MyName",
                lastName: "MyLastName",
                gender: "MyGender",
                birthdayDate: "YYYY-MM-DD",
                email: "example@gmail.com",
                country: "MyCountry",
                continent: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica",
                phone: "MyNumber or null",
                dni: "MyDni or null",
                address: "MyAddress or null",
                status: "active or inactive",
                verified: role === 'admin' ? 'true or false' : undefined
            },
            status: 400
        };

        const response = await userController.editUser(id || req.user.id, data, role);
        if (!response[0]) throw { message: "Invalid ID", status: 404};

        res.status(200).json({ message: 'User was succesfully edited' });
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

const getMyUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await userController.getUserById(id);
        if (!response) throw { message: 'User not found' };
        
        return res.status(200).json(response.dataValues);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const removeMyUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await userController.deleteUser(id);
        
        if (!response) throw { message: 'User ID is invalid' };
        return res.status(204).json({});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

const profileImg = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const file = req.file;

        if (!file && !data.image_id) throw { message: 'Missing data', status: 400 };
        
        const imgPath = file
            ? `http://${req.hostname}:${process.env.PORT}/api/v1/uploads/${req.file.filename}`
            : null;

        const response = await userController.editProfileImg(userId, imgPath, data.image_id);
        if (!response[0]) throw { message: "Profile image wasn't updated" };

        res.status(200).json({ message: 'Profile image was succesfully updated' });
    } catch (error) {
        errorHandlerHttp(res, error);
    }

};

export default {
    getAll,
    getById,
    register,
    remove,
    editUser,
    getMyUser,
    removeMyUser,
    profileImg
}