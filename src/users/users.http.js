import userController from './users.controllers.js';

const getAll = (req, res) => {
    const data = userController.getAllUsers();

    res.status(200).json({
        items: data.length,
        response: data
    });
};

const getById = (req, res) => {
    try {
        const id = req.params.id;
        const data = userController.getUserById(id);

        if (!data) throw new Error(`El usuario con el id ${id} no existe`);
        if (data) res.status(200).json(data);
    } catch (error) {
        if (error === `El usuario con el id ${id} no existe`) return res.status(404).json({ message: error });

        res.status(400).json({ message: error.message });
    }
};

const register = (req, res) => {
    const data = req.body;

    if (!Object.keys(data).length) return res.status(400).json({ message: 'Missing data' });
    if (!(
        data.first_name &&
        data.last_name &&
        data.email &&
        data.password &&
        data.birthday_date &&
        data.country
    )) return res.status(400).json({ message: `All fields must be completed` });

    const response = userController.createUser(data);
    const { password, ...user } = response;
    return res.status(201).json({ message: `User succesfully created`, user });
};

const remove = (req, res) => {
    const id = req.params.id;
    const data = userController.deleteUser(id);

    if (!data) return res.status(400).json({ message: 'Invalid ID' });
    
    return res.status(204).json({ message: `Deleted user with id: ${id}` });
};

const editUser = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!Object.keys(data).length) return res.status(400).json({ message: 'Missing data' });

    if (!(
        data.first_name &&
        data.last_name &&
        data.email &&
        data.birthday_date &&
        data.country &&
        data.profile_img &&
        data.rol &&
        data.active
    )) return res.status(400).json({
        message: "All fields must be completed",
        fields: {
            first_name: "string",
            last_name: "string",
            email: "examle@examle.com",
            birthday_date: "DD/MM/YYYY",
            country: "string",
            profile_img: "example.com/img/example.jpg",
            active: true
        }
    });

    const response = userController.editUser(id, data);
    if (!response) res.status(400).json({ message: 'ID invalid' });

    const { password, ...user } = response;
    res.status(200).json({ message: 'User was succesfully edited', user });
};

const getMyUser = (req, res) => {
    const { id } = req.user;
    const response = userController.getUserById(id);

    if (!response) return res.status(404).json({ message: 'User not found' });
    
    const { password, ...user } = response;
    return res.status(200).json(user);
    
};

const editMyUser = (req, res) => {
    const id = req.user.id;
    const data = req.body;

    if (!Object.keys(data).length) return res.status(400).json({ message: 'Missing data' });

    if (!(
        data.first_name &&
        data.last_name &&
        data.email &&
        data.birthday_date &&
        data.country &&
        data.profile_img &&
        data.active
    )) return res.status(400).json({
        message: "All fields must be completed",
        fields: {
            first_name: "My Name",
            last_name: "My Last Name",
            email: "examle@examle.com",
            birthday_date: "DD/MM/YYYY",
            country: "string",
            profile_img: "http://example.com/img/example.jpg",
            active: true
        }
    });

    const response = userController.editUser(id, data);
    if (!response) return res.status(400).json({ message: 'ID invalid' });

    const { password, ...user } = response;
    return res.status(200).json({ message: 'User edited succesfully', user });
};

const removeMyUser = (req, res) => {
    const { id } = req.user;
    const response = userController.deleteUser(id);

    if (!response) return res.status(404).json({ message: 'User ID is invalid' });
    return res.status(204).json();
};

export default {
    getAll,
    getById,
    register,
    remove,
    editUser,
    getMyUser,
    editMyUser,
    removeMyUser
}