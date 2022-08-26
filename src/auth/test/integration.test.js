import chai from "chai";
import { describe, it } from "mocha";
import chaiHttp from "chai-http";
import app from "../../app.js";

chai.use(chaiHttp);

describe('Set of test for Login Integration', () => {
    it('Should return 400 when I sent empty request', done => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({})
            .end((err, res) => {
                if (err) return console.log(err.message);
                const response = res.body;

                chai.assert.equal(res.status, 400, 'The request is empty but the router ignore it');
                chai.assert.equal(Object.keys(response).length, 1, 'The response has more properties than expected');
                chai.assert.property(response, 'message', "The response doesn't have the property 'message'");
                chai.assert.equal(response.message, "Missing data", "The message isn't the expected");
                done()
            });
    });
})