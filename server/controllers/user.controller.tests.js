require('../config/config'); 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let url = process.env.API_BASE_URL;

describe('User Controller', () => {

    var token = null;

    before(function(done) {
        //Authenticate API requests
        chai.request(url)
            .post('/authenticate')
            .send({ email: 'nadun@email.com', password: 'nadun123' })
            .end(function(err, res) {
                token = res.body.token; 
            done();
            });
    });

    context('POST /register', () => {
        it('it should not POST a user with duplicate email field', (done) => {
            let user = {
                fullName: 'Nadun',
                email: 'nadun@email.com',
                password: '123',
            }
            
            chai.request(url)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        it('it should not POST a user with empty fields', (done) => {
            let user = {
                fullName: '',
                email: '',
                password: '',
            }
            
            chai.request(process.env.API_BASE_URL)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        it('it should not POST a user with invalid email field', (done) => {
            let user = {
                fullName: 'Test',
                email: 'fakeemail',
                password: '12345',
            }
            
            chai.request(process.env.API_BASE_URL)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        it('it should not POST a user with password less than 4 characters' , (done) => {
            let user = {
                fullName: 'Test',
                email: 'test@email.com',
                password: '123',
            }
            
            chai.request(process.env.API_BASE_URL)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
        xit('it should POST a user with valid details to register', (done) => {
            let user = {
                fullName: 'Test',
                email: 'test@email.com',
                password: '12345',
            }
            
            chai.request(process.env.API_BASE_URL)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});