import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Accommodation = db.define("Accommodation", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathrooms: {
        type: DataTypes.REAL,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    score: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0
    },
    commision: {
        type: DataTypes.REAL,
        allowNull: false
    },
    ubicationDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'ubication_detail'
    },
    coordinateN: {
        type: DataTypes.REAL,
        allowNull: false,
        field: "coordinate_n"
    },
    coordinateE: {
        type: DataTypes.REAL,
        allowNull: false,
        field: "coordinate_e"
    }
}, { tableName: "accommodations" });