let User = require('../models/user')

exports.createUser = function(req, res){
	//Creates a new user
	var newUser = new User(req.body)
	//Save it into the DB.
	newUser.save((err, user) => {
		if (err) return res.status(500).send(err)
		res.status(200).json({message: 'User successfully created!', user})
	})
}

exports.getUsers = function(req, res){
	let query = User.find({})
	query.exec((err, users) => {
		if(err) return res.status(500).send(err)
		if(isEmptyObject(users)) return res.status(200).json({message: 'Users not found'})
		//If no errors, send them back to the client
		return res.status(200).json({'users': users})
	})
}

exports.updateUser = function(req, res){
	User.findById({_id: req.body.id}, (err, user) => {
		if(err) res.send(err)
		Object.assign(user, req.body).save((err, user) => {
			if(err) return res.status(500).send(err)
			res.status(200).json({ message: 'User updated!', user })
		})
	})
}

exports.deleteUser = function(req, res){
	var deleteQuery = {_id: req.body.id}
	User.remove(deleteQuery, (err, userToRemove) => {
		if (err) return res.status(500).send('Server error')
		if(userToRemove.result.n == '0') return res.status(404).send('User not found')
		res.status(200).json({ message: 'User deleted', userToRemove })
	})
}

function isEmptyObject(obj) {
	return !Object.keys(obj).length
}
