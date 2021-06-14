'use strict'

const Event = require('../models/eventCallModel').EventCall

class EventCallRepository {

    async findByQuery(query) {
        query.type = { $ne: 'call.finished' }
        return await Event.find(query)
    }

    async create(event) {
        return await Event.create(event)
    }

    async updateType(event, type) {
        return await Event.findOneAndUpdate(
            {
                call_id: event.call_id
            },
            {
                type: event.type,
                updatedAt: new Date()
            },
            { new: true }
        )
    }

    async getCountActiveCall() {
        return await Event.find({ type: { $ne: 'call.finished' } }).count()
    }

    async getCountEventCallByType(type) {
        return await Event.find({ type: { $eq: type } }).count()
    }
}

module.exports = new EventCallRepository()