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

    // build new series
    var series = {
        "id": input.symbol,
        "name": input.symbol,
        "data": input.data
    };

    //https://api.highcharts.com/class-reference/Highcharts.Chart.html#addSeries
    HighstockController.myChart.addSeries(series, true, true);

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
        var legends       = document.querySelector("#legends");
        var sample        = document.querySelector("#sample-legend-item");
        var newLegendItem = sample.cloneNode(true);
        var deleteBtn     = newLegendItem.querySelector(".delete-btn");

        // this WILL delete the deleteBtn from newLegendItem
        newLegendItem.innerText = symbol;

        // the attribute "name" determines which symbol is being removed
        deleteBtn.name = symbol;

        // this WILL append the deleteBtn to newLegendItem after its innerText
        HighstockController.initLegendDeleteButton(legends, newLegendItem, deleteBtn);

        legends.appendChild(newLegendItem);
    }
};

/*
* all .legend-item have a predefined delete-btn, here we bring
* the button to life
* @param {DOM Object} legends : the div contains all legend items
* @param {DOM Object} legend : the div represent a legend item
* @param {DOM Object} button: the button which should remove the legend on click
*/
HighstockController.initLegendDeleteButton = function(legends, legend, button) {
    var symbol = button.name;
    button.addEventListener("click", function(event) {
        event.preventDefault();
        console.log(button.name);
        legends.removeChild(legend);
        HighstockController.removeFromSeries(symbol, function(err) {
            return alert("HighstockController " + err.message);
        });
    });

    // because button was removed to add textual content to legend
    // see HighstockController.addLegendItem
    legend.appendChild(button);
};

/*
* remove a series from the chart
* @param {string} id of the series to be removed
*   id is set in HighstockController.addToSeries
*   id is the stock symbol
* @param {function} callback
*   @callback-arg {Error} err if something wrong happens
*/
HighstockController.removeFromSeries = function(id, callback) {
    // sanity check
    if (!id) {
        var err1 = new Error("Could not remove series: Missing series' ID");
        return callback(err1);
    }

    var series = HighstockController.myChart.get(id);
    if (!series) {
        var err2 = new Error("Could not remove series: Not found by given ID");
        return callback(err2);
    } else {
        series.remove();
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
