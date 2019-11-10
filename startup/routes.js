const express = require("express")
const urlRoute = require("../routes/url.js")
const cors = require("cors");


// only one instance of app must be running
module.exports = (app) => {

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));
app.use('/', urlRoute)

}

//added structure to this app
