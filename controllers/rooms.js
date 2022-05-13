const roomsRouter = require('express').Router()
const Room = require('../models/room')

roomsRouter.get('/', async (request, response) => {
    const item = await Room
        .find({})
        .populate('location', {name: 1, description: 1})
    response.json(item)
})

roomsRouter.get('/:id', async (request, response) => {
    const item = await Room.findById(request.params.id)
    if (item) {
        response.json(item)
    } else {
        response.status(404).end()
    }
})

roomsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const item = new Room({
        roomName: body.roomName,
        availableBed: body.availableBed,
        isMan: body.isMan,
        roomCode: body.roomCode,
        location: body.locationId
    })
    console.log(item)
    const savedRoom = await item.save()
    response.status(201).json(savedRoom)
})

roomsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)

    const item = {
        roomName: body.roomName,
        availableBed: body.availableBed,
        isMan: body.isMan,
        roomCode: body.roomCode,
        location: body.locationId
    }
    const updatedRoom = await Event.findByIdAndUpdate(request.params.id, item, {new: true})
    response.json(updatedRoom)

})

module.exports = roomsRouter