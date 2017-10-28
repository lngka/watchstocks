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
* @param {string} rawData should be a JSON string returned from a GET to server
* @param {function} callback
*/
StockDataController.processData = function(rawData, callback) {
    // check data input
    try {
        rawData = JSON.parse(rawData);
    } catch (e) {
        var err1 = new Error("Wrong data format from server");
        return callback(err1, null);
    }

    // check data input deeper
    var timeSeries = rawData["Time Series (Daily)"];
    if (!timeSeries) {
        if (rawData["Error Message"]) {
            var err2 = new Error("Error from API, possibly invalid stock name");
            return callback(err2, null);
        } else {
            var err3 = new Error("processData error");
            return callback(err3, null);
        }
    }

    // input checks passed
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

    if (!result.length) {
        var err5 = new Error("No data found for symbol");
        return callback(err5, null);
    }

    try {
        var processed = {
            "symbol": rawData["Meta Data"]["2. Symbol"],
            "data": result
        };
    } catch (e) {
        return callback(e, null);
    }

    // all checks passed
    return callback(null, processed);
};
