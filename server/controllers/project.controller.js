const mongoose = require('mongoose');
const _ = require('lodash');

const Project = mongoose.model('Project');

const request = require('superagent');

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

module.exports.userProjects = (req, res, next) =>{
    console.log(req._id)

    Project.find().where("userID", req._id).
        exec(function(err, result) {
            if (!result)
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            else
                return res.status(200).json({ status: true, result });
        });

}

module.exports.projectInfo = (req, res, next) =>{
    console.log(req.params.id)
    
    Project.findOne({ _id: req.params.id },
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