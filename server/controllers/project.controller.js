const mongoose = require('mongoose');
const _ = require('lodash');

const Project = mongoose.model('Project');

const request = require('superagent');

module.exports.createProject = (req, res, next) => {
    var project = new Project();
    project.title = req.body.title;
    project.githubURL = req.body.githubURL;
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
             // docs contains an array of MongooseJS Documents
             // so you can return that...
             // reverse does an in-place modification, so there's no reason
             // to assign to something else ...
            if (!result)
                return res.status(411).json({ status: false, message: 'Project record not found.' });
            else
                return res.status(200).json({ status: true, result });

          });



}