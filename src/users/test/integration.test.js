import chai from "chai";
import { describe, it } from "mocha";
import chaiHttp from "chai-http";

import app from '../../app.js';

chai.use(chaiHttp);

describe('Set of test for Users Integration', () => {
    let tokenNewUser;

    it('Should return 200 for status request', done => {
        chai.request(app)
            .get('/api/v1/users/')
            .end((err, res) => {
                chai.assert.strictEqual(res.status, 200, 'La petición no fue exitosa');
                done();
            });
    });

    it('Should return a array users', done => {
        chai.request(app)
            .get('/api/v1/users/')
            .end((err, res) => {
                chai.assert.isArray(res.body.response, 'No es un arreglo');
                chai.assert.isTrue(res.body.response.length > 0, 'El arreglo está vacio');
                done()
            })
    });

    it('Should return a user when I send valid data', function (done) {
        this.timeout(5000);

        chai.request(app)
            .post('/api/v1/users/')
            .send({
                first_name: 'Sahid',
                last_name: 'Kick',
                email: 'sahid@gmail.com',
                password: 'SahidKick12345**',
                phone: '3105046500',
                birthday_date: '2001-12-22',
                rol: 'admin',
                profile_img: '',
                country: 'Colombia'
            })
            .end((err, res) => {
                if (err) {
                    console.log('Algo fallo en el test\n', err.message);
                    done()
                    return
                };

                const { user } = res.body;

                chai.assert.equal(res.status, 201, "The response's status isn't 201");
                chai.assert.exists(user, "The response doesn't have a user");
                chai.assert.notProperty(user, 'password', "WARNING! The property 'password' is in the response");
                chai.assert.notEqual(user.rol, 'admin', 'The user was just created has admin role');
                done();
            })
    });

    it('Should return a token when I send the valid credentials', function (done) {
        this.timeout(5000);

        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'sahid@gmail.com',
                password: 'SahidKick12345**'
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 200, "The response failed")
                chai.assert.property(res.body, 'token', 'The response does not have the property "token"');
                chai.assert.isString(res.body.token, 'The token is not a string. Hmmm, it is wird');

                tokenNewUser = res.body.token;
                done();
            })
    })

    it('Should return a unauthorized status when I send a request for edit without admin user', function (done) {
        this.timeout(10000);

        chai.request(app)
            .put('/api/v1/users/9356fbae-ee20-4bee-87f5-2466df0e57be')
            .set('Authorization', `JWT ${tokenNewUser}`)
            .send({
                first_name: 'Pedrito',
                last_name: 'Sanchez',
                email: 'pedritoSanch045@gmail.com',
                phone: '3105046500',
                birthday_date: '1998-04-17',
                rol: 'admin',
                profile_img: 'algo.jpg',
                country: 'Estados Unidos de Colombia',
                active: true
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 401, 'Ingreso al sistema con un usuario que no es admin');
                chai.assert.equal(res.body.message, 'User not authorized to make this request', 'No es el mensaje esperado');
                done()
            });
    });
})