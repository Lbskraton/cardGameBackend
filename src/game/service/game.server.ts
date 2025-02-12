import { Socket } from 'dgram'
import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import {Server} from 'socket.io'


const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});



io.on('connection', socketCliente =>{ // me llega un cliente nuevo
    console.log('Nuevo cliente conectado:',socketCliente.handshake.address)

    socketCliente.on('joinRoom',()=>{})
   
    socketCliente.on('disconnect', ()=>{
        console.log('El cliente se desconectó')
    })

    socketCliente.on('selectCard', msg=>{
        io.emit('texto', msg)
    })


    socketCliente.on('playCard',res=>{io.emit})

    socketCliente
})

server.listen(3000, ()=>{
    console.log('Servidor a la escucha en puerto 3000')
})