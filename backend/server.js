'use strict'

const dotenv = require('dotenv').config()
const koa = require('koa')
const bodyParser = require('koa-body')
const http = require('http')
const api = require('./src/config/api')
const cors = require('./src/middlewares/cors-middleware')
const corsError = require('koa-cors-error')
const db = require('./db')

let server = module.exports.koa = koa()

server.use(cors)

require('koa-validate')(server)

server.use(bodyParser({
    multipart: true,
    urlencoded: true
}))

server.use(corsError)

require('./src/routers/index')(server)

db
.then(() => {
    let con = http.createServer(server.callback())

    con.listen(api.port, () => {
        console.log('Server listening at http://localhost:' + api.port)
    })
})
.catch(error => console.log(error))