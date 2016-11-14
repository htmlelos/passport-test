"use strict";
// Establecemos la variable de ambiente NODE_ENV a test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../models/user')
// const Role = require('../models/role')
	// Dependencias de desarrollo
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)
	// Bloque principal de las pruebas de usuarios
describe('Conjunto de pruebas de usuarios', () => {
	beforeEach(done => {
		User.remove({}, error => {
			done()
		})
	})

	// GET /users - Obtener todos los usuarios
	describe('GET /users', () => {
		it('should get all the users', done => {
			chai.request(server)
				.get('/users')
				.end((error, response) => {
					response.should.have.status(200)
					response.body.should.be.a('array')
					response.body.length.should.be.eql(0)
					done()
				})
		})
	})

	// POST /user - Crea un usuario
	describe('POST /user', () => {
			it('should create a new user', done => {
					let user = {
						username: 'admin@mail.com',
						password: 'admin',
						status: 'ACTIVO'
					}

					chai.request(server)
						.post('/user')
						.send(user)
						.end((error, response) => {
							response.should.have.status(200)
							response.body.should.be.a('object')
							response.body.should.have.property('message').eql('Usuario creado con exito')
							done()
						})
				})
				// No deberia crear un usuario sin nombre de usuario
			it('should not create a new user without username', done => {
					let user = {
						password: 'admin',
						status: 'ACTIVO'
					}

					chai.request(server)
						.post('/user')
						.send(user)
						.end((error, response) => {
							response.should.have.status(422)
							response.body.should.be.a('object')
							response.body.should.have.property('message')
								.eql('Debe proporcionar un nombre de usuario')
							done()
						})
				})
				// No deberia crear un usuario sin la contraseña
			it('should not create a new user without password', done => {
					let user = {
						username: 'admin@mail.com',
						status: 'ACTIVO'
					}

					chai.request(server)
						.post('/user')
						.send(user)
						.end((error, response) => {
							response.should.have.status(422)
							response.body.should.be.a('object')
							response.body.should.have.property('message')
								.eql('Debe proporcionar una contraseña')
							done()
						})
				})
				// No deberia crear un usuario sin estado
			it('should not create a new user without status', done => {
					let user = {
						username: 'admin@mail.com',
						password: 'admin'
					}

					chai.request(server)
						.post('/user')
						.send(user)
						.end((error, response) => {
							response.should.have.status(422)
							response.body.should.be.a('object')
							response.body.should.have.property('message')
								.eql('Debe definir el estado del usuario')
							done()
						})
				})
				// El valor del estado deberia ser ACTIVO o INACTIVO
			it('user status should be ACTIVO or INACTIVO', done => {
				let user = {
					username: 'admin@mail.com',
					password: 'admin',
					status: 'HABILITADO'
				}

				chai.request(server)
					.post('/user')
					.send(user)
					.end((error, response) => {
						response.should.have.status(422)
						response.body.should.be.a('object')
						response.body.should.have.property('message')
							.eql('El estado de usuario solo puede ser ACTIVO o INACTIVO')
						done()
					})
			})

			it('should not create a user with duplicate username', done => {
				let user = {
					username: 'admin@mail.com',
					password: 'admin',
					status: 'ACTIVO'
				}

				let newUser = new User(user)
				newUser.save()

				chai.request(server)
					.post('/user')
					.send(user)
					.end((error, response) => {
						response.should.have.status(422)
						response.body.should.be.a('object')
						response.body.should.have.property('message')
							.eql('El nombre de usuario ya existe')
						done()
					})
			})
		})

		// GET /user/:userId
	describe('GET /user/:userId', () => {
		it('should get a user by its userId', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'ACTIVO'
			})

			user.save()

			chai.request(server)
				.get('/user/' + user._id)
				.end((error, response) => {
					response.should.have.status(200)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('Usuario obtenido con exito')
					response.body.should.have.property('user')
					response.body.user.should.have.property('username')
						.eql('admin@mail.com')
					response.body.user.should.have.property('password')
						.eql('admin')
					response.body.user.should.have.property('status')
						.eql('ACTIVO')
					done()
				})
		})

		it('should not get a user with a invalid userId', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'ACTIVO'
			})

			user.save()

			chai.request(server)
				.get('/user/58dece08eb0548118ce31f11')
				.end((error, response) => {
					// console.log('RESPOSE: ', response.body)
					response.should.have.status(404)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('No se encontro el usuario')
					response.body.should.have.property('user').to.be.null
					done()
				})
		})
	})

	describe('PUT /user/:userId', () => {
		it('should update a user by its userId', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'INACTIVO'
			})

			user.save()

			chai.request(server)
				.put('/user/' + user._id)
				.send({
					username: 'guest@mail.com',
					password: 'guest',
					status: 'ACTIVO'
				})
				.end((error, response) => {
          // console.log('STATUS: ', response.status);
          // console.log('RESPONSE: ', response.body);
					response.should.have.status(200)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('Usuario actualizado con exito')
					response.body.should.have.property('user')
					response.body.user.should.have.property('username')
						.eql('guest@mail.com')
					response.body.user.should.have.property('password')
						.eql('guest')
					response.body.user.should.have.property('status')
						.eql('ACTIVO')
					done()
				})
		})

		it('should not update a user with a invalid userId', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'INACTIVO'
			})

			user.save()

			chai.request(server)
				.put('/user/58dece08eb0548118ce31f11')
				.send({
					username: 'guest@mail.com',
					password: 'guest',
					status: 'ACTIVO'
				})
				.end((error, response) => {
					response.should.have.status(404)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('El usuario, no es un usuario valido')
					done()
				})
		})

		it('should not update a user to a duplicate username', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'INACTIVO'
			})

			user.save()

			user = new User({
				username: 'developer@mail.com',
				password: 'developer',
				status: 'ACTIVO'
			})

			user.save()

			chai.request(server)
				.put('/user/' + user._id)
				.send({
					username: 'admin@mail.com',
					password: 'guest',
					status: 'ACTIVO'
				})
				.end((error, response) => {
					response.should.have.status(422)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('El usuario ya existe')
					done()
				})
		})
	})

	describe('DELETE /user/:userId', () => {
		it('should delete a user by its id', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'ACTIVO'
			})

			user.save()

			chai.request(server)
				.delete('/user/' + user._id)
				.end((error, response) => {
					response.should.have.status(200)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('Usuario eliminado con exito')
					done()
				})
		})

		it('shoud not delete a user with a invalid userId', done => {
			let user = new User({
				username: 'admin@mail.com',
				password: 'admin',
				status: 'ACTIVO'
			})

			user.save()

			chai.request(server)
				.delete('/user/58dece08eb0548118ce31f11')
				.end((error, response) => {
					response.should.have.status(404)
					response.body.should.be.a('object')
					response.body.should.have.property('message')
						.eql('El usuario, no es un usuario valido')
					done()
				})
		})
	})
})
