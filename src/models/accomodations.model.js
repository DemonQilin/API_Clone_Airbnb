import { DataTypes } from "sequelize";
import db from "../utils/database.js";

export const Accommodation = db.define("Accommodation", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "The minimum value for 'guests' is 1"
            }
        }
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "The minimum value for 'rooms' is 1"
            }
        }
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "The minimum value for 'beds' is 1"
            }
        }
    },
    bathrooms: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "The minimum value for 'bathrooms' is 1"
            }
        }
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            min: {
                args: 10.00,
                msg: "The minimum value for 'price' is 10.00"
            }
        }
    },
    score: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0
    },
    commision: {
        type: DataTypes.REAL,
        allowNull: false,
        set() {
            this.setDataValue('commision', 0.2 * this.price)
        }
    },
    ubicationDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'ubication_detail'
    },
    latitude: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            min: {
                args: -90,
                msg: "The minimum value for 'latitude' is -90"
            },
            max: {
                args: 90,
                msg: "The maximum value for 'latitude' is 90"
            }
        }
    },
    longitude: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            min: {
                args: -180,
                msg: "The minimum value for 'longitude' is -180"
            },
            max: {
                args: 180,
                msg: "The maximum value for 'longitude' is 180"
            }
        }
    }
}, { tableName: "accommodations" });