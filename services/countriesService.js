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
    try {
        const message = client.connect().then(async () => {
            const countryCollection = client.db('checkia').collection('country');
            return await countryCollection.insertOne(countryParams).then(async (result) => {
                return { insertedCount: result.insertedCount };
            });
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function findOne(name){
    try {
        const message = client.connect().then(async () => {
            const countryCollection = client.db('checkia').collection('country');
            return await countryCollection.findOne({ name }).then(async (findResult) => {
                return { country: findResult };
            });
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function findAll(){
    try {
        const message = client.connect().then(async () => {
            let countries = [];
            const countryCollection = client.db('checkia').collection('country');
            const cursor = countryCollection.find({});
            await cursor.forEach(result => {
                countries.push(result);
            });
            return countries;
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function _delete(name){
    try {
        const message = client.connect().then(async () => {
            const countryCollection = client.db('checkia').collection('country');
            return await countryCollection.deleteOne({ name }).then(async (deletedResult) => {
                return { deletedCount: deletedResult.deletedCount};
            });
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function update(name, newPtName, newAbbreviation){
    try {
        const message = client.connect().then(async () => {
            const countryCollection = client.db('checkia').collection('country');
            const filter = { name };
            const newCountry = {
                name,
                ptName: newPtName,
                abbreviation: newAbbreviation
            };
            return await countryCollection.replaceOne(filter, newCountry).then(async (result) => {
                return { newCountryValues: result.ops };
            });
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

module.exports = service;