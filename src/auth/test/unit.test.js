import { assert } from 'chai';
import { describe, it } from 'mocha';
import { loginUser } from '../auth.controllers.js';

describe('Test unitario de login', () => {
    it ('Should return null because the body of request is void', done => {
        const user = loginUser();
        assert.isNull(user, "The response isn't empty");
        done()
    });
})