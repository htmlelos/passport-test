'use strict';


const passport = require('passport')
const local = require('./local')
// console.log('local:', local);
const passportConfig = (server) => {
  // console.log('--Configuración del passport--')
  server.use(passport.initialize())
  server.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  local(server)
}

module.exports = passportConfig
