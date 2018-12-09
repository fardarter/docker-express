const express = require("express"),
  router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let todolist = [];
let toEdit;

router.get("/", function(req, res) {
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* Adding an item to the to do list */
router.post("/add/", urlencodedParser, function(req, res) {
  if (req.body.newtodo !== "") {
    todolist.push(req.body.newtodo);
    toEdit = undefined;
  }
  res.redirect("/todo");
});

/* SN, 09/12/2018 Deletes an item from the to do list and resets the edit action */
router.get("/delete/:id", function(req, res) {
  if (req.params.id !== "") {
    todolist.splice(req.params.id, 1);
    /* SN, 09/12/2018: Clears the edit selection  */
    toEdit = undefined;
  }
  res.redirect("/todo");
});

/* SN, 09/12/2018: Resets the form state*/
router.get("/reset/", function(req, res) {
  todolist = [];
  toEdit = undefined;
  res.redirect("/todo");
});

/* SN, 09/12/2018: Cancels an edit */
router.get("/canceledit/", function(req, res) {
  toEdit = undefined;
  res.redirect("/todo");
});

/* SN, 09/12/2018: Stores a selected index to edit at */
router.get("/edit/:id", function(req, res) {
  if (req.params.id !== "") {
    toEdit = req.params.id;
  }
  res.redirect("/todo");
});

/* SN, 09/12/2018: Replaces an item in the list */
router.post("/replace/", urlencodedParser, function(req, res) {
  if (
    req.body.revision !== "" &&
    Number(req.body.toedit) <= todolist.length - 1
  ) {
    const localEdit = req.body.toedit;
    const firstSection = todolist.slice(0, localEdit);
    const secondSection = todolist.slice(localEdit + 1, todolist.length);
    todolist = [...firstSection, ...[req.body.revision], ...secondSection];
    toEdit = undefined;
  }
  res.redirect("/todo");
});

module.exports = router;
