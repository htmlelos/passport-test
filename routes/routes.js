const common = require('./common')
const user = require('./user')
const security = require('./security')
// const passport = require('passport')

module.exports = function routes(server) {
  server.use('/', common)
  server.use('/', security)
  server.use('/', user)
}
