const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Project name can\'t be empty'
    },
    githubURL: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
    },
    userID: {
        type: String,
        required: 'You are not logged in',
    }
});


mongoose.model('Project', projectSchema);