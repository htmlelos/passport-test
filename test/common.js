'use strict';

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Verficar si el servicio se encuentra online', () => {
  it('GET /ping deberia devolver pong', done => {
    chai.request(server)
      .get('/ping')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.a('string').eql('pong')
        done()
      })
  })
})
