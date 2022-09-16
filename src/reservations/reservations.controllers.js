import { Accommodation } from "../models/accomodations.model.js"
import { Reservation } from "../models/reservations.model.js";
import { User } from "../models/user.model.js";

export const create = async (accommodationId, userId, data) => {
    const accommodation = await Accommodation.findByPk(accommodationId);

    if (accommodation === null) throw { message: "Accommodation don't found", status: 404 };

    const arrival = new Date(data.arrival);
    const departure = new Date(data.departure);
    const now = new Date();

    if (arrival.toString() === 'Invalid Date' || departure.toString() === 'Invalid Date') throw { message: "It is recommended that the 'arrival' and 'departure' fields follow the date format: YYYYY-MM-DD", status: 400 };
    
    if (arrival.getTime() < now.getTime() || departure.getTime() < now.getTime()) throw { message: "It is not possible to arrive or leave an accommodation on dates that have already passed", status: 400 };
    
    if (departure.getTime() <= arrival.getTime() + 24 * 3600 * 1000) throw { message: "The departure date must be at least one day after the arrival date", status: 400 };

    const response = await Reservation.create(
        {
            ...data,
            user_id: userId,
            accommodation_id: accommodationId
        },
        {
            fields: [
                "arrival",
                "departure",
                "adults",
                "kids",
                "babies",
                "pets",
                "user_id",
                "accommodation_id"
            ]
        }
    );

    return response.toJSON();
};

export const cancel = async (reservationId, user) => {
    const reservation = await Reservation.findByPk(reservationId);
    if (reservation === null) throw { message: "Reservation don't found", status: 404 };

    if (user.role === 'guest' && (await User.findByPk(reservation.user_id)).id !== user.id) throw { message: "The user isn't owner of the reservation", status: 401 };

    if (user.role === 'host' && (await Accommodation.findByPk(reservation.accommodation_id)).host_id !== user.id) throw { message: "The user isn't owner of the reservation's accommodation", status: 401 };

    const response = await Reservation.destroy({ where: { id: reservationId } });

    return response
};

export const finish = async (reservationId, userId, score) => {
    const reservation = await Reservation.findByPk(reservationId);
    if (reservation === null) throw { message: "Reservation don't found", status: 404 };

    if ((await User.findByPk(reservation.user_id)).id !== userId) throw { message: "The user isn't owner of the reservation", status: 401 };
    
    const response = await Reservation.update({ score: score, is_finished: true }, { where: { id: reservationId } });

    return response
};
