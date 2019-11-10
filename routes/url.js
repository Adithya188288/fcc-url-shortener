const express = require("express")
const router  = express.Router()
const dns = require("dns");
const url_core = require("url");
//Urls Model
const { urlModel } = require("../models/url.js");



router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});


router.post("/api/shorturl/new", (req, res) => {
  const { url } = req.body;

  //Parse the usl sent by the user
  const usersUrl = url_core.parse(url);
  // console.log(usersUrl);

  // if the url dosent have a protocol and hostname - send a bad request to the client
  if (usersUrl.protocol === null || usersUrl.hostname.length === 0) {
    return res.status(400).send({ error: "invalid URL" });
  }

  // Validate if the url sent by the client has proper records
  dns.lookup(usersUrl.hostname, (err, data) => {
    if (err) return res.status(400).send({ error: "invalid URL" });
  });

  urlModel.findOne({ original_url: url }, async (err, data) => {
    if (data) return res.send({original_url:data.original_url,short_url:data.short_url});
    else {
      let mUrl = new urlModel({ original_url: url });
      mUrl = await mUrl.save();
      return res.send({original_url:mUrl.original_url,short_url:mUrl.short_url});
    }
  });
});

router.get("/api/shorturl/:id", (req, res) => {
  const id = Number(req.params.id);
  urlModel.findOne({ short_url: id }, (err, data) => {
    if (err)
      return res
        .status(404)
        .send({ error: "No short url found for given input" });
    res.status(301).redirect(data.original_url);
  });
});






module.exports = router