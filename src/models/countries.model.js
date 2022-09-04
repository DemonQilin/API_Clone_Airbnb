import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Country = db.define("Country", {
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
}, { tableName: "countries", timestamps: false });