
/*import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const port = 3000;
const app = express();
const server = createServer(app);  // Create HTTP server
/*const io = new Server(server,{
    cors:
});   */  // Initialize socket.io with the server
/*const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST"],
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true
    }
  });
app.use(cors());
// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Socket ID:", socket.id);
  
  // You can add more socket event listeners here
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
 socket.on("chat message",(s)=>{
    console.log(s);
  })
  //socket.emit("welcome",`welcome to the  ${socket.id}`);
  socket.broadcast.emit("welcome",`joined ${socket.id}`)
});

// Express route
app.get("/", (req, res) => {
  res.send("My name is Harsh Jain");
});

// Server listening on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/
// server.js// my code (for one on one implementation)
/*import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  //listening 
      socket.on("register",(userId)=>{
      console.log("this is the target id that wants to connect to the specific users:",userId.userId);
  })
   
  socket.on('chatMessage', (msg) => {
    console.log(msg);
    socket.broadcast.emit('chatMessage', msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/

// Server-side example (Node.js with Socket.IO)
/*import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
//import { CLIENT_RENEG_LIMIT } from 'tls';
const port = 3000;
const app = express();
const server = createServer(app);  // Create HTTP server
const io = new Server(server, {
    cors: {
      origin: "https://chat-application-xi-umber.vercel.app/", // Replace with your frontend URL
      methods: ["GET", "POST"],
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true
    }
  });
app.use(cors());

const users = {};

io.on('connection', (socket) => {
  console.log("the socket id:",socket.id);
  /*socket.on('register', ({ userId }) => {
    users[userId] = socket.id;
    io.emit('users', Object.keys(users).map(id => ({ id, name: `User ${id}` })));
  });*/
  /*socket.on("message",({message,room})=>{
      console.log(`receving the message from the client side ${message}  and the socket id ${room}`);
      socket.broadcast.to(room).emit("recieved-message",message);//dusra end par jaega message //agar io.to().emit() hota toh sender ke paas bhi jataaa
  })
  socket.on("join-room",(room)=>{
    console.log(`room name is :${room}`);
    socket.join(room);//d
  })*/
   
   

  /*socket.on('privateMessage', ({ recipientId, message }) => {
    const recipientSocketId = users[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('chatMessage', `From ${socket.id}: ${message}`);
    }
  });*/

  /*socket.on('disconnect', () => {
    //
  });
});*/
/*const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})*/
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://your-frontend-url.vercel.app", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Add a simple GET route to avoid 'Cannot GET /' error
app.get('/', (req, res) => {
  res.send('Backend is working!');  // Simple response
});

io.on('connection', (socket) => {
  console.log("Connected with id:", socket.id);

  socket.on('message', ({ message, room }) => {
    socket.broadcast.to(room).emit('recieved-message', message);
  });

  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


