const discountsRouter = require('express').Router()
const Discount = require('../models/discount')

discountsRouter.get('/', async (request, response) => {
    const item = await Discount.find({})
    response.json(item)
})

discountsRouter.get('/:id', async (request, response) => {
    const item = await Discount.findById(request.params.id)
    if (item) {
        response.json(item)
    } else {
        response.status(404).end()
    }
})

discountsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('POST event request, body:', body)

    const item = new Discount({
        coefficient: body.coefficient,
        name: body.name
    })
    console.log(item)

    const savedDiscount = await item.save()
    response.status(201).json(savedDiscount)
})

discountsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('UPDATE event request, body+id:', body, request.params.id)

    const item = {
        coefficient: body.coefficient,
        name: body.name
    }
    const updatedDiscount = await Location.findByIdAndUpdate(request.params.id, item, {new: true})
    response.json(updatedDiscount)

})

module.exports = discountsRouter