import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Role = db.define('Role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["admin", "normal", "host", "moderator"]
    }
}, {tableName: "roles"});