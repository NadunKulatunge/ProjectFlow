require('../config/config'); 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let url = process.env.API_BASE_URL;

let token = null;

describe('Github Controller', () => {
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

    context('GET /github', () => {
        it('it should get Github profile of the current user', (done) => {
            
            chai.request(url)
                .get('/github')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /githubopenissues/:projectID', () => {
        it('it should not get open issues of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubopenissues/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get open issues of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubopenissues/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /githubclosedissues/:projectID', () => {
        it('it should not get closed issues of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubclosedissues/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get closed issues of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubclosedissues/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /githubissuecount/:projectID/:type/:state', () => {
        it('it should not get open issue count of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '1m8a03s23846298293934044'+ '/' + 'issues'+ '/' + 'open')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get open issue count of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '5c77a38ab6c49026fe3915d6'+ '/' + 'issues'+ '/' + 'open')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should not get closed issue count of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '1m8a03s23846298293934044'+ '/' + 'issues'+ '/' + 'closed')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get closed pull-request count of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '5c77a38ab6c49026fe3915d6'+ '/' + 'pull-requests'+ '/' + 'closed')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should not get open pull-request count of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '1m8a03s23846298293934044'+ '/' + 'pull-requests'+ '/' + 'open')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get open pull-request count of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '5c77a38ab6c49026fe3915d6'+ '/' + 'pull-requests'+ '/' + 'open')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should not get closed pull-request count of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '1m8a03s23846298293934044'+ '/' + 'pull-requests'+ '/' + 'closed')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get closed pull-request count of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubissuecount/' + '5c77a38ab6c49026fe3915d6'+ '/' + 'pull-requests'+ '/' + 'closed')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /githubGetIssueFromNumber/:projectID/:issueNumber', () => {
        it('it should not get closed issues of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubGetIssueFromNumber/' + '1m8a03s23846298293934044' + '/' + '5')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get closed issues of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubGetIssueFromNumber/' + '5c77a38ab6c49026fe3915d6' + '/' + '5')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /githubSprintDetails/:sprintID/:projectID', () => {
        it('it should not get closed issues of projects of other users', (done) => {
            
            chai.request(url)
                .get('/githubSprintDetails/' + '1m8a03s23846298293934044' + '/' + '5x322c33306833r3e3d3d34332')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get closed issues of projects of the current users', (done) => {
            
            chai.request(url)
                .get('/githubSprintDetails/' + '5c7cb0237e8a970462830158' + '/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    
    
});