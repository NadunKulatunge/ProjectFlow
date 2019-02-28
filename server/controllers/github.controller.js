const mongoose = require('mongoose');

const User = mongoose.model('User');

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

    request
    //.get('https://api.github.com/repos/flutter/flutter/issues?state=open&sort=created&direction=asc')
    //.get('https://api.github.com/repos/dipakkr/A-to-Z-Resources-for-Students/issues?state=open&sort=created&direction=asc')
    .get('https://api.github.com/search/issues?q=repo:dipakkr/A-to-Z-Resources-for-Students+type:issue')

    .set('Authorization', 'token ' + accessToken)
    .then(result => {
        res.send(result.body);
    });

}