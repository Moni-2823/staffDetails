const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

var app = express();

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to db',err)
    }
    var db = client.db('staffDataCollection')
    console.log('connected to mongoClinet');
});

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.post('/savingDetailsOfStaffs',(req, res) => {
    
})



app.listen((3000), () => {
    console.log('server is on port 3000');
})