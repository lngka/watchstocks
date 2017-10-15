/*
* define a few functions to work with WebSocket
*/

var SocketController = {};
/*
* connect to a WebSocket server
* @param {string} url : the server address
* @return {Object} socket object generated by socket.io
*/

SocketController.getSocket = function(url) {
    //eslint-disable-next-line  no-undef
    const socket = io(url);// io imported from socket.io library
    return socket;
};