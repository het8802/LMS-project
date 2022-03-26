const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    'userID' : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    'description': {
        type: String,
        required: true
    },
    'completed': {
        type: Boolean,
        required: true
    },
    'deadline': {
        type: Date,
        required: false
    }
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;