const express = require("express"),
  router = express.Router();

router.use("/todo", require("./todo"));

module.exports = router;
