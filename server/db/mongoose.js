var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*
* Starting a mongodb server locally: 
* ./mongod --dbpath ~/mongo-data
*/

// connecting to a mongodb local instance if not currently in Heroku
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
// var mongoURI = 'mongodb://mongo';  // connecting to a mongodb container
// mongoose.connect('mongodb://mongo');  

mongoose.connect(mongoURI, { useNewUrlParser: true });

module.exports = {
    mongoose
}
