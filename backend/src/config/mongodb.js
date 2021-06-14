const config = require('./development.json')
const port = process.env.MONGO_PORT || 27017
const uri = process.env.MONGO_HOST || `mongodb://${config.databaseConfig.host}:${port}/${config.databaseConfig.database}`

module.exports = mode => {
    return {
        connection: uri
    }
}