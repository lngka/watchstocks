"use strict";
/*eslint-disable no-undef*/
$(function() {
    var url = window.location.origin;
    const socket = SocketController.getSocket(url);

    socket.on("message", function(data) {
        console.log("Got a message from server: ");
        console.log(data);
    });

    StockDataController.getBySymbol("MSFT", function(err, data){
        console.log(data);
    });
    // drawing chart
    var drawingSurface = document.querySelector("#chart-area").id;
    //eslint-disable-next-line no-undef
    HighstockController.init(drawingSurface);
});
