import { errorHandlerHttp } from '../utils/error.handler.js';
import * as reservationsControllers from './reservations.controllers.js';

export const create = async (req, res) => {
    try {
        const accommodationId = req.params.id;
        const userId = req.user.id;
        const data = req.body;

        if (!Object.keys(data).length) throw { message: "Missing data", status: 400 };

        if (!(
            data.arrival &&
            data.departure &&
            (data.adults || data.adults === 0)
        )) throw {
            message: "The request must be have all fields",
            fields: {
                arrival: "YYYY-MM-DD",
                departure: "YYYY-MM-DD",
                adults: "Number > 0"
            },
            status: 400
        };

        const newReservation = await reservationsControllers.create(accommodationId, userId, data);

        res.status(201).json(newReservation);
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export const cancel = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        const response = await reservationsControllers.cancel(id, user);
        if (response === 0) throw { message: "The accommodation wasn't canceled. Try again", status: 400 };

        res.status(204).json({});
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};

export const finish = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { score } = req.body;

        if (!score) throw { message: "Missing score", fields: { score: "Number >= 0" }, status: 400 };
        
        const response = await reservationsControllers.finish(id, userId, score);
        if (response[0] === 0) throw { message: "The reservation wasn't rated", status: 400 };

        res.status(200).json({ message: "The reservation was succesfully rated" });
    } catch (error) {
        errorHandlerHttp(res, error);
    }
}