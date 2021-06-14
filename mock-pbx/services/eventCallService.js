'use strict'

const EventCallRepository = require('../repositories/eventCallRepository')
const helper = require('../helper/common')

class EventCallService {

    async handlerWebhookEvent(payload) {
        let response = {
            status: 200,
            data: ''
        }

        let query = {
            call_id: payload.call_id
        }
        const eventCall = await EventCallRepository.findByQuery(query)
        console.log('callExist?', eventCall.length > 0)

        // atualiza somente o evento da chamada.
        console.log('eventCall', eventCall[0])
        const eventUpdated = await EventCallRepository.updateType(eventCall[0], payload.type)
        console.log('eventUpdated: ', eventUpdated)
        return response.data = eventUpdated
    }
    
    async handlerPabxCallEvent(payload) {
        let response = {
            status: 200,
            data: ''
        }

        //const eventCall = await EventCallRepository.findByTheirNumber(payload.their_number)
        let query = {
            their_number: payload.their_number
        }
        const eventCall = await EventCallRepository.findByQuery(query)
        console.log('callExist?', eventCall.length > 0)

        // Faz a validação do ciclo de vida dos eventos das chamadas manuais do usuário.
        const errorValidate = this.validateEventRules(payload.type, eventCall)
        if (errorValidate) {
            console.log('errorValidate?', errorValidate)
            response.status = 400
            response.data = errorValidate
            return response
        } 

        // Cria o evento de uma chamada.
        if (eventCall.length === 0) {
            const eventModel = {
                call_id: helper.generateGuid(),
                their_number: payload.their_number,
                type: payload.type,
                our_number: payload.our_number   
            }
            const eventCreated = await EventCallRepository.create(eventModel)
            console.log('eventCreated: ', eventCreated)
            return response.data = eventCreated
        } else {
            // atualiza somente o evento da chamada.
            console.log('eventCall', eventCall[0])
            const eventUpdated = await EventCallRepository.updateType(eventCall[0], payload.type)
            console.log('eventUpdated: ', eventUpdated)
            return response.data = eventUpdated
        }
    }

    /*async handlerPabxActorEvent(payload) {
        let response = {
            status: 200,
            mensagem: ''
        }

        let query = {
            call_id: payload.call_id
        }
        const eventCall = await EventCallRepository.findByQuery(query)
        console.log('callExist?', eventCall.length > 0)

        // atualiza somente o evento da chamada.
        console.log('eventCall', eventCall[0])
        const eventUpdated = await EventCallRepository.updateType(eventCall[0], payload.type)
        console.log('eventUpdated: ', eventUpdated)
        return response.mensagem = eventUpdated
    }*/

    nextEvent(type) {
        switch (type) {
            case 'call.new':
                return 'call.standby'
                break;
            case 'call.standby':
                return 'call.waiting'
                break;
            case 'call.waiting':
                return 'actor.entered'
                break;
            case 'actor.entered':
                return 'call.ongoing'
                break;
            case 'call.ongoing':
                return 'actor.left'
                break;
            case 'actor.left':
                return 'call.finished'
                break;
            case 'call.finished':
                return 'call.new'
                break;
        }
    }

    validateFirstEvent(type) {
        if (type !== 'call.new') return 'O primeiro evento da chamada deve ser "call.new".'
        else return ''
    }

    validateEventRules(type, eventCall) {
        let mensagem = ''

        // Faz a validação somente do primeiro evento da chamada -> call.new
        if (eventCall.length === 0) {
            mensagem = this.validateFirstEvent(type)
            if (!mensagem) {
                return mensagem
            } else {
                return mensagem
            }
        }

        // Após o primeiro evento criado (call.new) faz a validação de todos os eventos do ciclo de vida das chamadas.
        const nextEvt = this.nextEvent(eventCall[0].type)
        switch (type) {
            case 'call.new':
                if (eventCall[0].type !== 'call.standby') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".` 
                break;
            case 'call.standby':
                if (eventCall[0].type !== 'call.new') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            case 'call.waiting':
                if (eventCall[0].type !== 'call.standby') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            case 'actor.entered':
                if (eventCall[0].type !== 'call.waiting') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            case 'call.ongoing':
                if (eventCall[0].type !== 'actor.entered') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            case 'actor.left':
                if (eventCall[0].type !== 'call.ongoing') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            case 'call.finished':
                if (eventCall[0].type !== 'actor.left') return mensagem = `O evento informado "${type}" não respeita a sequência manual do ciclo de vida das chamadas. Evento atual: "${eventCall[0].type || ''}". O próximo evento deveria ser: "${nextEvt}".`
                break;
            default:
                return ''
                break;
        }
    }
}

module.exports = new EventCallService()