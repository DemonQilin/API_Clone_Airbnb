import { assert } from "chai";
import { describe, it } from "mocha"

const suma = (a, b) => a + b;

describe('Test unitario de mis usuarios', () => {
    it('Deberia retornar 8', done => {
        const miFuncionEjecutada = suma(2, 6);
        assert.equal(miFuncionEjecutada, 8, 'Upsii no fue 8');
        done()
    });
    it('Deberia retornar 25', done => {
        const miFuncionEjecutada = suma(20, 5);
        assert.equal(miFuncionEjecutada, 25, 'Upsii no fue 25');
        done()
    });
});