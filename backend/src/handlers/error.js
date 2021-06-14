'use strict'

const HTTPStatus = require('http-status')

module.exports = (message, errors, status, req, res) => {
    res.status = status
    res.body = {
        message: message,
        errors: errors
    }
}