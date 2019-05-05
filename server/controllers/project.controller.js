const mongoose = require('mongoose');
const _ = require('lodash');

const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');

//To Create a new Project(POST /project/create)
module.exports.createProject = (req, res, next) => {

    var project = new Project();
    project.title = req.body.title;
    project.githubURL = req.body.githubURL;
    project.githubPartURL = req.body.githubPartURL;
    project.description = req.body.description;
    project.userID = req.body.userID;

    project.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Github URL found.']);
            else
                return next(err);
        }

    });
}

//Get all the user projects ( GET /projects )
module.exports.getProjects = (req, res, next) =>{

    Project.find().where("userID", req._id).
        exec(function(err, result) {
            if (!result)
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            else
                return res.status(200).json({ status: true, result });
        });

}

//Get Project Information to the given user project ( GET /project/:projectID )
module.exports.getProjectInfo = (req, res, next) =>{
    
    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
                return res.status(200).json({ status: true, project });
            }
        }
    );

}

module.exports.removeProject = (req, res, next) =>{

    errors = [];
    responses = [];
    Project.findOne({ _id: req.params.projectID },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403.2).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
                //Remove the Project
                SprintItem.remove({projectID:req.params.projectID}, 
                    (err, result) => {
                        if(err){
                            errors.push(err);
                        } else {
                            responses.push(result);
                        }
                });
                //Remove Sprints
                Sprint.remove({projectID:req.params.projectID}, 
                    (err, result) => {
                        if(err){
                            errors.push(err);
                        } else {
                            responses.push(result);
                        }
                });
                //Remove Projects
                Project.remove({_id:req.params.projectID}, 
                    (err, result) => {
                        if(err){
                            errors.push(err);
                        } else {
                            responses.push(result);
                            return res.status(200).json({ success: true, message: "Deleted successfully" });
                        }
                });

            }
        }
    );

}