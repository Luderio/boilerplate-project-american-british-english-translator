const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', function() {
    suite('Funtional tests for Route /api/translate', function() {

        //Test 1: Translation with text and locale fields: POST request to /api/translate.
        test('Translation with text and locale fields', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'text': 'Mangoes are my favorite fruit.',
                    'locale': 'american-to-british'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
                    done();
                });
        });

        //Test 2: Translation with text and invalid locale field: POST request to /api/translate.
        test('Translation with text and invalid locale field', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'text': 'Mangoes are my favorite fruit.',
                    'locale': 'invalid-locale'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.error, 'Invalid value for locale field');
                    done();
                });
        });


        //Test 3: Translation with missing text field: POST request to /api/translate.
        test('Translation with missing text field', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'locale': 'american-to-british'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.error, 'Required field(s) missing');
                    done();
                });
        });


        //Test 4: Translation with missing locale field: POST request to /api/translate.
        test('Translation with missing locale field', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'text': 'Mangoes are my favorite fruit.'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.error, 'Required field(s) missing');
                    assert.equal();
                    done();
                });
        });

        //Test 5: Translation with empty text: POST request to /api/translate.
        test('Translation with empty text', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'text': '',
                    'locale': 'american-to-british'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.error, 'No text to translate');
                    done();
                });
        });

        //Test 6: Translation with text that needs no translation: POST request to /api/translate.
        test('Translation with text that needs no translation', function(done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    'text': 'Hello',
                    'locale': 'american-to-british'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.translation, 'Everything looks good to me!');
                    done();
                });
        });


    });

});
