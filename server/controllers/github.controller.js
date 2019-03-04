const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');

module.exports.githubUserProfile = (req, res, next) =>{

    const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';

    request
    .get('https://api.github.com/user')
    .set('Authorization', 'token ' + accessToken)
    .then(result => {
        res.send(result.body);
    });
    
}

module.exports.githubOpenIssues = (req, res, next) =>{

    const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:open&sort=created&order=asc';

                console.log(url)
                request
                    .get(url)

                    .set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    });
                
            }
        }
    );

}

module.exports.githubClosedIssues = (req, res, next) =>{

    const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:closed&sort=created&order=asc';

                console.log(url)
                request
                    .get(url)

                    .set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    });
                
            }
        }
    );
    
}


module.exports.githubIssueCount = (req, res, next) =>{

    const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:'+req.params.type+'+state:'+req.params.state;

                console.log(url)
                request
                    .get(url)

                    .set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    });
                
            }
        }
    );
    
}


module.exports.createSprintItem = (req, res, next) =>{
    var sprintItem = new SprintItem();
    sprintItem.projectID = req.body.projectID;
    sprintItem.issueID = req.body.issueID;
    sprintItem.sprintID = req.body.sprintID;

    sprintItem.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Sprint Item found.']);
            else
                return next(err);
        }

    });
    
}

module.exports.sprintItem = (req, res, next) =>{

    
}

module.exports.createSprint = (req, res, next) =>{
    var sprint = new Sprint();
    sprint.userID = req._id;
    sprint.projectID = req.body.projectID;
    sprint.title = req.body.title;
    sprint.startDate = req.body.startDate;
    sprint.endDate = req.body.endDate;
    
    Project.findOne({ _id: req.body.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project write access forbidden.' });
            }else {
                sprint.save((err, doc) => {
                    if (!err)
                        res.send(doc);
                    else {
                        if (err.code == 11000)
                            res.status(422).send(['Duplicate Sprint title found.']);
                        else
                            return next(err);
                    }
            
                });
                
            }
        }
    );



    
}

module.exports.sprint = (req, res, next) =>{
    console.log(req._id)

    Project.findOne({ _id: req.params.pid },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Sprint read access forbidden.' });
            }else {
                Sprint.find().where("projectID", req.params.pid).
                exec(function(err, result) {
                    if (!result)
                        return res.status(404).json({ status: false, message: 'Sprint record not found.' });
                    else
                        return res.status(200).json({ status: true, result });
                });
                
            }
        }
    );


   
    
}
