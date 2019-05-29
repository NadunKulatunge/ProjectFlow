const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');

const ctrlUser = require('../controllers/user.controller');

//var accessToken = '';

//Get Github User Profile of the user ( GET /github )
module.exports.getGithubUserProfile = (req, res, next) =>{

    if(req._githubToken){
        request
        .get('https://api.github.com/user')
        .set('Authorization', 'token ' + req._githubToken)
        .then(result => {
            res.send(result.body);
        })
        .catch((err) => {
            res.status(403).json({ status: false, message: 'Github access forbidden.' });
        });
    } else {
        request
        .get('https://api.github.com/user')
        //.set('Authorization', 'token ' + accessToken)
        .then(result => {
            res.send(result.body);
        })
        .catch((err) => {
            res.status(403).json({ status: false, message: 'Github access forbidden.' });
        });
    }

    
}

//Github Auth
module.exports.githubSignIn = (req, res, next) =>{

    const { query } = req;
    const { code } = query;

    if(!code){
        return res.send({
            success: false,
            message: 'Error: no code'
        })
    }
    //POST
    request
    .post('https://github.com/login/oauth/access_token')
    .send({ 
        client_id: process.env.AUTH_CLIENT, 
        client_secret: process.env.AUTH_SECRET,
        code: code
    })
    .set('Accept', 'application/json')
    .then(function(result) {
        const data = result.body;
        if(ctrlUser.globalUserID){
            User.updateOne({_id: ctrlUser.globalUserID}, {
                $set: {
                    accessToken: data.access_token,
                }
            }, {new: true} ,function(err, result) {
                if(err) {
                    res.json(err);
                } else {
                    res.json('Login Success! Please re-login to ProjectFlow to use the new features');
                }
            });
        }else {
            return res.status(403).json({ status: false, message: 'Error while trying to connect to GitHub', error: result.body});
        }

    });
    
}


//Get Open Issues of a project ( GET /githubopenissues/:projectID )
module.exports.getGithubOpenIssues = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:open&sort=created&order=asc&page='+ req.params.page;

                if(req._githubToken){
                    request
                    .get(url)

                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                } else {
                    request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                }
                
                
            }
        }
    );

}

module.exports.getGithubClosedIssues = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:closed&sort=created&order=asc';

                if(req._githubToken){
                    request
                    .get(url)

                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                } else {
                    request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                }
                
                
            }
        }
    );
    
}


module.exports.getGithubIssueCount = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:'+req.params.type+'+state:'+req.params.state;
                if(req._githubToken){
                    request
                    .get(url)

                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                } else {
                    request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                }
                
                
            }
        }
    );
    
}

//req.params.projectID - projectID
module.exports.getGithubIssueFromNumber = (req, res, next) =>{
    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/repos/' + project.githubPartURL + '/issues/'+req.params.issueNumber;

                if(req._githubToken){
                    request
                    .get(url)

                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                } else {
                    request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                    });
                }  
            }
        }
    );
    
}

//Get sprint openissuecount, closedissuecount using sprintID
module.exports.getGithubSprintDetails = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(405).json({ status: false, message: 'Project record read access forbidden.' });
            }else {

                SprintItem.find({ sprintID: req.params.sprintID },
                    (err, sprintitems) => {
                        var output = [];
                        var i = 0;
                        var openIssueCount = 0;
                        var closedIssueCount = 0;
                        sprintitems.forEach( (sprintitem) => {
                            
                            url = 'https://api.github.com/repos/' + project.githubPartURL + '/issues/'+sprintitem.issueNumber;

                            if(req._githubToken){
                                request
                                    .get(url)

                                    .set('Authorization', 'token ' + req._githubToken)
                                    .then(result => {
                                        if(result.body.state == 'open'){
                                            openIssueCount++
                                        }else if(result.body.state == 'closed'){
                                            closedIssueCount++
                                        }

                                        output.push({issueNumber: sprintitem.issueNumber, state: result.body.state});
                                        i++

                                        if(sprintitems.length == i){
                                            output.unshift({sprintID: sprintitem.sprintID, openIssues: openIssueCount, closedIssues: closedIssueCount});
            
                                            res.send(output);
                                        }
                                    })
                                    .catch((err) => {
                                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                                    });
                            } else {
                                request
                                    .get(url)
                                    .then(result => {
                                        if(result.body.state == 'open'){
                                            openIssueCount++
                                        }else if(result.body.state == 'closed'){
                                            closedIssueCount++
                                        }

                                        output.push({issueNumber: sprintitem.issueNumber, state: result.body.state});
                                        i++

                                        if(sprintitems.length == i){
                                            output.unshift({sprintID: sprintitem.sprintID, openIssues: openIssueCount, closedIssues: closedIssueCount});
            
                                            res.send(output);
                                        }
                                    })
                                    .catch((err) => {
                                        res.status(403).json({ status: false, message: 'Github access forbidden.' });
                                    });
                            }

                        });             
                        
                    }
                );

            }
        }
    );
}


module.exports.githubCreateIssue = (req, res, next) => {

    //Converting labels into an array
    if(req.body.labels!=null){
        labelsArray = new Array();
        labelsArray = req.body.labels.split(",");
        req.body.labels = labelsArray;
    }else{delete req.body['labels'];}

    //Converting assignees into an array
    if(req.body.assignees!=null){
        assigneesArray = new Array();
        assigneesArray = req.body.assignees.split(",");
        req.body.assignees = assigneesArray;
    }else{delete req.body['assignees'];}

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/repos/' + project.githubPartURL + '/issues';

                if(req._githubToken){
                    request
                    .post(url)
                    .send(req.body)
                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        res.status(403).json({ status: false, message: err.response.body.message });
                    });
                } else {
                    res.status(403).json({ status: false, message: 'Sorry! Account not linked to github' });
                    
                }  
            }
        }
    );
    
}

module.exports.githubEditIssue = (req, res, next) => {

    //Converting labels into an array
    if(req.body.labels!=null && req.body.labels!=[] && req.body.labels!=[''] && req.body.labels!='' && req.body.labels!=' '){
        labelsArray = new Array();
        labelsArray = req.body.labels.split(",").map(item => item.trim()); //Remove whitespaces and create an array of items
        req.body.labels = labelsArray;
    }else{delete req.body.labels; req.body.labels=[]; } //Remove all the labels

    //Converting assignees into an array
    if(req.body.assignees!=null && req.body.labels!=[] && req.body.labels!=[''] && req.body.labels!='' && req.body.labels!=' '){
        assigneesArray = new Array();
        assigneesArray = req.body.assignees.split(",").map(item => item.trim()); //Remove whitespaces and create an array of items
        req.body.assignees = assigneesArray;
    }else{delete req.body.assignees; req.body.assignees=[];} //Remove all the assignees

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/repos/' + project.githubPartURL + '/issues/' + req.params.issueNumber;

                if(req._githubToken){
                    request
                    .post(url)
                    .send(req.body)
                    .set('Authorization', 'token ' + req._githubToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        console.log(err.response.body)
                        res.status(403).json({ status: false, message: err.response.body.message });
                    });
                } else {
                    res.status(403).json({ status: false, message: 'Sorry! Account not linked to github' });
                    
                }  
            }
        }
    );
    
}

module.exports.githubLogout = (req, res, next) =>{
    User.update({_id: req._id},{
        $unset: {
            accessToken:1
        }
    },
    
    function(err, result) {
        if(err){
            return res.status(404).json({ status: false, message: 'Not found.' });
        } else {
            return res.status(200).json({ status: true, result });
        }
    });
            
}

