import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Continent = db.define('Continent', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [["Europe", "Asia", "North America", "South America", "Africa", "Oceania", "Antarctica"]],
                msg: "Should be one of these: Europe, Asia, North America, South America, Africa, Oceania or Antarctica"
            }
        },
        allowNull: false,
        unique: true
    }
}, { tableName: "continents", timestamps: false});