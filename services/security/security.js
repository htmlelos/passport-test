const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const settings = require('../../settings.cfg')

const authenticate = (request, response, user) => {
  if (user) {
    User.comparePasswordAndHash(request.body.password, user.password, (error, isAuthenticated) => {
      // Si la contraseña es correcta y el usuario esta activo
      // Se autentica el usuario
      if (user.status === 'ACTIVO' && isAuthenticated) {
        let token = jwt.sign(user, settings.secret, {expiresIn: "8h"})
        response.status(200).json({
          message: 'Usuario autenticado con exito',
          token
        })
      } else {
        response.status(401).json({
          message: 'No se pudo autenticar verifique sus credenciales',
          token: null
        })
      }
    })
  }
}

module.exports = {
  authenticate
}
