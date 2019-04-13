const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

const request = require('superagent');


//module.exports.globalUserID = '';

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
            console.log(user)
            module.exports.globalUserID = user._id;
            return res.status(200).json({ "token": user.generateJwt() });
            //module.exports.globalUserID = '';
            
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fullName','email']) });
        }
    );
}

module.exports.github = (req, res, next) =>{

        const accessToken = '9605bc40b37f04ccc8673f6ebe23aa4a9ff6c7f7';
    
        request
        .get('https://api.github.com/user')
        .set('Authorization', 'token ' + accessToken)
        .then(result => {
            res.send(result.body);
        });
    
}