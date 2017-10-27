"use strict";
/*
* define a few functions to work with highstock
*/
var HighstockController = {};

/*
* init the chart and store its preference object in HighstockController
* @param {string} id of the div to draw the chart on, without "#"
*/
HighstockController.init = function(id) {
    // chart is auto-rendered by object declaration
    // eslint-disable-next-line
    var myChart = Highcharts.stockChart({
        "chart": {
            "type": "line", // line or candlestick
            "renderTo": id
        },
        "title": {
            "text": "Stock Prices"
        },
        "subtitle": {
            "text": "Invest only what you can lose"
        },
        "series": []
    });

    HighstockController.myChart = myChart;
};
/*
* add a series to the chart
* @param {object} input : {"symbol": symbol, "data": [{}]}
*      input.data is an array of objects with keys: x, open, high, low, close, y
*      x is a timestamp
* @param {function} callback with;
*   @callback-arg {Error} err if something is wrong
*/
HighstockController.addToSeries = function(input, callback) {
    // sanity check
    if (!HighstockController.myChart) {
        var err = new Error("Couldn't addSeries if chart not initialized");
        return callback(err);
    }

    if (!input.symbol || !input.data) {
        var err2 = new Error("Couldn't add series if wrong data input");
        return callback(err2);
    }

    // build new serie
    var seri = {
        "id": input.symbol,
        "name": input.symbol,
        "data": input.data
    };

    //https://api.highcharts.com/class-reference/Highcharts.Chart.html#addSeries
    HighstockController.myChart.addSeries(seri, true, true);

    return callback(null);
};
/*
* get symbol color from chart and render a legend-item under #legends
* @param {string} symbol of the stock being added
* @param {function} callback with;
*   @callback-arg {Error} err if something is wrong
*/
HighstockController.addLegendItem = function(symbol, callback) {
    // sanity check
    if (!symbol) {
        var err = new Error("Could not add legend-item: Missing symbol");
        return callback(err);
    } else {
        var sample = document.querySelector("#sample-legend-item");
    }
};

/*
* @param {string} id : id of the div to draw the chart on, without "#"
* @param {object} input : {"symbol": symbol, "data": [{}]}
                          input.data is an array of objects with keys: x, open, high, low, close, y
*/
HighstockController.draw = function(id, input) {
    // chart is auto-rendered by object declaration
    // eslint-disable-next-line
    var myChart = Highcharts.stockChart({
        "chart": {
            "type": "line", // line or candlestick
            "renderTo": id
        },
        "title": {
            "text": "Stock Prices"
        },
        "subtitle": {
            "text": "Invest only what you afford to lose"
        },
        "series": [
            {
                //https://api.highcharts.com/class-reference/Highcharts.Chart#get
                "id": input.symbol,
                "name" : input.symbol,
                "data": input.data
            }
        ]
    });
};
