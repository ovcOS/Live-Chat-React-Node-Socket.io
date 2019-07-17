const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Server on the lookout here 👾</h1>');
});

io.on('connection', socket => {
  console.log('Somebody connected 😏');

  socket.on('chat message', msg => {
    console.log(`${msg.from}---> ${msg.msg}`);
    console.log('--------------------------');
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('A user left the chat room');
  });
});

http.listen(8000, () => {
  console.log('Live from port 8000!');
});