const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :body'));

const url = `mongodb://ichtus:qwe123@127.0.0.1:27017/ichtusDB?directConnection=true&serverSelectionTimeoutMS=2000`
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})
const Person = mongoose.model('Person', noteSchema)

let persons = []

Person.find({}).then(result => {
    result.forEach(p => {
        console.log(p)
        persons = persons.concat(p)
    })
    //mongoose.connection.close()
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    if (persons.findIndex(p => p.name === body.name) > -1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: Math.max(...persons.map(p => p.id)) + 1,
        name: body.name,
        number: body.number //Math.floor(Math.random() * 1000000)
    }
    persons = persons.concat(newPerson);
    response.json(newPerson);
});

app.get('/api/persons/:id', (request, response) => {
    const p_id = Number(request.params.id)
    const person = persons.find(p => p.id === p_id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
});
app.delete('/api/persons/:id', (request, response) => {
    const p_id = Number(request.params.id)
    persons = persons.filter(p => p.id !== p_id)
    response.status(204).end();
});

app.get('/info', (request, response) => {
    const dt = new Date();
    response.send('<p>Phonebook has info for ' + persons.length + ' people </p><br />' + dt)
});



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

