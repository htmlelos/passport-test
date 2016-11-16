'use strict';

const User = require('../models/user')
const security = require('../services/security/security')

function login(request, response) {
  User.findOne({username: request.body.username})
    .then(user => {
      if (user) {
        security.authenticate(request, response, user)
      } else {
        response.status(401).json({
          message:'No se pudo autenticar verifique sus credenciales',
          isAuthenticated: false
        })
      }
    })
    .catch(error => {
      response.status(500).json({message: 'Error al intentar autenticarse'})
    })
}

module.exports = {
  login
}
