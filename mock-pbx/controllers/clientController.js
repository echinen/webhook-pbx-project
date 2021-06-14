'use strict'

const EventCallService = require('../services/eventCallService')
const WebhookService = require('../services/webhookService')

module.exports = (app) => {
    app.post('/api/client/actions', async (req, res) => {
        try {
            req.assert("type", "type é obrigatório!").notEmpty()
            req.assert("call_id", "call_id é obrigatório!").notEmpty()
            req.assert("destination", "destination é obrigatório!").notEmpty()

            const errors = req.validationErrors()

            if (errors) {
                console.log('Validation error', errors)
                return res.status(400).send(errors)
            }

            const payload = req.body

            console.log('payload', payload)

            const response = await EventCallService.handlerWebhookEvent(payload)

            const webhookResponse = WebhookService.sendEventToClientNotification(response)
            console.log(webhookResponse)

            return res.status(201).send(`delegate success to call destination: ${payload.destination}`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    app.post('/api/client/pabx/call', async (req, res) => {
        try {
            req.assert("their_number", "their_number is required. Ex: 11988880000").notEmpty().isLength({ min: 10 })
            req.assert("our_number", "our_number is required. Ex: 0800111111").notEmpty().isLength({ min: 10 })
            req.assert("type", "type is required. Ex: call.new, call.standby, call.waiting, actor.entered, call.ongoing, actor.left, call.finished").notEmpty().isIn(['call.new', 'call.standby', 'call.waiting', 'actor.entered', 'call.ongoing', 'actor.left','call.finished'])

            const errors = req.validationErrors()

            if (errors) {
                console.log('Validation error', errors)
                return res.status(400).send(errors)
            }

            const payload = req.body
            console.log('payload', payload)

            // Faz o tratamento e manipulação do ciclo de vida dos eventos de uma chamada.
            const response = await EventCallService.handlerPabxCallEvent(payload)

            if (response.status === 400) {
                return res.status(400).send(response.data)
            }

            // Envia o evento da chamada pro webhook do cliente.
            WebhookService.sendEventToClientNotification(response)

            return res.status(200).send(`call event received from pabx: ${payload.type}`)
        } catch (error) {
            console.log('error', error)
            return res.status(500).send(error)
        }
    })
}