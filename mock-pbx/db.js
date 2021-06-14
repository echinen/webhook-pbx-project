const mongoose = require('./config/mongoose')
const mongodb = require('./config/mongodb')()

console.log(mongodb.connection)

module.exports = mongoose.connect(mongodb.connection, mongodb.options, err => {
    if (err) {
        throw err
    }
})