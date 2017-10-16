"use strict";
/*eslint-disable no-undef*/
$(function() {
    const socket = SocketController.getSocket(window.location.origin);

    socket.on("symbols", function(data) {
        var symbols = data.symbols;
        console.log(data.symbols);
        StockDataController.getBySymbol(symbols[0], function(err, data){
            if (err) {
                return alert(err.message);
            }
            // drawing chart
            var canvas = document.querySelector("#chart-area").id;
            //eslint-disable-next-line no-undef
            HighstockController.draw(canvas, data);
        });

    });
});
