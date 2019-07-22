
const MongoClient = require('mongodb').MongoClient;

const config = require('../config')

// Database Name
const dbName = 'levelup_db';

var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    try {
        const db = await connect()
        return db.collection(collectionName);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    connect,
    getCollection
}