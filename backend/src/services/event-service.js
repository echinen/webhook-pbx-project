'use strict'

const UserService = require('../services/user-service')
const { delegateToCall } = require('../middlewares/integration-middleware')
const EventRepository = require('../repositories/event-call-repository')

class EventService {

    async callToActionNew({ payload }) {
        try {
            console.log('callToActionNew')
            const event = {
                their_number: payload.chamada.their_number,
                type: payload.chamada.type,
                our_number: payload.chamada.our_number,
                call_id: payload.chamada.call_id
            }
            const eventCreated = await EventRepository.create(event)
            console.log('Event created successfully -> call.new')
            return eventCreated
        } catch (e) {
            //console.log('[callToActionNew] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionStandby({ payload }) {
        try {
            console.log('callToActionStandby')

            // Atualiza o type do evento para -> call.standby
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)

            // Verifica se o usúario existe na lista de contatos.
            const existUser = await UserService.userExists({ phone: payload.chamada.their_number })
            console.log('existUser', existUser)
            const queue = existUser ? 901 : 900

            // Caso o usuário não exista na lista é necessário fazer o cadastro no banco.
            if (queue === 900) {
                console.log('entrou create new contact')
                const user = {
                    phone: payload.chamada.their_number
                }
                UserService.createNewUser({ user })
                    .then(res => console.log('User created successfully.'))
                    .catch(error => console.log('Error creating new user.'))
            }

            // Monta o request para a API do delegate -> /actions (POST)
            const request = {
                type: "call.waiting",
                call_id: payload.chamada.call_id,
                destination: queue
            }

            return delegateToCall({ payload: request })
        } catch (e) {
            //console.log('[callToActionStandby] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionWaiting({ payload }) {
        try {
            console.log('callToActionWaiting')

            // Atualiza o type do evento para -> call.waiting
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)
            return eventUpdated
        } catch (e) {
            //console.log('[callToActionWaiting] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionEntered({ payload }) {
        try {
            console.log('callToActionEntered')

            // Atualiza o type do evento para -> actor.entered
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)
            return eventUpdated
        } catch (e) {
            //console.log('[callToActionEntered] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionOngoing({ payload }) {
        try {
            console.log('callToActionOngoing')

            // Atualiza o type do evento para -> call.ongoing
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)
            return eventUpdated
        } catch (e) {
            //console.log('[callToActionOngoing] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionLeft({ payload }) {
        try {
            console.log('callToActionLeft')

            // Atualiza o type do evento para -> actor.left
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)
            return eventUpdated
        } catch (e) {
            //console.log('[callToActionLeft] -> error:', e)
            throw new Error(e)
        }
    }

    async callToActionFinished({ payload }) {
        try {
            console.log('callToActionFinished')

            // Atualiza o type do evento para -> call.finished
            const event = {
                call_id: payload.chamada.call_id,
                type: payload.chamada.type
            }
            const eventUpdated = await EventRepository.updateType(event)
            return eventUpdated
        } catch (e) {
            //console.log('[callToActionFinished] -> error:', e)
            throw new Error(e)
        }
    }

    async countActiveCall() {
        const totalCalls = await EventRepository.getCountActiveCall()
        return totalCalls
    }

    async countEventCallByTypes() {
        const totalEventNew = await EventRepository.getCountEventCallByType('call.new')
        const totalEventStandby = await EventRepository.getCountEventCallByType('call.standby')
        const totalEventWaiting = await EventRepository.getCountEventCallByType('call.waiting')
        const totalEventEntered = await EventRepository.getCountEventCallByType('actor.entered')
        const totalEventOngoing = await EventRepository.getCountEventCallByType('call.ongoing')
        const totalEventLeft = await EventRepository.getCountEventCallByType('actor.left')
        const totalEventFinished = await EventRepository.getCountEventCallByType('call.finished')

        const event = {
            new: totalEventNew,
            standby: totalEventStandby,
            waiting: totalEventWaiting,
            entered: totalEventEntered,
            ongoing: totalEventOngoing,
            left: totalEventLeft,
            finished: totalEventFinished
        }

        return event
    }
}
module.exports = new EventService()