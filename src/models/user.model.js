import { DataTypes, Deferrable } from "sequelize";
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
        allowNull: false,
        type: DataTypes.DATEONLY,
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
    // role: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     // references: {
    //     //     model: Role,
    //     //     key: "id"
    //     // }
    // },
    profileImg: {
        type: DataTypes.STRING,
        field: "profile_img"
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING(20),
        values: ["active", "inactive", "banned"],
        defaultValue: "active"
    }
}, { tableName: "users" });