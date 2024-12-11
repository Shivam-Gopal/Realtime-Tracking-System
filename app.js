const express = require('express');
const app = express();
const path = require('path');
const http = require('http');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

// Handle socket connections
io.on("connection", function(socket){
    console.log('A user connected: ' + socket.id);
    
    // Handle sending location
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data}); // Emit location updates to all clients
    });
    
    // Handle disconnection
    socket.on("disconnect", function(){
        console.log('User disconnected: ' + socket.id);
        io.emit("user-disconnected", socket.id); // Emit a message to all clients when a user disconnects
    });
});

// Serve the index page
app.get('/', function(req, res){
    res.render("index");
});

// Start the server
server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});
