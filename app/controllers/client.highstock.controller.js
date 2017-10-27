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
    HighstockController.myColors = ["#2f7ed8", "#0d233a", "#8bbc21", "#910000",
        "#1aadce", "#492970", "#f28f43",
        "#77a1e5", "#c42525", "#a6c96a"];

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
        "colors": HighstockController.myColors,
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
    // sanity checks
    if (!HighstockController.myChart) {
        var err1 = new Error("Couldn't add series if chart not initialized");
        return callback(err1);
    }

    if (!input.symbol || !input.data) {
        var err2 = new Error("Couldn't add series if wrong data input");
        return callback(err2);
    }

    /* figure out which index the being-added series is,
    *  by counting how many series already there
    *  NOTE: Highcharts adds a series named "Navigator" by default
    *  So the count must be reduced by 1 to get what we want
    */
    // btw, the index of each series determines its color
    var whichseries = HighstockController.myChart.series.length;
    var color = HighstockController.myColors[whichseries];

    // build new series
    var series = {
        "id": input.symbol,// https://api.highcharts.com/class-reference/Highcharts.Chart#get
        "name": input.symbol,
        "data": input.data,
        "color": color
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


        // side effect: deleteBtn removed from newLegendItem
        newLegendItem.innerText = symbol;

        // the attribute "name" determines which symbol is being removed
        deleteBtn.name = symbol;

        // side effect: deleteBtn added back to newLegendItem
        HighstockController.initLegendDeleteButton(legends, newLegendItem, deleteBtn);

        HighstockController.styleLegendItem(newLegendItem);

        legends.appendChild(newLegendItem);
    }
};

/*
* find the color Highcharts assigned to this particular stock
* then style the representing legend-item accordingly
* @param {DOM Object} legend : the div represent a legend item
*/
HighstockController.styleLegendItem = function(legend){

    /* figure out which index the being-added series is,
    *  by counting how many series already there
    *  NOTE: Highcharts adds a series named "Navigator" by default
    *  So the count must be reduced by 1 to get what we want
    */
    // btw, the index of each series determines its color
    var whichseries = HighstockController.myChart.series.length;
    var color = HighstockController.myColors[whichseries];
    legend.style["border-left"] = "thick outset " + color;
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

        HighstockController.removeFromSeries(symbol, function(err) {
            if(err) {
                return alert("HighstockController " + err.message);
            } else {
                legends.removeChild(legend);
            }
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
        return callback(false);
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
