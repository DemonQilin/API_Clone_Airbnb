import { User } from "./user.model.js";
import { Role } from "./roles.model.js";
import {UserImage} from "./users_images.model.js";
import { Continent } from "./continents.model.js";
import { Country } from "./countries.model.js";
import { State } from "./states.model.js";
import { City } from "./cities.model.js";
import { Accommodation } from "./accomodations.model.js";
import { AccommodationImage } from "./accomodations_images.model.js";
import { Reservation } from "./reservations.model.js";

export const initModels = () => {
    // User <- Role
    Role.hasMany(User);
    User.belongsTo(Role, {
        as: 'role',
        foreignKey: {
            name: 'role_id',
            allowNull: false
        }
    });

    // User -> UserImage
    User.hasMany(UserImage);
    UserImage.belongsTo(User, {
        as: 'userImage',
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    });

    // Continents -> Countries
    Continent.hasMany(Country);
    Country.belongsTo(Continent, {
        as: 'continent',
        foreignKey: {
            name: 'continent_id',
            allowNull: false
        }
    });

    // Countries -> States
    Country.hasMany(State);
    State.belongsTo(Country, {
        as: 'country',
        foreignKey: {
            name: 'country_id',
            allowNull: false
        }
    });

    // State -> Cities
    State.hasMany(City);
    City.belongsTo(State, {
        as: 'state',
        foreignKey: {
            name: "state_id",
            allowNull: false
        }
    });

    // Cities -> Accommodations
    City.hasMany(Accommodation);
    Accommodation.belongsTo(City, {
        as: 'city',
        foreignKey: {
            name: "city_id",
            allowNull: false
        }
    });

    // Accommodations -> AccomodationsImages
    Accommodation.hasMany(AccommodationImage);
    AccommodationImage.belongsTo(Accommodation, {
        as: 'accommodationImages',
        foreignKey: {
            name: "accommodation_id",
            allowNull: false
        }
    });

    // Accomodations <-> Users
    Accommodation.belongsToMany(User, {
        through: Reservation,
        as: 'accommodation',
        foreignKey: {
            name: "accommodation_id",
            allowNull: false
        },
        otherKey: {
            name: 'user_id',
            allowNull: false
        }
    });
    User.belongsToMany(Accommodation, {
        through: Reservation,
        as: 'user',
        foreignKey: {
            name: "user_id",
            allowNull: false
        },
        otherKey: {
            name: "accommodation_id",
            allowNull: false
        }
    });
    
    // Countries -> Users
    Country.hasMany(User);
    User.belongsTo(Country, {
        as: 'country',
        foreignKey: {
            name: 'country_id',
            allowNull: false
        }
    });

    // HOST RELATION: Users -> Accommodations
    User.hasMany(Accommodation, {
        as: 'host',
        foreignKey: {
            name: 'host_id',
            allowNull: false
        }
    });
    Accommodation.belongsTo(User, {
        as: 'host',
        foreignKey: {
            name: 'host_id',
            allowNull: false
        }
    });
};