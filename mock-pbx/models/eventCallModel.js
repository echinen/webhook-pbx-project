'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventCallSchema = new Schema({
    their_number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['call.new', 'call.standby', 'call.waiting', 'actor.entered', 'call.ongoing', 'actor.left', 'call.finished']
    },
    our_number: {
        type: String,
        required: true
    },
    call_id: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

module.exports.EventCallSchema = EventCallSchema
module.exports.EventCall = mongoose.model('EventCall', EventCallSchema)