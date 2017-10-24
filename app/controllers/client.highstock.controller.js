/*
* define a few functions to work with highstock
*/
var HighstockController = {};

/*
* @param {string} id : id of the div to draw the chart on, without "#"
* @param {object} input : {"symbol": symbol, "data": [{}]}
                          input.data is an array of objects with keys: x, open, high, low, close, y
*/
HighstockController.draw = function(id, input) {
    console.log("HighstockController", input);
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
            "text": "Good luck!"
        },
        "series": [
            {
                "name" : input.symbol,
                "data": input.data
            }
        ]
    });
};
