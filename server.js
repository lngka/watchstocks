"use strict";
// voodoo magics
const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

// init app
const app = express();

// init environment variable
require("dotenv").load();

// public folders
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/app/controllers", express.static(path.join(process.cwd(), "/app/controllers")));


// setting up routes
require("./app/routes/index.js")(app);

// init WebSocket
// need to pass the Server to socket.io, and not the express application
const server = require("http").createServer(app);
var io = socketIO(server);
require("./app/config/socket.config.js")(io);


// start via server object, not the app.listen() shortcut
// this allows socketio to attach itself
server.listen(process.env.PORT || 8080, function() {
    console.log("Listening on " + process.env.PORT || 8080);
})
