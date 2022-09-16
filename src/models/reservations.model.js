import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Reservation = db.define("Reservation", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    arrival: {
        type: DataTypes.DATE,
        allowNull: false
    },
    departure: {
        type: DataTypes.DATE,
        allowNull: false
    },
    adults: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "The minimum value for 'adults' is 1"
            }
        }
    },
    kids: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    babies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    score: {
        type: DataTypes.REAL,
        validate: {
            isNumeric: true,
            min: {
                args: 0.1,
                msg: "The minimum value for 'score' is 0.1"
            },
            max: {
                args: 10,
                msg: "The miximum value for 'score' is 10"
            }
        }
    },
    is_finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: "reservations", paranoid: true, deletedAt: "is_canceled"});