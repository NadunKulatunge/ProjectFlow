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
        minlength: [4, 'Sprint title must be atleast 4 character long'],
        maxlength: [25, 'Sprint title cannot be more than 25 character long']
    },
    startDate: {
        type: Date,
        required: 'Start date can\'t be empty',
    },
    endDate: {
        type: Date,
        required: 'End date can\'t be empty',
        validate: [dateValidator, 'Start Date must be less than End Date']
    }
});

sprintSchema.index( { userID: 1, projectID: 1, title: 1 }, { unique: true } );

mongoose.model('Sprint', sprintSchema);

function dateValidator(value) {
    return this.startDate <= value;
}