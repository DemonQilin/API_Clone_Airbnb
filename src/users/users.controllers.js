import { Accommodation } from '../models/accomodations.model.js';
import { Continent } from '../models/continents.model.js';
import { Country } from '../models/countries.model.js';
import { Role } from '../models/roles.model.js';
import { User } from '../models/user.model.js';
import { UserImage } from '../models/users_images.model.js';
import { hashPassword } from '../utils/crypts.js';

const includeUser = [
    {
        model: Role,
        as: 'role',
        attributes: ['name']
    },
    {
        model: Country,
        as: 'country',
        attributes: ['name']
    },
    {
        model: Accommodation,
        as: 'host',
        attributes: ['id', 'title', 'description']
    }
];

const getAllUsers = async () => {
    const data = await User.findAll({
        attributes: {
            exclude: ['password']
        },
        include: includeUser
    });
    return data;
};

const getUserById = async id => {
    const data = await User.findOne({
        where: { id },
        attributes: {
            exclude: ['password']
        },
        include: includeUser
    });
    return data;
};

const getUserByEmail = async email => {
    const data = await User.findOne({
        where: { email },
        include: {
            model: Role,
            as: 'role',
            attributes: ['name'] 
        }
    });
    return data;
};

const createUser = async data => {
    const role_id = await Role.findOne({ where: { name: "guest" } }).then(res => res.id);

    const country_id = await Country.findOrCreate({
        where: { name: data.country },
        defaults: {
            continent_id: await Continent.findOne({ where: { name: data.continent } })
                .then(res => {
                    if (!res) throw {
                        message: 'Invalid continent',
                        fields: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica",
                        status: 400,
                    };
                    return res.id
                }),
        }
    }).then(res => res[0].id);

    const response = await User.create({
        ...data,
        password: hashPassword(data.password),
        role_id,
        country_id
    }, {
        fields: [
            "firstName",
            "lastName",
            "gender",
            "birthdayDate",
            "email", "phone",
            "dni",
            "address",
            "profileImg",
            "role_id",
            "country_id",
            "password"
        ]
    });

    const { password, updatedAt, createdAt, CountryId, RoleId, ...newUser } = response.toJSON();

    return newUser;
};

const editUser = async (id, data, role) => {
    const country_id = await Country.findOrCreate({
        where: { name: data.country },
        defaults: {
            continent_id: await Continent.findOne({ where: { name: data.continent } })
                .then(res => {
                    if (!res) throw {
                        message: 'Invalid continent',
                        fields: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica",
                        status: 400,
                    };
                    return res.id
                }),
        }
    }).then(res => res[0].id);

    let editedUser = await User.update(
        {
            ...data,
            country_id
        },
        {
            where: { id },
            fields: ["firstName", "lastName", "gender", "birthdayDate", "email", "phone", "dni", "address", "status", "country_id"].concat(role === "admin" ? "verified" : null)
        }
    );

    return editedUser;
};

const deleteUser = async id => {
    const data = await User.destroy({ where: { id } });

    return data
};

const editProfileImg = async (userId, imgUrl, imgId) => {
    let profileImg = imgUrl;

    if (imgId) {
        const img = await UserImage.findOne({ where: { id: imgId } });

        if (img.user_id !== userId) throw { message: "This image does not belong to the user", status: 400};

        profileImg = img.url;

    } else if (imgUrl) {
        await UserImage.create({
            url: imgUrl,
            type: 'profile',
            user_id: userId
        });
    };

    const response = await User.update({ profileImg }, { where: { id: userId } });
    
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