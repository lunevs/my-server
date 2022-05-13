const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const notesRouter = require('./controllers/notes')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const eventsRouter = require('./controllers/events')
const roomsRouter = require('./controllers/rooms')
const applicationsRouter = require('./controllers/applications')
const locationsRouter = require('./controllers/locations')
const discountsRouter = require('./controllers/discounts')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/events', eventsRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/discounts', discountsRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/test.router')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
