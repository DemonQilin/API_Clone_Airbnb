import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/crypts.js';

const userDB = [
    {
        id: '042fb8f4-cf93-489e-8357-c888b8265cd9',
        first_name: 'Juanes',
        last_name: 'Velez',
        email: 'velezloaizaesteban9012015@gmail.com',
        password: '$2b$15$p6YxuJ7wuJswfTIPItjtUekfiSSChzExuX59ciVO7.ju5Mn8ELSDu', //Juanesito0618++
        phone: '3217592245',
        birthday_date: '2000-06-18',
        rol: 'admin',
        profile_img: '',
        country: 'Colombia',
        active: true,
        verified: true
    }, {
        id: '9356fbae-ee20-4bee-87f5-2466df0e57be',
        first_name: 'Susana',
        last_name: 'Velez',
        email: 'susi22kira@gmail.com',
        password: '$2b$15$UOALyZCFBOuW7kS8cpdp4eOPrzChn77iWiKtnBmhO8s8doAC1CSqq', //Susi22kira02**
        phone: '3105046500',
        birthday_date: '2001-12-22',
        rol: 'normal',
        profile_img: '',
        country: 'Colombia'
    }
];

const getAllUsers = cb => {
    try {
        return userDB
    } catch (error) {
        cb(error)
    }
};

const getUserById = id => {
    const data = userDB.find(user => user.id === id);

    return data || null;
};

const getUserByEmail = email => {
    const data = userDB.find(user => user.email === email);

    return data || null;
};

const createUser = data => {
    const { first_name, last_name, email, password, phone, birthday_date,profile_img, country
} = data;

    try {
        const newUser = {
            id: uuidv4(), //obligatorio y único
            first_name, //obligatorio
            last_name, //obligatorio
            email, //obligatorio y único
            password: hashPassword(password), //obligatorio
            phone: phone || '', //unico
            birthday_date, //obligatorio
            rol: 'normal', //obligatorio y por defecto 'normal'
            profile_img: profile_img || '',
            country, //obligatorio
            active: true, //obligatorio y por defecto true
            verified: false
        }

        userDB.push(newUser);
        return newUser;
    } catch (error) {
        console.log(error)
    }
}

const editUser = (id, data) => {
    const index = userDB.findIndex(user => user.id === id);
    const { first_name, last_name, email, password, phone, birthday_date, rol, profile_img, country, active } = data;

    try {
        if (index !== -1) {
            userDB[index] = {
                id,
                first_name,
                last_name,
                email,
                password: password ? hashPassword(password) : userDB[index].password,
                phone: phone || '',
                birthday_date,
                rol,
                profile_img: profile_img || '',
                country,
                active,
                verified: false
            }
            
            return userDB[index];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
};

const deleteUser = id => {
    const index = userDB.findIndex(user => user.id === id);

    try {

        if (index !== -1) userDB.splice(index, 1);
        return index !== -1;

    } catch (error) {
        
        console.log(error);
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    editUser,
    deleteUser
}