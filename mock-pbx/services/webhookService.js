'use strict'

const restify = require('restify')
const clients = require('restify-clients')
const config = require('../config/development.json')

class WebhookService {

    sendEventToClientNotification(event) {
        try {
            const webhookClientUrlBase = `http://${config.apiClientConfig.name}:3000`
            const timestamp = new Date()
            const cliente = clients.createJsonClient({
                url: webhookClientUrlBase,
                version: '~1.0'
            })
            const request = {
                chamada: {
                    call_id: event.call_id,
                    code: '',
                    type: event.type,
                    direction: 'inbound',
                    our_number: event.our_number,
                    their_number: event.their_number,
                    timestamp: timestamp
                },
                dados: {
                    call_id: event.call_id,
                    type: 'call.cpf-provided',
                    cpf: '',
                    timestamp: timestamp
                },
                atendente: {},
                dialer: {}
            }

            cliente.post('/api/client/webhook',
                request,
                (error, req, res) => {
                    if (error) {
                        console.log('Error webhook (client).', error)
                        throw new Error(error)
                    } else {
                        if (res.statusCode === 201) {
                            console.log('Event successfully response from webhook (client).')
                            return true
                        }
                    }
                })
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = new WebhookService()