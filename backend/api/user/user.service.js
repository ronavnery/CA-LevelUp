
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    checkCredentials,
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    verifyUnique
}

async function checkCredentials(credentials) {
    const {userName, password} = credentials 
    const collection = await dbService.getCollection('user')
    try {
        const dbUser = await collection.findOne(
            {
                    userName,
                    password
            }
        )
        if(dbUser) return dbUser
        else return 'username or password wrong'
    }
    catch (err) {
        console.log(err)
    }
}

async function verifyUnique({email, userName}) {
    const credentials = {email, userName}
    const collection = await dbService.getCollection('user')
    try {
        const dbUser = await collection.findOne(credentials)
        if (!dbUser) return true
        else return false;
    }
    catch (err) {

    }
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = {$gte : filterBy.minBalance}
    }


    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({"_id":ObjectId(userId)})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByUsername(userName) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({userName})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userName}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.replaceOne({"_id":ObjectId(user._id)}, {$set : user})
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(newUser) {
    const collection = await dbService.getCollection('user')
    try {
        const registeredUser = await collection.insertOne(newUser);
        return registeredUser;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


