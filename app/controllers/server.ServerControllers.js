"use strict";
const path = require("path");
const getStockData = require(path.join(process.cwd(), "app/controllers", "server.getStockData.js"));
/*
* A collection of all server controllers in an object
* Imported in: api.js
*/

var ServerControllers = {
    "getStockData": getStockData
};

module.exports = ServerControllers;
