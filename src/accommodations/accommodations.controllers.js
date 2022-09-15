import { Accommodation } from "../models/accomodations.model.js"
import { City } from "../models/cities.model.js";
import { Continent } from "../models/continents.model.js";
import { Country } from "../models/countries.model.js";
import { Role } from "../models/roles.model.js";
import { State } from "../models/states.model.js";
import { User } from "../models/user.model.js";
import { upperCamelCase } from "../utils/upperCamelCase.js";

const includeAccomodations = [
    {
        model: City,
        as: 'city',
        attributes: ['name'],
        include: [
            {
                model: State,
                as: 'state',
                attributes: ['name'],
                include: [
                    {
                        model: Country,
                        as: 'country',
                        attributes: ['name'],
                        include: {
                            model: Continent,
                            as: 'continent',
                            attributes: ['name']
                        }
                    }
                ]
            }
        ]
    },
    {
        model: User,
        as: 'host',
        include: [
            {
                model: Role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: Country,
                as: 'country',
                attributes: ['name']
            }
        ],
        attributes: {
            exclude: ['RoleId', 'CountryId', 'createdAt', 'updatedAt', 'role_id', 'country_id', 'password']
        }
    }
];

const lookingForCity = async ({ city, state, country, continent }) => {
    return await City.findOrCreate({
        where: { name: upperCamelCase(city) },
        // This will be data (name, state_id) in case the city don't exist
        defaults: {
            // The name is same of where option
            // for the creation of the city it is also necessary to verify the existence of the State to which the city belongs. If the State does not exist, it will be created and so on until the Continent data that only has 8 options allowed.
            state_id: await State.findOrCreate({
                where: { name: upperCamelCase(state) },
                defaults: {
                    country_id: await Country.findOrCreate({
                        where: { name: upperCamelCase(country) },
                        defaults: {
                            continent_id: await Continent.findOne({
                                where: { name: upperCamelCase(continent) }
                            }).then(res => {
                                if (!res) throw {
                                    message: 'Invalid continent',
                                    fields: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica",
                                    status: 400,
                                };
                                return res.id
                            })
                        }
                    }).then(res => res[0].id)
                }
            }).then(res => res[0].id)
        }
    }).then(res => res[0].id);
};

export const getAll = async () => {
    const data = await Accommodation.findAll({
        include: includeAccomodations,
        attributes: {
            exclude: ['CityId', 'UserId']
        }
    });

    return data;
};

export const getById = async id => {
    const accommodation = await Accommodation.findOne({
        where: { id },
        include: includeAccomodations,
        attributes: {
            exclude: ['CityId', 'UserId']
        }
    });

    return accommodation;
};

export const create = async (userId, data) => {
    // Verifying the existence of the city in the database for the data received. If the city don't exist in the database, it will create. If the city exists, then its "id" will be saved.
    const city_id = await lookingForCity(data);

    const response = await Accommodation.create(
        {
            ...data,
            commision: 1,
            city_id,
            host_id: userId
        },
        {
            fields: [
                "title",
                "description",
                "guests",
                "rooms",
                "beds",
                "bathrooms",
                "price",
                "commision",
                "ubicationDetail",
                "latitude",
                "longitude",
                "city_id",
                "host_id"
            ]
        }
    );

    const { CityId, ...newAccommodation } = response.toJSON();

    return newAccommodation;
};

export const update = async (accommodationId, user, data) => {
    // Verifying the existence of the accommodation
    const accommodation = await Accommodation.findByPk(accommodationId);
    if (!accommodation) throw { message: "Accommodation don't found", status: 404 };

    // If the user isn't admin then you have to verify if he/she is the owner of the hosting you want to update
    if (user.role === 'host' && (await accommodation.getHost()).id !== user.id) throw { message: "The user isn't owner of the accommodation", status: 400 };

    // If the city property was received then you have verify the existence of the city the database for the data received
    if (data.city) data.city_id = await lookingForCity(data);

    // Verifying if the price of accommodation was changed
    if (data.price) data.commision = 1;

    const response = await Accommodation.update(data, {
        where: { id: accommodationId },
        fields: [
            "title",
            "description",
            "guests",
            "rooms",
            "beds",
            "bathrooms",
            "price",
            "commision",
            "ubicationDetail",
            "latitude",
            "longitude",
            "city_id"
        ]
    });

    return response;
};

export const remove = async (id, user) => {
    // Verifying the existence of the accommodation
    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) throw { message: "Accommodation don't found", status: 404 };

    // If the user isn't admin then you have to verify if he/she is the owner of the hosting you want to update
    if (user.role === 'host' && (await accommodation.getHost()).id !== user.id) throw { message: "The user isn't owner of the accommodation", status: 400 };

    const response = Accommodation.destroy({ where: { id } });

    return response
}
