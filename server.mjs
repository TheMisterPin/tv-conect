// import { createServer } from 'http'
// import { Server } from 'socket.io'

// const httpServer = createServer()
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// })

// io.on('connection', (socket) => {
//   console.log(socket.id)
// })
// io.on('message', (data) => {
//   console.log(data)
// })

// httpServer.listen(5000, () => {
//   console.log('Server is running on port 5000')
// })

import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('message', (data) => {
      console.log(`sent ${data}`)
      if (data === 'play') {
        io.emit('messageResponse', 'play')
      }
      if (data === 'pause') {
        io.emit('messageResponse', 'pause')
      }
    })

    socket.on('select', (data) => {
      console.log(`sent ${data}`)

      io.emit('selectionResponse', data)
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
