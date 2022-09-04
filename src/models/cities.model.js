import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const City = db.define('City', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: "cities", timestamps: false});