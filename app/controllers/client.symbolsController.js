"use strict";
/*eslint-disable no-undef*///most objects are defined in other *controller.js
$(document).ready(function() {
    var addButton = document.querySelector("#add-symbol-btn");
    var symbolInput = document.querySelector("#symbol-input");
    addButton.addEventListener("click", function(event) {
        event.preventDefault();

        // sanity check
        var symbol = symbolInput.value;
        if (!symbol) return alert("You didn't type anything in");
        if (symbol.length < 3)
            return alert("Symbols must be longer as 2 character");

        //eslint-disable-next-line
        StockDataController.getBySymbol(symbol, function(err, data){
            if (err) {
                return alert(err.message);
            }
            HighstockController.addToSeries(data);
        });
    });
});
