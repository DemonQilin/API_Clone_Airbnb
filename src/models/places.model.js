import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Place = db.define("Place", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: false
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
}, { tableName: "places", timestamps: false});