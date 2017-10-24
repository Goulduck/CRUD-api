let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let mongoose = require('mongoose')
let routes = require('./routes/user')
let port = 3001
let options = {
                useMongoClient: true,
              }

mongoose.connect('mongodb://goulduck:g0ulduck@ds111124.mlab.com:11124/api-task', options)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port)
console.log("Listening on port " + port);

module.exports = app
