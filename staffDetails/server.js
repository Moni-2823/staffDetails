const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//env = envirionment variable,, server assign port  hroku:2080, aws:3400, godaddy:1010 
var port = process.env.PORT || 3000;

// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, (err, client) => {
//     if (err) {
//         return console.log('unable to connect to db',err)
//     }
//     var db = client.db('staffData')
//     console.log('connected to mongoClinet');

mongoose.connect('mongodb+srv://moni-yadav:moni0987@cluster0.sxojg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, success) => {
        if (err) {
            return console.log('unable to connet to mongo')
        }
        console.log('connected to mongoose');
})

var recordsSchema = new mongoose.Schema({
    name:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: Number
    }
})

// recordsSchema.methods.newMethodFunction =  function() {
//     console.log(this.name)
//     return this.name
// }

var dataRecords = mongoose.model('dataRecords', recordsSchema)


// app.post('/savingDetailsOfStaffs',(req, res) => {
//     db.collection('staffDetails').insertOne(req.body, (err, data) => {
//         if(err) {
//             return console.log('error found',err);
//         }
//         console.log('data saved succesfully',data);
//         res.send({msg: 'saved details is...', result: data});
//     })
// })

app.post('/savingDetailsOfStaffs',(req, res) => {
    var records = new dataRecords(req.body)
    records.save(req.body).then((doc) => {
        if(!doc) {
            return res.status(404).send({msg: 'data not found to save'});
        }
        // var theRetunFromMethod = doc.newMethodFunction()
        console.log('details saved sucessfully',doc);
        res.status(200).send({msg: 'saved details is...',returnedData: doc});
    }, (err) => {
        res.status(400).send({msg: 'error found',err});
    })
})


// app.get('/fetchingDetailsOfStaffs', (req, res) => {
//     db.collection('staffDetails').find().toArray((err, data) => {
//         if(!data) {
//             console.log('empty data found',err);
//         }
//         console.log('staff details are...',data);
//         res.send({msg: 'finded data is:',returnData: data});
//     })
// })

app.get('/fetchingDetailsOfStaffs',(req, res) => {
    dataRecords.find().then((doc) => {
        if(!doc) {
            return res.status(404).send({msg: 'staff details not found'});
        }
        console.log('details finded sucessfully',doc);
        res.status(200).send({msg: 'finded details are::',returnedData: doc});
    }, (err) => {
        res.status(400).send({msg: 'errror found',err});
    })
})

// app.post('/updatingDetails', (req, res) => {
//     db.collection('staffDetails').findOneAndUpdate({
//         _id: new ObjectID(req.body.id)
//     },{
//         $set: {
//             "name": req.body.name,
//             "gender": req.body.gender
//         }
//     },{
//         returnOriginal: false
//     }).then((data) => {
//         if(!data.value) {
//             return res.send({msg: 'data not fetched'})
//         }
//         console.log('deatails updated sucessfully',data);
//         res.send({msg: 'updated details is:',returnData: data});
//     })
// })

app.post('/updatingDetails',(req,res) => {
    dataRecords.findByIdAndUpdate(req.body.id, 
        {$set:
            {name: req.body.name}
        }, {
            new:true
        }).then((doc) => {
        if(!doc) {
            return res.status(404).send({msg: 'details not found to update'});
        }
        console.log('data updated sucessfully',doc);
        res.status(200).send({msg: 'updated details is::',returnedData: doc});
    }, (err) => {
        res.status(400).send({msg: 'error found',err});
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

app.post('/deletingData', (req, res) => {
    dataRecords.findByIdAndDelete(req.body.id).then((doc) => {
        if(!doc) {
            return res.status(404).send({msg: 'details not found to delete'});
        }
        console.log('data deleted sucessfully',doc);
        res.status(200).send({msg: 'deleted data is:::',returnedData: doc});
    }, (err) => {
        res.status(400).send({msg: ' error found',err});
    })
})
// });



app.listen((port), () => {
    console.log(`server is on port ${port}`);
})