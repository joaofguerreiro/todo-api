var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*
* Starting a mongodb server locally: 
* ./mongod --dbpath ~/mongo-data
*/
mongoose.connect('mongodb://localhost:27017');  // connecting to a mongodb local instance
// mongoose.connect('mongodb://mongo');  // connecting to a mongodb container


// Create Model
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// Create Model
var User= mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    }
});

// Create a Todo object
var newTodo = new Todo({
    text: 'Do this today',
    // completed: false
});

// Save a Todo object
newTodo.save().then((doc) => {
    console.log(`Saved todo ${doc}`);
}, (e) => {
    console.log('Unable to save todo');
});

// Create another Todo object
var anotherTodo = new Todo({
    // text: 'Create a project',
    text: 's',
    completed: true,
    completedAt: 382016592
});

// Save another Todo object
anotherTodo.save().then((doc) => {
    console.log(`Saved another todo ${doc}`);
}, (e) => {
    console.log('Unable to save another todo')
});

var user = new User({
    email: 'x'
});

user.save().then((doc) => {
    console.log(`User saved: ${doc}`);
}, (e) => {
    console.log(`Unable to save user: ${e}`);
});
