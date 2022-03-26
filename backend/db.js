const mongoose = require('mongoose');

// connecting to mongoDB
const mongoURI = 'mongodb://localhost:27017/LMS?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
// const mongoURI = 'mongodb+srv://Het:test1234@lms-proj.2kz2j.mongodb.net/lms?retryWrites=true&w=majority'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log('connected to mongo');
    })
}

module.exports = connectToMongo;