import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdayDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "birthday_date",
        validate: {
            isDate: true
        }
    },
    email: {
        type: DataTypes.STRING(60),
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
    phone: DataTypes.STRING(15),
    dni: DataTypes.STRING(30),
    address: DataTypes.STRING,
    profileImg: {
        type: DataTypes.STRING,
        field: "profile_img"
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING(20),
        defaultValue: "active",
        validate: {
            isIn: {
                args: [["active", "inactive", "banned"]],
                msg: "Must be active, inactive or banned"
            }
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { tableName: "users" });