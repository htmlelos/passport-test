'use strict';
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../../models/user')

const localConfig = function(server) {
  passport.use(new localStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      console.log(username);
      console.log(password);
      User.findOne({
          username: username
        })
        .then(function(user) {
          if (!user) return done(null, false)
          //TODO: Encriptar password
          if (user.password === password) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
    }
  ))

  server.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/',
  }))
}

modul.export = localConfig;
