import 'dotenv/config';
import userController from './users.controllers.js';

const getAll = async (req, res) => {
    try {
        const data = await userController.getAllUsers();
    
        res.status(200).json({
            items: data.length,
            response: data
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await userController.getUserById(id);

        if (!data) throw { message: "User don't found" };
        
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const register = async (req, res) => {
    try {
        const data = req.body;
    
        if (!Object.keys(data).length) throw { message: 'Missing data' };
        if (!(
            data.first_name &&
            data.last_name &&
            data.email &&
            data.password &&
            data.phone &&
            data.birthday_date &&
            data.country
        )) throw { message: `All fields must be completed` };
    
        const newUser = await userController.createUser(data)
            .then(({ dataValues: { password, ...res } }) => res);
        
        res.status(201).json({ message: `User succesfully created`, newUser });
    } catch (error) {
        res.status(400).json({ message: (error.errors && error.errors[0]?.message) || error.message });
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

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        
        if (!Object.keys(data).length) throw { message: 'Missing data' };

        if (!(
            data.first_name &&
            data.last_name &&
            data.email &&
            data.birthday_date &&
            data.country &&
            data.rol
        )) throw {
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "examle@examle.com",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                rol: "normal"
            }
        };


        const response = await userController.editUser(id, data);
        if (!response[0]) throw { message: "Invalid ID" };

        res.status(200).json({ message: 'User was succesfully edited' });
    } catch (error) {
        res.status(400).json({message: error.message});
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

const editMyUser = async (req, res) => {
    try {
        const id = req.user.id;
        const data = req.body;
    
        if (!Object.keys(data).length) throw { message: 'Missing data' };
        
        if (!(
            data.first_name &&
            data.last_name &&
            data.email &&
            data.birthday_date &&
            data.country &&
            data.active
        )) throw {
            message: "All fields must be completed",
            fields: {
                first_name: "My Name",
                last_name: "My Last Name",
                email: "examle@examle.com",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                active: true
            }
        };

        const response = await userController.editUser(id, data);
        if (!response[0]) throw { message: "Invalid ID" };

        return res.status(200).json({ message: 'User was succesfully edited'});
    } catch (error) {
        res.status(400).json({ message: error.message, fields: error.fields || undefined});
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
        const userId = req.user.id;
        const imgPath = `http://${req.hostname}:${process.env.PORT}/api/v1/uploads/${req.file.filename}`;

        const response = await userController.editProfileImg(userId, imgPath);
        if (!response[0]) throw { message: "Invalid ID" };

        res.status(200).json({ message: 'Profile image was succesfully edited' });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }

};

export default {
    getAll,
    getById,
    register,
    remove,
    editUser,
    getMyUser,
    editMyUser,
    removeMyUser,
    profileImg
}