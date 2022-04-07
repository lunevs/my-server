const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('users_test_helper')
const app = require('../app')
const supertest = require("supertest");
const api = supertest(app)

describe('when there is initially one user in db',() => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const newUser = new User({username: 'root', passwordHash})

        await newUser.save()

    })

    test('creation succeeds with a fresh username', async ()  => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'test User',
            username: 'admin',
            password: 'asd123'
        }

        api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)

    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'New Admin',
            username: 'root',
            password: 'qwe123'
        }

        api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

})