const express = require('express'); // include this just as a php include
const app = express();
const io = require('socket.io')(); //activate the chat plugin

//serve up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

// app.get('/contact', (req, res)=> {
//   res.sendFile(__dirname + '/contact.html');
// });
//
// app.get('/portfolio', (req, res)=> {
//   res.sendFile(__dirname + '/portfolio.html');
// });

const server = app.listen(3000, () =>{
  console.log('Listening on port 3000');

});

io.attach(server);

//connect
io.on('connection', socket => { //function(socket) {...}
  console.log('a user has connected');
  io.emit('chat message', { for : 'everyone', message : `${socket.id} is now online!`});

socket.on('chat message', msg => {
  io.emit('chat message',  {for : 'everyone', message : msg});
});

//disconnect
  socket.on('disconnect', () => {
    console.log('a user has disconnected');

  io.emit('disconnect message', `${socket.id} has left the chat!`);

  });
});
