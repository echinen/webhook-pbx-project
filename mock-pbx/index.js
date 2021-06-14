const app = require('./config/custom-express')()
const db = require('./db')
const port = process.env.PORT_API || 3001

    db
    .then(() => {
        app.listen(port, () => {
            console.log('Server Teravoz API is running on http://localhost:', port)
        })
    })
    .catch((error) => {
        console.log('Error app: ', error)
    })
