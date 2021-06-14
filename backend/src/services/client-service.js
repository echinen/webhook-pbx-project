'use strict'

const EventService = require('./event-service')

class TeravozService {

    delegate({ payload }) {
        try {
            console.log('delegate')
            return this.listeningEvents({ payload })
        } catch (e) {
            //console.log('[delegate] -> error:', e)
            throw new Error(e)
        }
    }

    listeningEvents({ payload }) {
        try {
            console.log('listeningEvents [event] ->', payload.chamada.type)
            switch (payload.chamada.type) {
                case 'call.new':
                    return EventService.callToActionNew({ payload })
                    break;
                case 'call.standby':
                    return EventService.callToActionStandby({ payload })
                    break;
                case 'call.waiting':
                    return EventService.callToActionWaiting({ payload })
                    break;
                case 'actor.entered':
                    return EventService.callToActionEntered({ payload })
                    break;
                case 'call.ongoing':
                    return EventService.callToActionOngoing({ payload })
                    break;
                case 'actor.left':
                    return EventService.callToActionLeft({ payload })
                    break;
                case 'call.finished':
                    return EventService.callToActionFinished({ payload })
                    break;
                default:
                    throw new Error('Evento não esperado.')
                    break;
            }
        } catch (e) {
            //console.log('[listeningEvents] -> error:', e)
            throw new Error(e)
        }
    }
}

module.exports = new TeravozService()