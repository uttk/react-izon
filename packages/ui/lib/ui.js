"use strict";

const opn = require('opn');
const express = require("express")

const app = express();

const startServer = json => {

  app.use(express.static('public'));

  app.get("/dependencies", (req, res) => {
    res.json(json);
  })

  app.listen(9000, () => {
    console.log("Get starting server!!")
  })

  opn("http://localhost:9000")
}

startServer({ hello : "Hello" })
