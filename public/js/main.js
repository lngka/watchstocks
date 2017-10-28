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
            myChart.showLoading("Someone adds..." + symbol);
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

    socket.on("removed", function(data) {
        var symbol = data;
        if (!HighstockController.isAlreadyThere(symbol)) {
            //do nothing
        } else {
            myChart.showLoading("Someone removes..." + symbol);
            HighstockController.removeFromSeries(symbol, function(err) {
                if (err) throw err;

                var legends = document.querySelector("#legends");

                // each legend has unique delete-button
                // so we search the legend-item to be removed by its button's name
                var deleteBtn  = legends.querySelector("div.legend-item button[name="+symbol+"]");
                legends.removeChild(deleteBtn.parentElement);

                // show chart again after 0.8 second
                setInterval(function(){ myChart.hideLoading(); }, 800);
            });
        }
    });
});
