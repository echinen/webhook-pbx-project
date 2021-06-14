'use strict'

const { app, expect, faker, HTTPStatus, request } = require('./config/helper')
const { payload, payloadEventNotFound, payloadNotExist } = require('../factory/client-factory')

describe('POST /api/client', () => {
    it('Post webhook api -> 200 (ok)', (done) => {
        request(app)
            .post(`/api/client/webhook`)
            .send(payload)
            .end((error, res) => {
                expect(res.statusCode).to.equal(HTTPStatus.NO_CONTENT)
                done(error)
            })
    })

    it('Post webhook api -> event not exist -> error (500)', (done) => {
        request(app)
            .post(`/api/client/webhook`)
            .send(payloadEventNotFound)
            .end((error, res) => {
                expect(res.statusCode).to.equal(HTTPStatus.INTERNAL_SERVER_ERROR)
                done(error)
            })
    })

    it('Post webhook api -> params not exist -> error (400)', (done) => {
        request(app)
            .post(`/api/client/webhook`)
            .send(payloadNotExist)
            .end((error, res) => {
                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST)
                done(error)
            })
    })
})