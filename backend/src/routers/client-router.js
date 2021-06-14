'use strict'

const Router = require('koa-router')
const HTTPStatus = require('http-status')
const { onSuccess, onError } = require('../handlers/index')
const ClientService = require('../services/client-service')

let clientRouter = new Router()

clientRouter.prefix = 'client'

clientRouter.post('/webhook', function* (next) {
    try {
        let errors = validate({ req: this })

        if (errors.length) {
            onError('Parâmetro(s) do webhook inválido', errors, HTTPStatus.BAD_REQUEST, this.request, this.response)
            return
        }

        const payload = this.request.body
        console.log('payload', payload)

        const res = yield ClientService.delegate({ payload })
        
        onSuccess({}, HTTPStatus.NO_CONTENT, this.request, this.response)
    } catch (e) {
        onError('Houve um erro', e.toString(), HTTPStatus.INTERNAL_SERVER_ERROR, this.request, this.response)
    }
})

const validate = ({ req }) => {
    let errors = []

    if (!req.request.body) {
        errors.push('Parâmetros inválidos')
    } else {
        switch (req.method) {
            case 'POST':
                req.checkBody('chamada').notEmpty('o campo chamada é obrigatório!')
                req.checkBody('dados').notEmpty('o campo dados é obrigatório!')
                break;
        }
    }

    if (req.errors) {
        errors = req.errors.map(x => Object.values(x)[0])
    }

    return errors
}

module.exports = clientRouter