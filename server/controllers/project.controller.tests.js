require('../config/config'); 

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let url = process.env.API_BASE_URL;

let token = null;

describe('Project Controller', () => {

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

    context('POST /project/create', () => {
        it('it should not create duplicate Project', (done) => {

            let Project = {
                title: 'Git Demo Nadun',
                githubURL: 'https://github.com/NadunKulatunge/git-demo-Nadun',
                githubPartURL: 'NadunKulatunge/git-demo-Nadun',
                description: 'Demo project done by nadun',
                userID: '5c765e8805774804f3fe1b15'
            }
            
            chai.request(url)
                .post('/project/create')
                .set("Authorization", "Bearer " + token)
                .send(Project)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });


    context('GET /projects', () => {
        it('it should get projects of the current user', (done) => {
            
            chai.request(url)
                .get('/projects')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    context('GET /project/:projectID', () => {
        it('it should not get project information of other users', (done) => {
            
            chai.request(url)
                .get('/project/' + '1m8a03s23846298293934044')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('it should get project information of the current user', (done) => {
            
            chai.request(url)
                .get('/project/' + '5c77a38ab6c49026fe3915d6')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    
});