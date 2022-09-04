import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const AccommodationImage = db.define("AccommodationImage", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     isUrl: true
        // }
    }
}, { tableName: "accommodations_images" });