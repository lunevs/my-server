const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    availableBed: {
        type: Number,
        required: true,
    },
    isMan: Boolean,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
})

roomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Room', roomSchema)