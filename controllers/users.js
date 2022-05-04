const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

usersRouter.get('/:id', async (request, response) => {
    User.findById(request.params.id)
        .then(user => {
            if (user) {
                response.json(user)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


usersRouter.post('/', async (request, response) => {
    const requestUser = request.body
    console.log('post user request: ', requestUser)

    const existingUser = await User.findOne({username: requestUser.username})
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(requestUser.password, saltRounds)

    const user = new User({
        username: requestUser.username,
        name: requestUser.name,
        surname: requestUser.surname,
        phone: requestUser.phone,
        sex: requestUser.sex,
        churchStatus: requestUser.churchStatus,
        status: 'new',
        passwordHash: passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})

module.exports = usersRouter

