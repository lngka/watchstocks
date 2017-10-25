"use strict";
/*
* define a few functions to work with highstock
*/
var HighstockController = {};

/*
* init the chart and store its preference object in HighstockController
* @param {string} id : id of the div to draw the chart on, without "#"
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
*/
HighstockController.addToSeries = function(input) {
    // sanity check
    if (!HighstockController.myChart) {
        return alert("Couldn't addSeries if chart not initialized");
    }

    if (!input.symbol || !input.data) {
        return alert("Couldn't addSeries if wrong data input");
    }

    // build new serie
    var seri = {
        "id": input.symbol,
        "name": input.symbol,
        "data": input.data
    };

    //https://api.highcharts.com/class-reference/Highcharts.Chart.html#addSeries
    HighstockController.myChart.addSeries(seri, true, true);
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
