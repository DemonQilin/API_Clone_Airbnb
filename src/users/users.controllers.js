import { Users } from '../models/user.model.js';
import { hashPassword } from '../utils/crypts.js';

    /*{
        email: 'velezloaizaesteban9012015@gmail.com',
        password: Juanesito0618++
    }, {
        email: 'susi22kira@gmail.com',
        password: Susi22kira02**
    },
    {
        email: rudimvelez@gmail.com,
        password: MiClaveScreta48
    },{
        email: bethyrum@gmail.com,
        password: MiMamaLaMasLinda14++
    }*/

const getAllUsers = () => {

    const data = Users.findAll({
        attributes: {
            exclude: ['password']
        }
    });

    return data
};

const getUserById = async id => {
    const data = await Users.findOne({
        where: { id },
        attributes: {
            exclude: ['password']
        }
    });

    return data;
};

const getUserByEmail = async email => {
    const data = await Users.findOne({
        where: {
            email
        }
    });

    return data;
};

const createUser = async data => {
    const { first_name, last_name, email, password, phone, birthday_date,profile_img, country
    } = data;

    const newUser = await Users.create({
        first_name,
        last_name,
        email,
        password: hashPassword(password),
        phone,
        birthday_date,
        profile_img,
        country,
        id: undefined,
        verified: undefined,
        active: undefined
    });

    return newUser;
}

const editUser = async (id, data) => {
    const { first_name, last_name, email, phone, birthday_date, rol, profile_img, country } = data;

    const response = await Users.update(
        {
            first_name,
            last_name,
            email,
            phone,
            birthday_date,
            rol,
            profile_img,
            country
        },
        {
            where: { id }
        }
    );

    return response;
};

const deleteUser = async id => {
    const data = await Users.destroy({
        where: { id }
    });

    return data
};

const editProfileImg = async (userId, imgUrl) => {
    const response = await Users.update(
        {
            profile_img: imgUrl
        },
        {
            where: { id: userId }
        }
    );
    
    return response;
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    editUser,
    deleteUser,
    editProfileImg
}