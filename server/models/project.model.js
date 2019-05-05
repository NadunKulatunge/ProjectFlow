const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Project name can\'t be empty',
        minlength: [4, 'Title must be atleast 4 character long'],
        maxlength: [80, 'Title cannot be more than 25 character long']
    },
    githubURL: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    githubPartURL: {
        type: String,
        required: 'URL can\'t be empty',
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
        minlength: [4, 'Description must be atleast 4 character long'],
        maxlength: [200, 'Description cannot be more than 50 character long']
    },
    userID: {
        type: String,
        required: 'You are not logged in',
    }
});


mongoose.model('Project', projectSchema);

projectSchema.path('githubURL').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    if(!urlRegex.test(val)) { //Invalid URL
        console.log('Invalid')
        return false;
    } else { 
        urlsplit = val.split("/");
        domain = urlsplit[2];
        if(domain=="github.com" || domain=="www.github.com"){ //Valid
            console.log('valid')
            return true;
        } else { //Invalid
            console.log('Invalid')
            return false;
        }
    }
    
}, 'Invalid Github URL');