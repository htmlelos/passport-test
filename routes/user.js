'use strict';
const user = require('../controllers/user')
const router = require('express').Router()

// GET /users - obtener todos los Usuarios
router.route('/users')
	.get(user.getUsers)
	// POST /user - crear un nuevo usuarios
router.route('/user')
	.post(user.postUser)
	// GET /user - obtener un usuario por su id
	// PUT /user - actualizar un nuevo usuario
router.route('/user/:userId')
	.get(user.getUser)
	.put(user.updateUser)
	.delete(user.deleteUser)

module.exports = router
