import { assert } from "chai";
import { describe, it } from "mocha";
import { initModels } from "../../models/init_models.js";
import db from "../../utils/database.js";
import { getAll } from "../accommodations.controllers.js";

describe('Unit Test of controllers of accommodations', () => {
    it('Should be an array of users', async function (done) {
        this.timeout(5000);

        try {
            initModels();
            const accommodations = await getAll();

            assert.isArray(accommodations);
            accommodations.forEach(accommodation => {
                accommodation = accommodation.toJSON();
                // console.log(accommodation);
                assert.isObject(accommodation);
                assert.property(accommodation, 'id');
                assert.property(accommodation, 'title');
                assert.property(accommodation, 'description');
                assert.property(accommodation, 'guests');
                assert.isNumber(accommodation.guests);
                assert.property(accommodation, 'rooms');
                assert.isNumber(accommodation.guests);
                assert.property(accommodation, 'beds');
                assert.isNumber(accommodation.beds);
                assert.notProperty(accommodation, 'CityId');
            });

        } catch (error) {
            done(error)
        };
    });
});