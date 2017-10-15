"use strict";
/*
* provide function to get stock data from server
*/
/*eslint-disable no-undef*/
var StockDataController = {};

/*
* function to ask server for data
*/
StockDataController.getBySymbol = function(symbol, callback) {
    var url = window.location.origin + "/api/query?symbol=" + encodeURIComponent(symbol);
    // ajaxRequest(method, url, requestObj, callback)
    ajaxRequest("GET", url, {}, function(response) {
        StockDataController.processData(response, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, data);
        });
    });
};

/*
* function to process data that Highcharts understands
*/
StockDataController.processData = function(rawData, callback) {
    try {
        rawData = JSON.parse(rawData);
    } catch (e) {
        var formatErr = new Error("Wrong data format from server");
        return callback(formatErr, null);
    }
    // console.log("StockDataController.processData", rawData);
    var timeSeries = rawData["Time Series (Daily)"];
    var result = [];

    for (var key in timeSeries) {
        var date = new Date(key);
        var dataPoint = {
            "x": date.getTime(),
            "open": timeSeries[key]["1. open"],
            "high": timeSeries[key]["2. high"],
            "low": timeSeries[key]["3. low"],
            "close": timeSeries[key]["4. close"]
        };
        // add to array in reverse to sort by ascending time
        result.unshift(dataPoint);
    }
    return callback(null, result);
};
