const mongoose = require('mongoose');

var sprintSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: 'Project ID can\'t be empty'
    },
    projectID: {
        type: String,
        required: 'Project ID can\'t be empty'
    },
    title: {
        type: String,
        required: 'Sprint title can\'t be empty',
    },
    startDate: {
        type: Date,
        required: 'Start date can\'t be empty',
    },
    endDate: {
        type: Date,
        required: 'End date can\'t be empty',
    }
});

sprintSchema.index( { userID: 1, projectID: 1, title: 1 }, { unique: true } );

mongoose.model('Sprint', sprintSchema);