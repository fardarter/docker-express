const express = require("express");
const app = express();
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
/* The to do list and the form are displayed */
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(expressSanitizer())
  .use("/", require("./routes"))

  /* Redirects to the to do list if the page requested is not found */
  .use(function(req, res, next) {
    res.redirect("/todo");
  });

module.exports = app;
