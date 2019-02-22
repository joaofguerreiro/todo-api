const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');

var id = "5c6fd7a7d2f895678b0a7375";

if (!ObjectID.isValid(id)) {
    return console.log(`The id ${id} is not valid`);
}

// Finding all documents that match the query
Todo.find({
    _id: id
}).then((todos) => {
    console.log(`Todos: ${todos}`);
});

// Finding a document by other fields
Todo.findOne({
    _id: id 
}).then((todo) => {
    console.log(`Todo: ${JSON.stringify(todo, undefined, 2)}`)
});

// Finding a document by ID
Todo.findById(id).then((todo) => {
    if (!todo) {
        console.log(`Todo with id ${id} not found`);
    }
    console.log(`Todo by id: ${JSON.stringify(todo, undefined, 2)}`)
}).catch((err) => console.log(err));
