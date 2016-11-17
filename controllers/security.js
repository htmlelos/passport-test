'use strict';
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const security = require('../services/security/security')
const settings = require('../settings.cfg')

const login = (request, response) => {
  User.findOne({username: request.body.username})
    .then(user => {
      if (user) {
        security.authenticate(request, response, user)
      } else {
        response.status(401).json({
          message:'No se pudo autenticar verifique sus credenciales',
          token: null
        })
      }
    })
    .catch(error => {
      response.status(500).json({message: 'Error al intentar autenticarse'})
    })
}

const verifyToken = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token']
  if (token) {
    // decodificar el token
    jwt.verify(token, settings.secret, (error, decoded) => {
      if (error) {
        return response.status(401).json({message: 'Error al intentar autenticarse', token: null})
      } else {
        request.decoded = decoded
        next()
      }
    })
  } else {
    // console.log('==HERE==');
    return response.status(403).send({
      message: 'Por favor revise sus credenciales **',
      success: false
    })
  }
}

module.exports = {
  login,
  verifyToken
}
