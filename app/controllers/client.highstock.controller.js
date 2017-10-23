/*
* define a few functions to work with highstock
*/
var HighstockController = {};

/*
* @param {string} id : id of the div to draw the chart on, without "#"
* @param {array} data : array of objects with keys: x, open, high, low, close
  http://api.highcharts.com/highstock/series.candlestick.data
*/
HighstockController.draw = function(id, data) {
    console.log("HighstockController", data);
    // chart is auto-rendered by object declaration
    // eslint-disable-next-line
    var myChart = Highcharts.stockChart({
        "chart": {
            "type": "candlestick", // line or candlestick
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
                "name" : "MSFT",
                "type": "candlestick",
                "data": data
            }
        ]
    });
};
