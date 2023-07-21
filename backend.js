const express = require('express')
const app = express()

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,{pingInterval:2000,pingTimeout:5000});

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const backEndPlayers={
   
};

io.on('connection', (socket) => {
  console.log('a user connected');
  backEndPlayers[socket.id]={
    x:500*Math.random(),
    y:500*Math.random(),
    color:`hsl(${360*Math.random()},100%,50%)`
  }


  io.emit('updatePlayers',backEndPlayers)


  socket.on('disconnect',(reason)=>{
    console.log(reason);
    delete backEndPlayers[socket.id];
    io.emit('updatePlayers',backEndPlayers);
  })
const speed=10;
  socket.on('keydown', ({keycode,sequenceNumber})=>{
    backEndPlayers[socket.id].sequenceNumber=sequenceNumber
    switch(keycode){
      case 'KeyW':
        backEndPlayers[socket.id].y-=speed
        
        break
      case 'KeyA':
        backEndPlayers[socket.id].x-=speed
        
        break
      case 'KeyS':
        backEndPlayers[socket.id].y+=speed
        
        break
      case 'KeyD':
        backEndPlayers[socket.id].x+=speed
        
        break
    }
  })


  console.log(backEndPlayers);
});

setInterval(()=>{
    io.emit('updatePlayers',backEndPlayers)
},10)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log("server has loaded ok");
