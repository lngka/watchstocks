"use strict";
/*eslint-disable no-undef*/
$(function() {
    const socket = SocketController.getSocket(window.location.origin);

    socket.on("message", function(data) {
        console.log("Got a message from server: ");
        console.log(data);
    });

    // StockDataController.getBySymbol("MSFT", function(err, data){
    //     console.log(data);
    // });

    // drawing chart
    var canvas = document.querySelector("#chart-area").id;
    //eslint-disable-next-line no-undef
    HighstockController.draw(canvas);
});
