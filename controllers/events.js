const eventsRouter = require('express').Router()
const Event = require('../models/event')

eventsRouter.get('/', async (request, response) => {
    const e = await Event
        .find({})
        .populate('location', {name: 1, description: 1})
    response.json(e)
})

eventsRouter.get('/:id', async (request, response) => {
    const e = await Event
        .findById(request.params.id)
        .populate('location', {name: 1, description: 1})
    if (e) {
        response.json(e)
    } else {
        response.status(404).end()
    }
})

eventsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const e = new Event({
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isRegistrationOpen: body.isRegistrationOpen,
        basePrice: body.basePrice,
        title: body.title,
        location: body.locationId
    })
    console.log(e)
    const savedEvent = await e.save()
    response.status(201).json(savedEvent)
})

eventsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)

    const e = {
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isRegistrationOpen: body.isRegistrationOpen,
        basePrice: body.basePrice,
        title: body.title,
        location: body.locationId
    }
    const updatedEvent = await Event.findByIdAndUpdate(request.params.id, e, {new: true})
    response.json(updatedEvent)

})

module.exports = eventsRouter