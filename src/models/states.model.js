import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const State = db.define("State", {
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
}, { tableName: "states", timestamps: false });