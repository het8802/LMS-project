const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    profilePic: {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;