'use strict'

const mount = require('koa-mount')

module.exports = (server) => {
    
    const clientRouter = require('./client-router')
    server.use(mount(`/api/${clientRouter.prefix}`, clientRouter.routes()))

    const dashboardRouter = require('./dashboard-router')
    server.use(mount(`/api/${dashboardRouter.prefix}`, dashboardRouter.routes()))
}