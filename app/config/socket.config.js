"use strict";
const fs = require("fs");
const readline = require("readline");
const path = require("path");

module.exports = function(io) {
    io.on("connect", function(socket) {

        // read symbols from a text file and send it to client
        var file = path.join(process.cwd(), "app", "data", "symbols.txt");
        var lineReader = readline.createInterface({
            "input": fs.createReadStream(file)
        });

        var symbols = [];
        lineReader.on("line", function(line) {
            symbols.push(line);
        });

        lineReader.on("close", function() {
            socket.emit("symbols", {"symbols": symbols});
        });

        socket.on("added", function(data) {
            var symbol = data;
            console.log(symbol);
        });
    });
};
