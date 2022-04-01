const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const Person = require('./models/person')
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json());

app.use(requestLogger)

app.use(cors());

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (request, response) => {
    Person
        .find({deleted: false})
        .then(result => {
            response.json(result)
        })
});

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
        deleted: body.deleted
    }

    Person
        .findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const newPerson = new Note({
        name: body.name,
        number: body.number,
        deleted: false
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
});


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT1
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

