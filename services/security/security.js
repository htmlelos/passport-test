const User = require('../../models/user')

const authenticate = (request, response, user) => {
  if (user) {
    User.comparePasswordAndHash(request.body.password, user.password, (error, isAuthenticated) => {
      // Si la contraseña es correcta y el usuario esta activo
      // Se autentica el usuario
      if (user.status === 'ACTIVO' && isAuthenticated) {
        response.status(200).json({
          message: 'Usuario autenticado con exito',
          isAuthenticated
        })
      } else {
        response.status(401).json({
          message: 'No se pudo autenticar verifique sus credenciales',
          isAuthenticated: false
        })
      }
    })
  }
}

module.exports = {
  authenticate
}
