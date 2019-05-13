const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');

//To Create a new Sprint Items(Issues inside sprints)
module.exports.createSprintItem = (req, res, next) =>{
    var sprintItem = new SprintItem();
    sprintItem.projectID = req.body.projectID;
    sprintItem.issueNumber = req.body.issueNumber;
    sprintItem.sprintID = req.body.sprintID;
    sprintItem.sprintTitle = req.body.sprintTitle;
    sprintItem.userID = req._id;


    Project.findOne({ _id: req.body.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project access forbidden.' });
            }else {
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
    });
    
}


//get info about a sprint item ( GET /sprintitem/:projectID/:issueNumber )

module.exports.getSprintItem = (req, res, next) =>{
    SprintItem.findOne({userID: req._id,  projectID: req.params.projectID , issueNumber: req.params.issueNumber},
        (err, result) => {
            if (!result || result==[] || result==null || result =="")
                return res.status(404).json({ status: false, message: 'Not found.' });
            else
                return res.status(200).json({ status: true, result });
                
        }
    
    );
    
}

//Find sprint items assigned to a project sprint ( GET /sprintitems/:projectID/:sprintID )

module.exports.getSprintItems = (req, res, next) =>{
    SprintItem.find({userID: req._id , projectID: req.params.projectID , sprintID: req.params.sprintID}).where().
        exec(function(err, result) {
            if (!result || result==[] || result==null || result =="")
                return res.status(404).json({ status: false, message: 'Not found.' });
            else
                return res.status(200).json({ status: true, result });
        });
    
}

//Create Sprint for a Project ( POST /sprint/create )
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
                return res.status(404).json({ status: false, message: 'Project not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project access forbidden.' });
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

//Find sprints assigned to a project ( GET /sprints/:projectID )
module.exports.getSprints = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project access forbidden.' });
            }else {
                Sprint.find().where("projectID", req.params.projectID).
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

// Get sprint details assigned to a sprint in a project ( GET /sprint/:projectID/:sprintID ) 
module.exports.getSprint = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Sprint read access forbidden.' });
            }else {
                Sprint.find({userID: req._id, projectID:  req.params.projectID, _id: req.params.sprintID}).where().
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

// Get all the SprintItems added to a project ( GET /issuesAddedToSprints/:projectID ) 
module.exports.getIssuesAddedToSprints = (req, res, next) =>{

    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Sprint read access forbidden.' });
            }else {

                SprintItem.find().where("projectID", req.params.projectID).
                exec(function(err, result) {
                    if (!result)
                        return res.status(404).json({ status: false, message: 'Project record not found.' });
                    else
                        return res.status(200).json({ status: true, result });
                });
                
            }
        }
    );
    
}

//Find sprint items assigned to a project sprint ( DELETE /sprintitem/:projectID/:sprintID/:issueNumber )

module.exports.removeSprintItem = (req, res, next) =>{
    SprintItem.remove({userID: req._id , projectID: req.params.projectID , sprintID: req.params.sprintID, issueNumber: req.params.issueNumber }, 
        (err, result) => {
            if(err){
                return res.status(404).json({ status: false, message: 'Not found.' });
            } else {
                return res.status(200).json({ status: true, result });
            }
    });
            
}