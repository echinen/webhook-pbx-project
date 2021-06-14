'use strict'

const restify = require('restify')
const clients = require('restify-clients')
const config = require('../config/development.json')

exports.delegateToCall = ({ payload }) => {
    try {
        console.log('delegateToCall')
        const cliente = clients.createJsonClient({
            url: process.env.URI_PBX || `http://${config.apiPbxConfig.name}:${process.env.PORT_PBX || 3001}`,
            version: '~1.0'
        })

        cliente.post('/api/client/actions',
            payload,
            (error, req, res) => {
                if (error) {
                    throw new Error(error.message)
                } else {
                    if (res.statusCode === 201) {
                        console.log('delegate successfully sent.')
                        return true
                    }
                }
            })
    } catch (e) {
        //console.log('[delegateToCall] -> error:', e)
        throw new Error(e)
    }
}