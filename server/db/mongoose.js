var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*
* Starting a mongodb server locally: 
* ./mongod --dbpath ~/mongo-data
*/
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });  // connecting to a mongodb local instance
// mongoose.connect('mongodb://mongo');  // connecting to a mongodb container

module.exports = {
    mongoose
}
