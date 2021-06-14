'use strict'

module.exports = (data, status, req, res) => {
    res.status = status
    res.body = {
        data: data
    }
}