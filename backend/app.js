
// importing the connectToMongo function which connects the program to mongoDB
const connectToMongo = require('./db.js');
const express = require('express');

const app = express();

//to let express know that the incoming request would be in the form of json
var cors = require('Cors')
app.use(cors())
app.use(express.json());
const port = 5000;
connectToMongo();


// creating routes for our website
app.use('/auth', require('./routes/auth.js'));
app.use('/tasks', require('./routes/tasks.js'));

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
})

