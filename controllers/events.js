const eventsRouter = require('express').Router()
const { eventsList, placesList } = require('../utils/event_helper')

eventsRouter.get('/', (request, response) => {
    return response.json(eventsList)
})

eventsRouter.get('/:id', (request, response) => {
    return response.json(eventsList.find(el => el.id.toString() === request.params.id))
})

eventsRouter.post('/', (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)
})

eventsRouter.delete('/:id', (request, response) => {
    console.log('DELETE event request, id:', request.params.id)
})

eventsRouter.put('/:id', (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)
})

module.exports = eventsRouter