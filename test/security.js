'use strict';
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
// Bloque principal de pruebas de seguridad
describe('Conjunto de pruebas de usuarios', () => {
  beforeEach(done => {
    User.remove({}, error => {
      done()
    })
  })

  describe('POST /login', () => {
    it('deberia loguear un usario con su contraseña', done => {
      let user = new User({
        username: 'admin@mail.com',
        password: 'admin',
        status: 'ACTIVO'
      })

      let credentials = {
        username: 'admin@mail.com',
        password: 'admin'
      }

      user.save()
      .then(user => {})
      .catch(error => {console.log('::TEST::',error)})

      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
            .eql('Usuario autenticado con exito')
          response.body.should.have.property('isAuthenticated')
            .eql(true)
          done()
        })
    })

    it('no deberia loguear si falta el usuario', done => {
      let user = new User({
        username: 'admin@mail.com',
        password: 'admin',
        status: 'ACTIVO'
      })

      let credentials = {
        password: 'admin'
      }

      user.save()
      .then(user => {})
      .catch(error => {console.log('::TEST::',error)})

      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(401)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
            .eql('No se pudo autenticar verifique sus credenciales')
          response.body.should.have.property('isAuthenticated')
            .eql(false)
          done()
        })
    })

    it('no deberia loguear si falta la contraseña', done => {
      let user = new User({
        username: 'admin@mail.com',
        password: 'admin',
        status: 'ACTIVO'
      })

      let credentials = {
        username: 'admin@mail.com'
      }

      user.save()
      .then(user => {})
      .catch(error => {console.log('::TEST::',error)})

      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(401)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
            .eql('No se pudo autenticar verifique sus credenciales')
          response.body.should.have.property('isAuthenticated')
            .eql(false)
          done()
        })
    })

    it('no deberia loguear si la contraseña es incorrecta', done => {
      let user = new User({
        username: 'admin@mail.com',
        password: 'admin',
        status: 'ACTIVO'
      })

      let credentials = {
        username: 'admin@mail.com',
        password: 'guest'
      }

      user.save()
      .then(user => {})
      .catch(error => {console.log('::TEST::',error)})

      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(401)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
            .eql('No se pudo autenticar verifique sus credenciales')
          response.body.should.have.property('isAuthenticated')
            .eql(false)
          done()
        })
    })

    it('no deberia loguear si el usuario es incorrecto', done => {
      let user = new User({
        username: 'admin@mail.com',
        password: 'admin',
        status: 'ACTIVO'
      })

      let credentials = {
        username: 'guest@mail.com',
        password: 'admin'
      }

      user.save()
      .then(user => {})
      .catch(error => {console.log('::TEST::',error)})

      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(401)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
            .eql('No se pudo autenticar verifique sus credenciales')
          response.body.should.have.property('isAuthenticated')
            .eql(false)
          done()
        })
    })

  })
})
