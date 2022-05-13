const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    coefficient: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

discountSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Discount', discountSchema)