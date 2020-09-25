const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {useUnifiedTopology: true});

const service = {
    create: create,
    findOne: findOne,
    findAll, findAll,
    delete: _delete,
    update: update,
}

async function create(countryParams){
    let message;
    console.log(countryParams);
    try {
        await client.connect();
        const countryCollection = client.db('checkia').collection('country');
        const result = await countryCollection.insertOne(countryParams);
        message = { insertedCount: result.insertedCount };
    } catch (error) {
        message = { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
    finally{
        await client.close();
        return message;
    }
}

async function findOne(name){
    let message;
    try {
        await client.connect();
        const countryCollection = client.db('checkia').collection('country');
        const findResult = await countryCollection.findOne({ name });
        message = { country: findResult };
    } catch (error) {
        message = { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
    finally{
        await client.close();
        return message;
    }
}

async function findAll(){
    let message;
    let countries = [];
    try {
        await client.connect();
        const countryCollection = client.db('checkia').collection('country');
        const cursor = countryCollection.find({});
        await cursor.forEach(result => {
            countries.push(result);
        });
        message = { countries };
    } catch (error) {
        message = { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
    finally{
        await client.close();
        return message;
    }
}

async function _delete(name){
    let message;
    try {
        await client.connect();
        const countryCollection = client.db('checkia').collection('country');
        const deletedResult = await countryCollection.deleteOne({ name });
        message = { deletedCount: deletedResult.deletedCount};
    } catch (error) {
        message = { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
    finally{
        await client.close();
        return message;
    }
}

async function update(name, ptName, abbreviation){
    let message;
    try {
        await client.connect();
        const countryCollection = client.db('checkia').collection('country');
        const filter = { name };
        const result = await countryCollection.replaceOne(filter, { name, ptName, abbreviation });
        message = { newCountryValues: result.ops };
    } catch (error) {
        message = { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
    finally{
        await client.close();
        return message;
    }
}

module.exports = service;