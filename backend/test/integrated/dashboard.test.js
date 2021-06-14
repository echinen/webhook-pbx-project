'use strict'

const { app, expect, faker, HTTPStatus, request } = require('./config/helper')

describe('GET /api/dashboard', () => {
    it('Get count data -> 200 (ok)', (done) => {
        request(app)
            .get(`/api/dashboard/count`)
            .end((error, res) => {
                expect(res.statusCode).to.equal(HTTPStatus.OK)
                expect(res.body.data).is.not.empty
                done(error)
            })
    })

    it('Get count data -> error (404)', (done) => {
        request(app)
            .get(`/api/dashboard/count123`)
            .end((error, res) => {
                expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND)
                done(error)
            })
    })

})