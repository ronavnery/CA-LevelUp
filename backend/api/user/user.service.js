
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    checkCredentials,
    query,
    getById,
    getByNickname,
    remove,
    update,
    add,
    verifyUnique
}

async function checkCredentials(credentials) {
    const {nickName, password} = credentials 
    const collection = await dbService.getCollection('user')
    try {
        const dbUser = await collection.findOne(
            {
                    nickName,
                    password
            }
        )
        if(dbUser) return dbUser
        else return 'nickname or password wrong'
    }
    catch (err) {
        console.log(err)
    }
}

async function verifyUnique(email, nickName) {
    console.log('got email:', email)
    console.log('got nickName', nickName)
    const collection = await dbService.getCollection('user')
    try {
        const dbUser = await collection.findOne({
            $or: [
                {email},
                {nickName} 
            ]
        })
        if (!dbUser) return true
        else return false;
    }
    catch (err) {
        throw err
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
async function getByNickname(nickName) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({nickName})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${nickName}`)
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


