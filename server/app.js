const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback');
// const livereload = require('livereload')
// const connectLiveReload = require('connect-livereload')

// const liveReloadServer = livereload.createServer()
// liveReloadServer.watch(__dirname)

const app = express()

// app.use(connectLiveReload())
app.use(express.json())


var api = express.Router()
api.use(function timeLog(req, res, next) {
    console.log('Time: {Date.now()}')
    next()
})

api.get('/current', (req, res) => {
    res.send('current??')
})

app.use('/api', api)

app.use(history())
app.use('/', express.static(path.join(__dirname, 'app')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/index.html'))
})

app.listen(8888, () => {
    console.log('server on')
})