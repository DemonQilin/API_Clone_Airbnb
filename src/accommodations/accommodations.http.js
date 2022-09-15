import { errorHandlerHttp } from '../utils/error.handler.js';
import * as accommodationControllers from './accommodations.controllers.js';

export const getAll = async (req, res) => {
    try {
        const accommodations = await accommodationControllers.getAll();

        res.status(200).json({ items: accommodations.length, accommodations });
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const accommodation = await accommodationControllers.getById(id);
        if (accommodation === null) throw { message: 'Accommodation not found', status: 404 };

        res.status(200).json(accommodation.toJSON());
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;

        if (!Object.keys(data).length) throw { message: "Missing data", status: 400 };

        if (!(
            data.title &&
            data.description &&
            data.ubicationDetail &&
            data.city &&
            data.state &&
            data.country &&
            data.continent &&
            (data.guests || data.guests === 0) &&
            (data.rooms || data.rooms === 0) &&
            (data.beds || data.beds === 0) &&
            (data.bathrooms || data.bathrooms === 0) &&
            (data.price || data.price === 0) &&
            (data.latitude || data.latitude === 0) &&
            (data.longitude || data.longitude === 0)
        )) throw {
            message: "All fields should be completed",
            fields: {
                title: "MyTitle",
                description: "Description of my accommodation",
                guests: "Number > 0",
                rooms: "Number > 0",
                beds: "Number > 0",
                bathrooms: "Number > 0",
                price: "Number > 10.00",
                ubicationDetail: "Near Gotham City",
                latitude: "Number > -90 AND Number < 90",
                longitude: "Number > -180 AND Number < 180",
                city: "City of my accommodation",
                state: "State of my accommodation's city",
                country: "Country of my accommodation's state",
                continent: "Continent of my accommodation's country"
            },
            status: 400
        };

        const newAccommodation = await accommodationControllers.create(userId, data);

        res.status(201).json(newAccommodation);
    } catch (error) {
        errorHandlerHttp(res, error);
    }


};

export const update = partial => async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const data = req.body;

        if (!Object.keys(data).length) throw { message: 'Missing data', status: 400 };

        const condition = partial
            ? (
                (data.city && data.state && data.country && data.continent) ||
                (data.guests || data.guests === 0) ||
                (data.rooms || data.rooms === 0) ||
                (data.beds || data.beds === 0) ||
                (data.bathrooms || data.bathrooms === 0) ||
                (data.price || data.price === 0) ||
                (data.latitude || data.latitude === 0) ||
                (data.longitude || data.longitude === 0) ||
                data.title ||
                data.description ||
                data.ubicationDetail
            )
            : (
                data.title &&
                data.description &&
                data.ubicationDetail &&
                data.city &&
                data.state &&
                data.country &&
                data.continent &&
                (data.guests || data.guests === 0) &&
                (data.rooms || data.rooms === 0) &&
                (data.beds || data.beds === 0) &&
                (data.bathrooms || data.bathrooms === 0) &&
                (data.price || data.price === 0) &&
                (data.latitude || data.latitude === 0) &&
                (data.longitude || data.longitude === 0)
            );
        
        if (!condition) throw {
            message: partial ? 'The request must contain at least one of the following fields (If field is city, also request must contain: state, country and continent)' : 'All fields must be completed',
            fields: {
                title: "MyTitle",
                description: "Description of my accommodation",
                guests: "Number > 0",
                rooms: "Number > 0",
                beds: "Number > 0",
                bathrooms: "Number > 0",
                price: "Number > 10.00",
                ubicationDetail: "Near Gotham City",
                latitude: "Number > -90 AND Number < 90",
                longitude: "Number > -180 AND Number < 180",
                city: "City of my accommodation",
                state: "State of my accommodation's city",
                country: "Country of my accommodation's state",
                continent: "Continent of my accommodation's country"
            },
            status: 400
        };

        const response = await accommodationControllers.update(id, user, data);
        if (!response[0]) throw { message: "The update failed", status: 400 };

        res.status(200).json({ message: 'Accommodation was succesfully edited' });
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        const response = await accommodationControllers.remove(id, user);
        if (!response) throw { message: "The accommodation wasn't deleted. Try again", status: 404 };

        res.status(204).json({});
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};