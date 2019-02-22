// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  // ES6 destructuring nested objects syntax trick

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';  // A new MongoDB database is created by providing a name 

var user = {name: 'João', age: 26};
var {name} = user;  // ES6 destructuring nested objects syntax trick

// Programmatically generate a new document ID
var obj = new ObjectID();
console.log(obj);

MongoClient.connect(url, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // A new collection is created by providing a name
    // db.collection('Todos').insertOne({
    //     text: 'Stuff to do tomorrow',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert todo ${err}`);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
        // _id: 123,  // optional field, mongo sets a default id if none is specified
    //     name: 'João',
    //     age: 26,
    //     location: 'Faro'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert todo ${err}`);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });

    // Querying the MongoDB database
    db.collection('Todos').find({
        _id: new ObjectID('5c6d90163291ef4f83b7728b')
    }).toArray().then((docs) => {
        console.log(`Todos: ${JSON.stringify(docs, undefined, 2)}`);
    }, (err) => {
        console.log(`Unable to fetch todos: ${err}`);
    });

    // Counting all users with certain name
    db.collection('Users').find({name: 'João'}).count().then((count) => {
        console.log(`There are ${count} users with name João`);
    }, (err) => {
        console.log(`Unable to fetch count: ${err}`);
    });

    // Delete several documents
    db.collection('Todos').deleteMany({text: 'To be deleted'}).then((result) => {
        console.log(result);
    });

    // Delete the first document it finds
    db.collection('Todos').deleteOne({completed: true}).then((result) => {
        console.log(result);
    });

    // Find and delete a single document in one atomic operation
    db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });

    // Update a single document 
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5c6d75ed6be1894e5d2bd6d9")
    }, {
        $set: {
            name: 'Stephen Hawking'  // Sets the value of 'name' field
        },
        $inc: { 
            age: 1  // Adds 1 to current age value because of the increment operator
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});
