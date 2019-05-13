require('../config/config'); 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let url = process.env.API_BASE_URL;

let token = null;

describe('Sprint Controller', () => {

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

    context('POST /sprintitem/create', () => {
        it('it should not create duplicate SprintItems', (done) => {

            let SprintItem = {
                sprintID: '5c7cb0237e8a970462830158',
                projectID: '5c77a38ab6c49026fe3915d6',
                issueNumber: 3,
                sprintTitle: 'Sprint 1'
            }
            
            chai.request(url)
                .post('/sprintitem/create')
                .set("Authorization", "Bearer " + token)
                .send(SprintItem)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });

    context('GET /sprintitem/:projectID/:issueNumber', () => {
        it('it should not get sprint item details of other users', (done) => {
            
            chai.request(url)
                .get('/sprintitem/' + '1m8a03s23846298293934044' + '/' + '6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get sprint item details of the current user', (done) => {
            
            chai.request(url)
                .get('/sprintitem/' + '5c77a38ab6c49026fe3915d6' + '/' + '5')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /sprintitems/:projectID/:sprintID', () => {
        it('it should not get sprint item details of other users', (done) => {
            
            chai.request(url)
                .get('/sprintitems/' + '5c77a38ab6c49026fe3915d6' + '/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get sprint item details of the current user', (done) => {
            
            chai.request(url)
                .get('/sprintitems/' + '5c77a38ab6c49026fe3915d6' + '/' + '5c7cb0237e8a970462830158')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /sprints/:projectID', () => {
        it('it should not get sprints assigned to other user projects', (done) => {
            
            chai.request(url)
                .get('/sprints/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get sprints assigned to the current users project', (done) => {
            
            chai.request(url)
                .get('/sprints/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /sprint/:projectID/:sprintID', () => {
        it('it should not get sprint details of other users projects', (done) => {
            
            chai.request(url)
                .get('/sprint/' + '1m8a03s23846298293934044' + '/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get sprint details of current users project with sprintID', (done) => {
            
            chai.request(url)
                .get('/sprint/' + '5c77a38ab6c49026fe3915d6' + '/' + '5c7cb0237e8a970462830158')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /issuesAddedToSprints/:projectID', () => {
        it('it should not get all the sprint items added to another users project', (done) => {
            
            chai.request(url)
                .get('/issuesAddedToSprints/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get all the sprint items added to current users project', (done) => {
            
            chai.request(url)
                .get('/issuesAddedToSprints/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    
});