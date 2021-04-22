const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

var app = express();

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
console.log('connected to mongoClinet');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())



app.listen((3000), () => {
    console.log('server is on port 3000');
})