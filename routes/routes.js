const common = require('./common')
const user = require('./user')

module.exports = function routes(server) {
  server.use('/', common)
  server.use('/', user)
}
