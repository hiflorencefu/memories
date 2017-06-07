var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var xml2js = require('xml2js')
var parseString = require('xml2js').parseString
var MemoryStore = require('./MemoryStore')
var fs = require('fs')

var app = express()
var upload = multer()
var builder = new xml2js.Builder()
var parser = new xml2js.Parser({explicitArray: false})

var ms = new MemoryStore()
var orig = new MemoryStore()

var memories

openXml('/memories.xml', ms, function() {
    openXml('/memories.xml.orig', orig, serve)
})

function serve() {
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.get('/', function(req, res) {
        res.send('/index.html')
    })

    app.get('/memories', function(req, res) {
        var memories = ms.latest()
        res.send(memories.slice().reverse())

        var xml = builder.buildObject({
            memories: ms.get()
        })
        fs.writeFile(__dirname + '/memories.xml', xml, (err) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('Saved memories to memories.xml')
            }
        })
    })

    app.post('/memory', upload.array(), function(req, res) {
        ms.add({memory: req.body})
        var xml = builder.buildObject({
            memories: ms.get()
        })
        fs.writeFile(__dirname + '/memories.xml', xml, (err) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('Saved new memory to memories.xml')
            }
        })
        res.send({status: "OK"})

        orig.add({memory: req.body})
        xml = builder.buildObject({
            memories: orig.get()
        })
        fs.writeFile(__dirname + '/memories.xml.orig', xml, (err) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('Saved new memory to memories.xml.orig')
            }
        })
    })

    var PORT = process.env.PORT || 3000
    app.listen(PORT, function() {
        console.log("Listening on port " + PORT)
    })
}

function openXml(file, ms, cb) {
    var xml = parser.parseString(fs.readFileSync(__dirname + file), (err, data) => {
        if (err) {
            cb()
        } else {
            try {
                if (data.hasOwnProperty('memories') && data.memories.hasOwnProperty('memory')) {
                    if (Array.isArray(data.memories.memory)) {
                        for (var m of data.memories.memory) {
                            ms.add({memory: m})
                        }
                    } else {
                        ms.add({memory: data.memories.memory})
                    }
                }

                cb()
            } catch(e) {
                console.log('Error reading from disk: ', e)
            }
        }
    })
}
