const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.get('/', async (request, response) => {
    const e = await Location.find({})
    response.json(e)
})

locationsRouter.get('/:id', async (request, response) => {
    const location = await Location.findById(request.params.id)
    if (location) {
        response.json(location)
    } else {
        response.status(404).end()
    }
})

locationsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const location = new Location({
        description: body.description,
        name: body.name
    })
    console.log(location)

    const savedLocation = await location.save()
    response.status(201).json(savedLocation)
})

locationsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)

    const location = {
        description: body.description,
        name: body.name
    }
    const updatedLocation = await Location.findByIdAndUpdate(request.params.id, location, {new: true})
    response.json(updatedLocation)

})

module.exports = locationsRouter