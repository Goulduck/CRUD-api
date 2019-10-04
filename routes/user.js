let express = require('express')
let router = express.Router()
let User = require('../app/controllers/user')

router.post('/', function (req, res) {
	User.createUser(req, res)
})

router.get('/', function (req, res) {
	User.getUsers(req, res)
})

router.put('/', function (req, res) {
	if (!req.body.id) return res.send(400, 'User Id Required')
	User.updateUser(req, res)
})

router.delete('/', function (req, res) {
	if (!req.body.id) return res.send(400, 'User Id Required')
	User.deleteUser(req, res)
})

module.exports = router
