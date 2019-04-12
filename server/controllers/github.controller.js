const mongoose = require('mongoose');

const User = mongoose.model('User');
const Project = mongoose.model('Project');
const SprintItem = mongoose.model('SprintItem');
const Sprint = mongoose.model('Sprint');

const request = require('superagent');

module.exports.githubUserProfile = (req, res, next) =>{

    //const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';

    request
    .get('https://api.github.com/user')
    //.set('Authorization', 'token ' + accessToken)
    .then(result => {
        res.send(result.body);
        console.log(result)
    })
    .catch((err) => {
        console.log('Bad credentials');
        res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
    });
    
}

module.exports.githubOpenIssues = (req, res, next) =>{

    //const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:open&sort=created&order=asc';

                console.log(url)
                request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        console.log('Bad credentials');
                        res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
                    });
                
            }
        }
    );

}

module.exports.githubClosedIssues = (req, res, next) =>{

    //const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:issue+state:closed&sort=created&order=asc';

                console.log(url)
                request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        console.log('Bad credentials');
                        res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
                    });
                
            }
        }
    );
    
}


module.exports.githubIssueCount = (req, res, next) =>{

    //const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/search/issues?q=repo:' + project.githubPartURL + '+type:'+req.params.type+'+state:'+req.params.state;

                console.log(url)
                request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        console.log('Bad credentials');
                        res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
                    });
                
            }
        }
    );
    
}

module.exports.githubGetIssueFromNumber = (req, res, next) =>{

    //const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    console.log(req.params.id, req.params.issuenum )
    Project.findOne({ _id: req.params.id },
        (err, project) => {
            if (!project){
                return res.status(404).json({ status: false, message: 'Project record not found.' });
            } else if(project.userID != req._id) {
                return res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
            }else {
               url = 'https://api.github.com/repos/' + project.githubPartURL + '/issues/'+req.params.issuenum;

                console.log(url)
                request
                    .get(url)

                    //.set('Authorization', 'token ' + accessToken)
                    .then(result => {
                        res.send(result.body);
                    })
                    .catch((err) => {
                        console.log('Bad credentials');
                        res.status(403).json({ status: false, message: 'Project record read access forbidden.' });
                    });
                
            }
        }
    );
    
}

   
    

