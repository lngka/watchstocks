const express = require("express");
const path = require("path");
// init app
const app = express();

// init environment variable
require("dotenv").load();

// public folder
app.use("/public", express.static(path.join(process.cwd(), "public")));

// setting up routes
require("./app/routes/index.js")(app);

// start
app.listen(process.env.PORT || 8080, function() {
    console.log("Listening on " + process.env.PORT || 8080);
})
