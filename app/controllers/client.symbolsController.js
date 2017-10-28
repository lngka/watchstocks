"use strict";
/*
* This script defines what happens when the addButton is clicked
*/
/*eslint-disable no-undef*///most objects are defined in other *controller.js
$(document).ready(function() {
    var addButton = document.querySelector("#add-symbol-btn");
    var symbolInput = document.querySelector("#symbol-input");

    addButton.addEventListener("click", function(event) {
        event.preventDefault();

        // sanity check
        var symbol = symbolInput.value;
        if (!symbol) return alert("But you didn't type anything");
        if (symbol.length < 2) {
            return alert("Symbols must be longer as 1 character");
        }

        StockDataController.getBySymbol(symbol, function(err, data){
            if (err) {
                return alert(err.message);
            } else {
                HighstockController.addToSeries(data, function(err) {
                    if (err) {
                        return alert(err.message);
                    }
                });
            }
        });
    });
});
