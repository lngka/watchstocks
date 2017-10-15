"use strict";
/*
* provide function to get stock data from server
*/
/*eslint-disable no-undef*/
var StockDataController = {};

StockDataController.getBySymbol = function(symbol, callback) {
    var url = window.location.origin + "/api/query?symbol=" + encodeURIComponent(symbol);
    // ajaxRequest(method, url, requestObj, callback)
    ajaxRequest("GET", url, {}, function(response) {
        callback(null, response);
    });
};
