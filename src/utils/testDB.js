import { City } from "../models/cities.model.js";
import { Continent } from "../models/continents.model.js";
import { Country } from "../models/countries.model.js";
import { Role } from "../models/roles.model.js";
import { State } from "../models/states.model.js";
import { User } from "../models/user.model.js";
import { hashPassword } from "./crypts.js";

const testDb = async () => {
    try {
        await Role.bulkCreate([{ name: "admin" }, { name: "normal" }, { name: "host" }, { name: "moderator" }], { validate: true });

        await Continent.bulkCreate([
            { name: "Europe" },
            { name: "Asia" },
            { name: "North America" },
            { name: "South America" },
            { name: "Africa" },
            { name: "Oceania" },
            { name: "Antarctica" },
        ], { validate: true });

        await Country.bulkCreate([
            { name: "Colombia", continent_id: await Continent.findOne({ where: { name: "South America" } }).then(res => res.id) },
            { name: "Francia", continent_id: await Continent.findOne({ where: { name: "Europe" } }).then(res => res.id) },
            { name: "Japon", continent_id: await Continent.findOne({ where: { name: "Asia" } }).then(res => res.id) },
            { name: "Canada", continent_id: await Continent.findOne({ where: { name: "North America" } }).then(res => res.id) },
            { name: "Egipto", continent_id: await Continent.findOne({ where: { name: "Africa" } }).then(res => res.id) },
            { name: "Australia", continent_id: await Continent.findOne({ where: { name: "Oceania" } }).then(res => res.id) },
        ], { validate: true });

        const idColombia = await Country.findOne({ where: { name: "Colombia" } }).then(res => res.id);

        await State.bulkCreate([
            { name: "Antioquia", country_id: idColombia },
            { name: "Choco", country_id: idColombia },
            { name: "Santander", country_id: idColombia },
            { name: "Amazonas", country_id: idColombia },
            { name: "San Andres", country_id: idColombia },
            { name: "Caqueta", country_id: idColombia },
            { name: "Valle del Cauca", country_id: idColombia },
            { name: "Bolivar", country_id: idColombia },
        ], {validate: true});

        await City.bulkCreate([
            { name: "Medellin", state_id: await State.findOne({ where: { name: "Antioquia"}}).then(res => res.id)},
            { name: "Cali", state_id: await State.findOne({ where: { name: "Valle del Cauca" } }).then(res => res.id) },
            { name: "Leticia", state_id: await State.findOne({ where: { name: "Amazonas" } }).then(res => res.id) },
            { name: "Bucaramanga", state_id: await State.findOne({ where: { name: "Santander" } }).then(res => res.id) },
            { name: "Cartagena", state_id: await State.findOne({ where: { name: "Bolivar" } }).then(res => res.id) }
        ], { validate: true });

        await User.bulkCreate([
            {
                firstName: "Juanes",
                lastName: "Velez",
                gender: "Male",
                birthdayDate: "2000-06-18",
                email: "juanes200012@gmail.com",
                password: hashPassword("JuanesV0618++"),
                phone: "3217592245",
                dni: "1007448825",
                address: "Calle 34A # 29A - 26",
                role_id: await Role.findOne({ where: { name: "admin" } }).then(res => res.id),
                country_id: idColombia
            }
        ], { validate: true });
    } catch (error) {
        console.log(error.message);
    }    
};

export default testDb;