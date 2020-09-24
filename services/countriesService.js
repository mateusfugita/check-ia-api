const mongo = require('mongoskin');
const connection = process.env.MONGO_URL;
const db = mongo.db(connection, { native_parser: true });
db.bind('country');

const service = {
    create: create,
    // index: index,
    findOne: findOne,
    findAll, findAll,
    delete: _delete,
    update: update,
}

function create(countryParams){
    db.country.insert(countryParams, function(err){

    })
}

// function index(name){
//     return (name ? findOne(name) : findAll);
// }

function findOne(name){
    db.country.findOne({ name }, (err, country) => {
        return country;
    });
}

function findAll(){
    db.country.find().toArray((err, items) => {
        return items;
    });
}

function _delete(){

}

function update(){

}

module.exports = service;