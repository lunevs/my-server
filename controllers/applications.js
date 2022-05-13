const applicationRouter = require('express').Router()
const Applications = require('../models/application')
const jwt = require("jsonwebtoken");
const User = require("../models/user");

applicationRouter.get('/', async (request, response) => {
    const item = Applications.find({})
    response.json(item)
})

applicationRouter.get('/:id', async (request, response) => {
    const item = await Applications.findById(request.params.id)
    if (item) {
        response.json(item)
    } else {
        response.status(404).end()
    }
})

applicationRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)


    const item = new Applications({
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        user: user._id,
        event: body.eventId,
        room: body.roomId,
        discount: body.discountId
    })
    console.log(item)
    const savedApplication = await item.save()
    response.status(201).json(savedApplication)
})

applicationRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const item = {
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        user: user._id,
        event: body.eventId,
        room: body.roomId,
        discount: body.discountId
    }
    const updatedApplication = await Applications.findByIdAndUpdate(request.params.id, item, {new: true})
    response.json(updatedApplication)

})

module.exports = applicationRouter