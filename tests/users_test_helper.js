const User = require('../models/user')

const initialUsers = []

const nonExistingId = async () => {}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers, nonExistingId, usersInDb
}