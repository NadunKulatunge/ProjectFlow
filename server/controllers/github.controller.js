const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');

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