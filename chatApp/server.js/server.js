const io = require('socket.io')(8000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

// console.log("helo");
// const http = require('http'),
//       server = http.createServer();

// server.on('request',(request,response)=>{
//    response.writeHead(200,{'Content-Type':'text/plain'});
//    response.write('Hello world');
//    response.end();
// });

// server.listen(8000,()=>{
//   console.log('Node server created at port 3000');
// });