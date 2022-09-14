import { Accommodation } from "../models/accomodations.model.js";
import { City } from "../models/cities.model.js";
import { Continent } from "../models/continents.model.js";
import { Country } from "../models/countries.model.js";
import { Role } from "../models/roles.model.js";
import { State } from "../models/states.model.js";
import { User } from "../models/user.model.js";
import { hashPassword } from "./crypts.js";

const testDb = async () => {
    try {
        if ((await Role.findAll()).length) return;

        await Role.bulkCreate([{ name: "guest" }, { name: "admin" }, { name: "host" }], { validate: true });

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
            { name: "Mexico", continent_id: await Continent.findOne({ where: { name: "North America" } }).then(res => res.id) },
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
                address: "Avenida Juan 5 # 34 - 51",
                role_id: await Role.findOne({ where: { name: "admin" } }).then(res => res.id),
                country_id: idColombia
            },
            {
                firstName: "Sahid",
                lastName: "Kick",
                gender: "Male",
                birthdayDate: "2000-09-24",
                email: "sahidKick@gmail.com",
                password: hashPassword("contraseñaSecreta++"),
                phone: "3854756699",
                dni: "1007478963",
                address: "Algun lugar del mundo mexicano",
                role_id: await Role.findOne({ where: { name: "guest" } }).then(res => res.id),
                country_id: await Country.findOne({ where: { name: "Mexico" } }).then(res => res.id),
            }
        ], { validate: true });

        await Accommodation.bulkCreate([
            {
                title: 'Casa Campestre Afueras Medellin',
                description: "Hermosa casa de diseño moderno que se encuentra a las afueras de Medellín, perfecta para tomar un descanso del mundo y reencontrarte con tu familia",
                guests: 4,
                rooms: 6,
                beds: 8,
                bathrooms: 5.5,
                price: 350.45,
                score: 0,
                commision: 50.25,
                ubicationDetail: 'Sector de Palmas cercano al CAI',
                coordinateN: 4.4525487,
                coordinateE: 35.452588,
                host_id: await User.findOne({ where: { email: "juanes200012@gmail.com" } }).then(res => res.id),
                city_id: await City.findOne({ where: { name: 'Medellin' } }).then(res => res.id),
            },
            {
                title: 'Apartamento Alto con vista al mar',
                description: "Apartamento amplio ubicado en un buen sector de la ciudad de Cartagena, con gran altura que permite tomar una vista entera de la ciudad",
                guests: 4,
                rooms: 4,
                beds: 3,
                bathrooms: 2.5,
                price: 100.45,
                score: 0,
                commision: 25.25,
                ubicationDetail: 'Al lado del mar azul',
                coordinateN: 15.4525487,
                coordinateE: 20.452588,
                host_id: await User.findOne({ where: { email: "sahidKick@gmail.com" } }).then(res => res.id),
                city_id: await City.findOne({ where: { name: 'Cartagena' } }).then(res => res.id)
            }
        ]);

        console.log('Data succesfully generated')

    } catch (error) {
        console.log(error);
    }    
};

export default testDb;