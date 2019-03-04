const mongoose = require('mongoose');

var sprintItemSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: 'Project ID can\'t be empty'
    },
    issueNumber: {
        type: Number,
        required: 'Issue number can\'t be empty',
    },
    sprintID: {
        type: String,
        required: 'Sprint ID can\'t be empty',
    },
    sprintTitle: {
        type: String,
        required: 'Sprint title can\'t be empty',
    }
});

sprintItemSchema.index( { projectID: 1, issueNumber: 1}, { unique: true } );

mongoose.model('SprintItem', sprintItemSchema);