"use strict";
/*eslint-disable no-undef*/
$(function() {
    // init the chart //client.highstock.controller.js
    var myChart = HighstockController.init(document.querySelector("#chart-area").id);
    myChart.showLoading("Getting portfolio...");

    // init socketio connection //client.socket.controller.js
    const socket = SocketController.getSocket(window.location.origin);

    // server sends the current symbols to display at connect
    socket.on("symbols", function(data) {
        var symbols = data.symbols;

        if (!symbols.length) {
            HighstockController.myChart.showLoading("Hint: add some stocks to watch");
        }
        // the counting is needed to display loading message properly
        var symbols_total = symbols.length;
        var processed_symbols_count = 0;
        symbols.forEach(function(symbol) {
            StockDataController.getBySymbol(symbol, function(err, data){
                if (err) {
                    processed_symbols_count++;
                    if (processed_symbols_count == symbols_total) {
                        myChart.hideLoading();
                    }
                    return alert(err.message);
                }
                HighstockController.addToSeries(data, function(err) {
                    if (err){
                        processed_symbols_count++;
                        if (processed_symbols_count == symbols_total) {
                            myChart.hideLoading();
                        }
                        return alert(err.message);
                    }
                    processed_symbols_count++;
                    myChart.hideLoading(); // chart has at least 1 series loaded
                });
            });
        });
    });

    socket.on("added", function(data) {
        var symbol = data;
        if (HighstockController.isAlreadyThere(symbol)) {
            //do nothing
        } else {
            myChart.showLoading("Server updates...");
            StockDataController.getBySymbol(symbol, function(err, data){
                if (err) {
                    myChart.hideLoading();
                    return alert(err.message);
                }
                HighstockController.addToSeries(data, function(err) {
                    if (err){
                        myChart.hideLoading();
                        return alert(err.message);
                    }
                    myChart.hideLoading();
                });
            });
        }
    });
});
