import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const UserImage = db.define('UserImage', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    // userId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     field: "user_id"
    // }
}, { tableName: "users_images" });