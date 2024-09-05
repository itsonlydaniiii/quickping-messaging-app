// Import necessary modules
const express = require('express'); // Express framework for routing and serving files
const http = require('http'); // HTTP server to handle requests
const socketio = require('socket.io'); // Socket.io for real-time communication
const path = require('path'); // Path module to work with file paths

// Create express app and HTTP server
const app = express();
const server = http.createServer(app); // Create HTTP server using express app
const io = socketio(server); // Initialize socket.io with the server

// Serve static files (CSS, client-side JS, HTML)
app.use(express.static(path.join(__dirname, 'public'))); // Serve files in 'public' directory

// Handle new user connection via Socket.io
io.on('connection', socket => {
  console.log('New user connected'); // Log when a new user connects

  // Listen for 'chatMessage' event from clients (message being sent)
  socket.on('chatMessage', message => {
    // Emit the message to all clients (broadcast)
    io.emit('chatMessage', message);
  });

  // Listen for 'fileMessage' event (file being uploaded)
  socket.on('fileMessage', fileData => {
    // Emit the file to all clients
    io.emit('fileMessage', fileData);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected'); // Log when a user disconnects
  });
});

// Set port and start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start listening on the port