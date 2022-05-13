const eventsRouter = require('express').Router()
const Event = require('../models/event')

eventsRouter.get('/', (request, response) => {
    Event.find({}).then(e => {
        response.json(e)
    })
})

eventsRouter.get('/:id', (request, response) => {
    Event.findById(request.params.id)
        .then(e => {
            if (e) {
                response.json(e)
            } else {
                response.status(404).end()
            }
        })
})

eventsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const e = new Event({
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isRegistrationOpen: true,
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