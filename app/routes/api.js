"use strict";
const path = require("path");
const ServerControllers = require(path.join(process.cwd(), "app/controllers", "server.ServerControllers.js"));


module.exports = function(app) {
    app.get("/api/query", function(req, res) {
        var symbol = req.query.symbol;
        console.log(symbol);
        ServerControllers.getStockData(symbol, function(err, data) {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                res.status(200).json(data);
            }
        });
    });
};
