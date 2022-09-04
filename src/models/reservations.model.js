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
        allowNull: false
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
    score: DataTypes.REAL,
    is_finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, { tableName: "reservations" });