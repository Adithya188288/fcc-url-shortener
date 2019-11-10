"use strict";

const express = require("express");
const app = express();

//startup files IIFE
require("./startup/db.js")();
require("./startup/routes.js")(app);

// Basic Configuration
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Node.js listening ...");
});
