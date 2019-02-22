var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();
var port = process.env.PORT || 3000;

// Middleware that enables JSON body parsing
app.use(bodyParser.json());

// Create new Todo object
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// Get all Todo objects
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Get Todo object by parameter ID
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(`ID ${id} is not valid`);
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {
    app
};
