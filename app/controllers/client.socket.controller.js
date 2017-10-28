/*
* contains functions to work with WebSocket
*/

var SocketController = {};
SocketController.previousSockets = {};
/*
* connect to a WebSocket server
* @param {string} url : the server address
* @return {Object} socket object generated by socket.io,
*                  previous connections are stored in previousSockets
*                  repeated call on the same url should be answered with
*                  the same socket, not a new connection
*/

SocketController.getSocket = function(url) {
    if (SocketController.previousSockets[url]) {
        return SocketController.previousSockets[url];
    } else {
        //eslint-disable-next-line  no-undef
        var newSocket = io(url);// io imported from socket.io library
        SocketController.previousSockets[url] = newSocket;
        return newSocket;
    }
};
