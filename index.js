var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var xml2js = require('xml2js')
var MemoryStore = require('./MemoryStore')

var app = express()
var upload = multer()
var builder = new xml2js.Builder()

var ms = new MemoryStore()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.send('/index.html')
})

app.post('/memory', upload.array(), function(req, res) {
    var memory = req.body
    ms.add(memory)
    var xml = builder.buildObject({memory: memory})
    res.send("got a post request")
})

app.listen(3000)
