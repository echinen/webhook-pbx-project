'use strict'

const faker = require('faker')

const payload = {
    "chamada": {
        "call_id": "1463669263.30033",
        "code": faker.random.uuid,
        "type": "call.standby",
        "direction": "inbound",
        "our_number": faker.phone,
        "their_number": faker.phone,
        "timestamp": new Date()
    },
    "dados": {
        "call_id": "1463669263.30033",
        "type": "call.cpf-provided",
        "cpf": "11111111111",
        "timestamp": new Date()
    },
    "atendente": {},
    "dialer": {}
}

const payloadEventNotFound = {
    "chamada": {
        "call_id": "1463669263.30033",
        "code": faker.random.uuid,
        "type": "event.not.exist",
        "direction": "inbound",
        "our_number": faker.phone,
        "their_number": faker.phone,
        "timestamp": new Date()
    },
    "dados": {
        "call_id": "1463669263.30033",
        "type": "call.cpf-provided",
        "cpf": "11111111111",
        "timestamp": new Date()
    },
    "atendente": {},
    "dialer": {}
}

const payloadNotExist = {
    "atendente": {},
    "dialer": {}
}

module.exports = { payload, payloadEventNotFound, payloadNotExist }