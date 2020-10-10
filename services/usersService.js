const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const lodash = require('lodash');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {useUnifiedTopology: true});

const service = {
    create: create,
    authenticate: authenticate,
}

async function create(userParams){
    try {
        if(await findOne(userParams.username)){
            return { message: 'Esse usuário já existe' };
        }

        let user = lodash.omit(userParams, 'password');
        user.hash = bcrypt.hashSync(userParams.password, 10);

        const message = client.connect().then(async () => {
            const userCollection = client.db('checkia').collection('user');
            return await userCollection.insertOne(user).then(async (result) => {
                return { insertedCount: result.insertedCount };
            });
        });
        return message;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function findOne(username){
    try {
        const response = client.connect().then(async () => {
            const userCollection = client.db('checkia').collection('user');
            return await userCollection.findOne({ username }).then(async (user) => {
                return user;
            });
        });
        return response;
    } catch (error) {
        await client.close();
        return { erro: 'Ocorreu um erro ao realizar a operação no banco' };
    }
}

async function authenticate(username, password){
    try {
        const response = client.connect().then(async () => {
            const userCollection = client.db('checkia').collection('user');
            return await userCollection.findOne({ username }).then(async (user) => {
                if(user && bcrypt.compareSync(password, user.hash)){
                    return {
                        auth: true,
                        token: jwt.sign({ sub: user._id }, process.env.SECRET),
                        userId: user._id
                    }
                }
                else{
                    return {
                        auth: false,
                        message: 'Authentication failed'
                    }
                }
            });
        });
        return response;
    } catch (error) {
        await client.close();
        return { 
            auth: false,
            erro: 'Ocorreu um erro ao tentar realizar a autenticação'
         };
    }
}

module.exports = service;