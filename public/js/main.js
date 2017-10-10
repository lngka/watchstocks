"use strict";

/*eslint-disable no-undef*/
var url = window.location.origin;
const socket = SocketController.getSocket(url);
/*eslint-enable no-undef*/

socket.on("message", function(data) {
    console.log("Got a message from server: ");
    console.log(data);
});
