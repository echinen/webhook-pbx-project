'use strict'

const Event = require('../models/eventCallModel').EventCall

/*module.exports = (app) => {

    function verifyCallExist(theirNumber) {
        return eventCallModel.filter(call => call.theirNumber === theirNumber).length > 0 || false
    }

    const create = (data) => {
        const callExist = verifyCallExist(data.theirNumber)
        const callId = callExist || helper.generateGuid()

        if (!callExist) {
            data.callId = callId
            data.createdAt = new Date()
            eventCallModel.push(data)
            console.log('add new call in eventCall: ', eventCallModel)
        }

        return callExist
    }
}*/

class EventCallRepository {

    /*async findByTheirNumber(theirNumber) {
        return await Event.find({
            their_number: theirNumber,
            type: { $ne: 'call.finished' }
        })
    }*/

    async findByQuery(query) {
        query.type = { $ne: 'call.finished' }
        return await Event.find(query)
    }

    async create(event) {
        return await Event.create(event)
    }

    async updateType(event, type) {
        return await Event.findByIdAndUpdate(
            {
                _id: event._id
            },
            {
                type: type,
                updatedAt: new Date()
            },
            { new: true }
        )
    }
}

module.exports = new EventCallRepository()


