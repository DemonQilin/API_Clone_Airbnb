import { Posts } from "./posts.model.js";
import { User } from "./user.model.js";
import { Role } from "./roles.model.js";
import {UserImage} from "./users_images.model.js";
import { Continent } from "./continents.model.js";
import { Country } from "./countries.model.js";
import { State } from "./states.model.js";
import { City } from "./cities.model.js";
import { Place } from "./places.model.js";
import { Accommodation } from "./accomodations.model.js";
import { AccommodationImage } from "./accomodations_images.model.js";
import { Reservation } from "./reservations.model.js";

export const initModels = () => {
    // User <- Role
    Role.hasMany(User, {
        foreignKey: {
            name: "role",
            allowNull: false
        }
    });
    User.belongsTo(Role);

    // User -> UserImage
    User.hasMany(UserImage, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    });
    UserImage.belongsTo(User);

    // Continents -> Countries
    Continent.hasMany(Country, {
        foreignKey: {
            name: "continent_id",
            allowNull: false
        }
    });
    Country.belongsTo(Continent);

    // Countries -> States
    Country.hasMany(State, {
        foreignKey: {
            name: "country_id",
            allowNull: false
        }
    });
    State.belongsTo(Country);

    // State -> Cities
    State.hasMany(City, {
        foreignKey: {
            name: "state_id",
            allowNull: false
        }
    });
    City.belongsTo(State);

    // Cities -> Places
    City.hasMany(Place, {
        foreignKey: {
            name: "city_id",
            allowNull: false
        }
    });
    Place.belongsTo(City);

    // Places -> Accommodations
    Place.hasMany(Accommodation, {
        foreignKey: {
            name: "place_id",
            allowNull: false
        }
    });
    Accommodation.belongsTo(Place);

    // Accommodations -> AccomodationsImages
    Accommodation.hasMany(AccommodationImage, {
        foreignKey: {
            name: "accommodation_id",
            allowNull: false
        }
    });

    // Accomodations <-> Users
    Accommodation.belongsToMany(User, {
        through: Reservation,
        foreignKey: {
            name: "accommodation_id",
            allowNull: false
        }
    });
    User.belongsToMany(Accommodation, {
        through: Reservation,
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
     });
};