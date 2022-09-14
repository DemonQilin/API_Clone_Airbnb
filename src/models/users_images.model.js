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
            // isUrl: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: null,
        validate: {
            isIn: {
                args: [['profile', 'post', 'comment']],
                msg: "Type must be 'profile', 'post' or 'comment'"
            }
        }
    }
}, { tableName: "users_images" });