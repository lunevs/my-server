const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    isRegistrationOpen: {
        type: Boolean,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Event', eventSchema)