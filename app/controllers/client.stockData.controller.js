"use strict";
/*
* provide function to get stock data from server
*/
/*eslint-disable no-undef*/
var StockDataController = {};

/*
* function to ask server for data
* @param {string} symbol of the stock to search
* @param {function} callback function
* @return {object}
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
        var formatErr = new Error("StockDataController: Wrong data format from server");
        return callback(formatErr, null);
    }

    var timeSeries = rawData["Time Series (Daily)"];
    var result = [];

    for (var key in timeSeries) {
        var date = new Date(key);
        var dataPoint = {
            "x": date.getTime(),
            "open" : Number(timeSeries[key]["1. open"]),
            "high" : Number(timeSeries[key]["2. high"]),
            "low"  : Number(timeSeries[key]["3. low"]),
            "close": Number(timeSeries[key]["4. close"]),
        };

        // add an "y" value for dataPoint, used to draw line charts
        dataPoint.y = (dataPoint.open + dataPoint.close) / 2;

        // round to 2 decimal places with 1E2 means 100, 1E3 means 1000
        // change to 1E3 if we need 3 decimal places
        dataPoint.y = Math.round(dataPoint.y * 1E2) / 1E2;

        // add to array in reverse to sort by ascending time
        result.unshift(dataPoint);
    }

    // processed data must be in this format
    var processed = {
        "symbol": rawData["Meta Data"]["2. Symbol"],
        "data": result
    };
    return callback(null, processed);
};
