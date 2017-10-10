"use strict";

module.exports = function(io) {
    io.on("connect", function(socket) {
        console.log("Received connection from id: " + socket.id);
        socket.emit("message", {"message": "I heard you, hi", "clientID": socket.id});
    });

};
