'use strict'

const Router = require('koa-router')
const HTTPStatus = require('http-status')
const { onSuccess, onError } = require('../handlers/index')
const UserService = require('../services/user-service')
const EventService = require('../services/event-service')

let dashboardRouter = new Router()

dashboardRouter.prefix = 'dashboard'

dashboardRouter.get('/count', function*(next) {
    try {
        const totalActiveUsers = yield UserService.countActiveUser()
        const totalActiveCalls = yield EventService.countActiveCall()
        const totalEvents = yield EventService.countEventCallByTypes()

        const response = {
            userCount: totalActiveUsers,
            activeCallsCount: totalActiveCalls,
            eventCall: {
                new: totalEvents.new,
                standby: totalEvents.standby,
                waiting: totalEvents.waiting,
                entered: totalEvents.entered,
                ongoing: totalEvents.ongoing,
                left: totalEvents.left,
                finished: totalEvents.finished
            }
        }

        onSuccess(response, HTTPStatus.OK, this.request, this.response)
    } catch (e) {
        onError('Houve um erro', e.toString(), HTTPStatus.INTERNAL_SERVER_ERROR, this.request, this.response)
    }
})

/*const validate = () => {
    let errors = []

    if (!that.request.body) {
        errors.push('Parâmetros inválidos')
    }

    switch (that.method) {
        case 'POST':
            that.checkbody('chamada').notEmpty('o campo chamada é obrigatório!')
            break;
    }

    if (that.errors) {
        errors = that.errors.map(x => Object.values(x)[0])
    }

    return errors
}*/

module.exports = dashboardRouter