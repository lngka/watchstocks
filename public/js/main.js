"use strict";
/*eslint-disable no-undef*/
$(function() {
    // init the chart //client.highstock.controller.js
    HighstockController.init(document.querySelector("#chart-area").id);

    // init socketio connection //client.socket.controller.js
    const socket = SocketController.getSocket(window.location.origin);

    // server send the current displayed symbols at connect
    socket.on("symbols", function(data) {
        var symbols = data.symbols;

        symbols.forEach(function(symbol) {
            StockDataController.getBySymbol(symbol, function(err, data){
                if (err) {
                    return alert(err.message);
                }
                HighstockController.addToSeries(data);
            });
        });
    });
});
