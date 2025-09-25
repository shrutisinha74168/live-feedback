const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { router: feedbackRoutes, setSocket } = require('./routes/feedbackRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, { cors: { origin: "*" } });
setSocket(io);  // set io for live emit

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected', socket.id));
});

// Use routes
app.use('/api/feedback', feedbackRoutes); 

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
