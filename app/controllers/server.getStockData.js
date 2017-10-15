"use strict";
const https = require("https");

/*
* function to get stock data by symbol from alphavantage.com
* @param {string} symbol , aka ticker symbol of a stock
*/

module.exports = function getStockData(symbol, callback) {
    var options = {
        "method": "GET",
        "host": "www.alphavantage.co",// https://www.alphavantage.co/documentation/#daily
        "path": "/query?"
            + "function=" + "TIME_SERIES_DAILY"
            + "&outputsize=" + "compact"
            + "&symbol="   + encodeURIComponent(symbol)
            + "&apikey="   + process.env.ALPHA_VANTAGE_KEY
    };

    var request = https.request(options, function(response) {
        // collect data
        var data = "";
        response.setEncoding("utf8");
        response.on("data", function (chunk) {
            data += chunk;
        });

        // return data
        response.on("end", function() {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return callback(e, null);
            }

            return callback(null, data);
        });

        // handle error
        response.on("error", function(error) {
            return callback(error, null);
        });
    });

    // handle error
    request.on("error", function(error) {
        return callback(error, null);
    });

    request.end();
};
