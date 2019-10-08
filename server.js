const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = []


io.on('connection', socket => {
    console.log(`User Conectado ${socket.id}`)

    socket.emit('previousMessage', messages)

    socket.broadcast.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('messageReceived', data)
    })

  
})


server.listen(3000, () => console.log('Server Rodando na porta: 3000.'))