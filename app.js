const express = require("express");

const app = express();

/* The to do list and the form are displayed */
app
  .use("/", require("./routes"))

  // SN, 09/12/2018: Adds a CSS stylesheet
  .use(express.static(__dirname + "/public"))

  /* Redirects to the to do list if the page requested is not found */
  .use(function(req, res, next) {
    res.redirect("/todo");
  })

  .listen(8080);
