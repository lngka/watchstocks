"use strict";
const fs       = require("fs");
const readline = require("readline");
const path     = require("path");

module.exports = function(io) {
    io.on("connect", function(socket) {

        getSymbolsFromDB(function(err, symbols) {
            if (err) {
                console.error("socket.config.js", err);
            } else {
                socket.emit("symbols", {"symbols": symbols});
            }
        });

        socket.on("added", function(data) {
            var symbol = data;
            getSymbolsFromDB(function(err, symbols) {
                if (err) {
                    console.error("socket.config.js", err);
                } else {
                    // if symbol is new
                    if (symbols.indexOf(symbol) < 0) {
                        writeToDB(symbol, function(err) {
                            if (err) throw err;
                            // instruct other clients about the new symbol
                            io.sockets.emit("added", data);
                        });
                    }
                }
            });
        });
    });
};

/*
* read database (currently a text file) for current symbols being displayed
* @param {function} callback
+   @callback-arg {Error} err
+   @callback-arg {array} symbols of stocks
*
*/
function getSymbolsFromDB(callback) {
    var file = path.join(process.cwd(), "app", "data", "symbols.txt");
    var symbols = [];

    var lineReader = readline.createInterface({
        "input": fs.createReadStream(file)
    });


    lineReader.on("line", function(line) {
        symbols.push(line);
    });

    lineReader.on("error", function(error) {
        return callback(error, null);
    });

    lineReader.on("close", function() {
        return callback(null, symbols);
    });
}

/*
* write to database, currently append to text file
* @param {string} symbol to be written
* @param {function} callback
*   @callback-arg [Error} err
*/
function writeToDB(symbol, callback) {
    var file = path.join(process.cwd(), "app", "data", "symbols.txt");
    fs.appendFile(file, symbol+"\n", function(err) {
        if (err) return callback(err);
        else return callback(null);
    });
}
