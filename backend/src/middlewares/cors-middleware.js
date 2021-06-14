const cors = require('koa-cors');

cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  headers: ['Content-Type', 'Authorization', 'Accept-Ranges', 'X-Minimum-Required-Version', 'X-App-Version'],
  expose: ['X-Minimum-Required-Version'],
  credentials: true
})

module.exports = cors()
