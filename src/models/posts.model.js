import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Posts = db.define('posts', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    header_image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});