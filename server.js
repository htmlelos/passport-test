const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const config = require('config')
const cookieParser = require('cookie-parser')
const mongoose = require('./services/database/mongoose')
const routes = require('./routes/routes')

// process.env.NODE_ENV = 'dev'

//passport(server)
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

routes(server)

server.listen(config.port, () => {
    console.log(`Servidor ejecutandose en ${config.host}:${config.port}`);
})

module.exports = server
