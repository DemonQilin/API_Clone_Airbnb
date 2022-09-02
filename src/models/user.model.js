import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    birthday_date: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    rol: {
        allowNull: false,
        type: DataTypes.CHAR(6),
        defaultValue: "normal"
    },
    profile_img: {
        type: DataTypes.STRING,
        // validate: {
        //     isUrl: true
        // }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});