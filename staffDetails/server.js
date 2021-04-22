const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to db',err)
    }
    var db = client.db('staffData')
    console.log('connected to mongoClinet');




app.post('/savingDetailsOfStaffs',(req, res) => {
    db.collection('staffDetails').insertOne(req.body, (err, data) => {
        if(err) {
            return console.log('error found',err);
        }
        console.log('data saved succesfully',data);
        res.send({msg: 'saved details is...', result: data});
    })
})


app.get('/fetchingDetailsOfStaffs', (req, res) => {
    db.collection('staffDetails').find().toArray((err, data) => {
        if(!data) {
            console.log('empty data found',err);
        }
        console.log('staff details are...',data);
        res.send({msg: 'finded data is:',returnData: data});
    })
})

app.post('/updatingDetails', (req, res) => {
    db.collection('staffDetails').findOneAndUpdate({
        _id: new ObjectID(req.body.id)
    },{
        $set: {
            "name": req.body.name,
            "gender": req.body.gender
        }
    },{
        returnOriginal: false
    }).then((data) => {
        if(!data.value) {
            return res.send({msg: 'data not fetched'})
        }
        console.log('deatails updated sucessfully',data);
        res.send({msg: 'updated details is:',returnData: data});
    })
})

app.post('/deletingDetails',(req, res) => {
    db.collection('staffDetails').findOneAndDelete({
        _id: new ObjectID(req.body.id)}).then((data) => {
        if(!data) {
            return res.send({msg: 'details not found to delete'});
        }
        console.log('details deleted sucessfully',data);
        res.send({msg: 'deleted data is :', returnData: data});
    })
})
});



app.listen((3000), () => {
    console.log('server is on port 3000');
})