/* eslint-disable no-undef */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let User = require('../app/models/user')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')

chai.use(chaiHttp)
//Our parent block
describe('Users', () => {
  beforeEach((done) => { //Before each test we empty the database
    // eslint-disable-next-line no-unused-vars
    User.remove({}, (err) => {
      done()
    })
  })
  /*
  * Test the /GET route
  */
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('Users not found')
          done()
        })
    })
  })
  describe('/POST user', () => {
    it('it should not POST a user without email field', (done) => {
      let user = {
        forename: 'Chris',
        surname: 'Goulden'
      }
      chai.request(server)
        .post('/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('email')
          res.body.errors.email.should.have.property('kind').eql('required')
          done()
        })
    })
    it('it should not POST a user without forename field', (done) => {
      let user = {
        email: 'goulduck@gmail.com',
        surname: 'Goulden'
      }
      chai.request(server)
        .post('/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('forename')
          res.body.errors.forename.should.have.property('kind').eql('required')
          done()
        })
    })
    it('it should not POST a user without surname field', (done) => {
      let user = {
        email: 'goulduck@gmail.com',
        forename: 'Chris'
      }
      chai.request(server)
        .post('/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('surname')
          res.body.errors.surname.should.have.property('kind').eql('required')
          done()
        })
    })
    it('it should POST a user ', (done) => {
      let user = {
        email: 'goulduck@gmail.com',
        forename: 'Chris',
        surname: 'Goulden'
      }
      chai.request(server)
        .post('/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('User successfully created!')
          res.body.user.should.have.property('email')
          res.body.user.should.have.property('forename')
          res.body.user.should.have.property('surname')
          res.body.user.should.have.property('dateCreated')
          done()
        })
    })
  })
  describe('/PUT user', () => {
    it('it should UPDATE a user given the id', (done) => {
      let user = new User({email: 'goulduck@gmail.com', forename: 'Chris', surname: 'Goulden'})
      user.save((err, user) => {
        chai.request(server)
          .put('/')
          .send({id: user.id, email: 'goulduck@gmail.com', forename: 'Christopher', surname: 'Goulden'})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('User updated!')
            res.body.user.should.have.property('forename').eql('Christopher')
            done()
          })
      })
    })
  })
  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({email: 'goulduck@gmail.com', forename: 'Chris', surname: 'Goulden'})
      user.save((err, user) => {
        chai.request(server)
          .delete('/')
          .send({id: user.id})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('User deleted')
            res.body.userToRemove.should.have.property('ok').eql(1)
            res.body.userToRemove.should.have.property('n').eql(1)
            done()
          })
      })
    })
  })

})
