const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');


module.exports.createSprintItem = (req, res, next) =>{
    var sprintItem = new SprintItem();
    sprintItem.projectID = req.body.projectID;
    sprintItem.issueNumber = req.body.issueNumber;
    sprintItem.sprintID = req.body.sprintID;
    sprintItem.sprintTitle = req.body.sprintTitle;

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

module.exports.projectIssuesAddedToSprints = (req, res, next) =>{

    Project.findOne({ _id: req.params.pid },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Sprint read access forbidden.' });
            }else {

                SprintItem.find().where("projectID", req.params.pid).
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