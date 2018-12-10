const express = require("express"),
  router = express.Router();
const replaceFn = require("./lib/replaceFn");

let todolist = [];
let toEdit;

router.get("/", function(req, res) {
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* Adding an item to the to do list */
router.post("/add/", function(req, res) {
  if (req.body.newtodo !== "") {
    todolist.push(req.body.newtodo);
    toEdit = undefined;
  }
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* SN, 09/12/2018: Replaces an item in the list */
router.post("/replace/", function(req, res) {
  if (
    req.body.revision !== "" &&
    Number(req.body.toedit) <= todolist.length - 1
  ) {
    todolist = replaceFn({ req, todolist });
    toEdit = undefined;
  }
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* SN, 09/12/2018 Deletes an item from the to do list and resets the edit action */
router.get("/delete/:id", function(req, res) {
  if (req.params.id !== "") {
    todolist.splice(req.params.id, 1);
    /* SN, 09/12/2018: Clears the edit selection  */
    toEdit = undefined;
  }
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* SN, 09/12/2018: Resets the form state*/
router.get("/reset/", function(req, res) {
  todolist = [];
  toEdit = undefined;
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* SN, 09/12/2018: Cancels an edit */
router.get("/canceledit/", function(req, res) {
  toEdit = undefined;
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

/* SN, 09/12/2018: Stores a selected index to edit at */
router.get("/edit/:id", function(req, res) {
  if (req.params.id !== "") {
    toEdit = req.params.id;
  }
  res.render("../views/todo.ejs", { todolist, toEdit: toEdit });
});

module.exports = router;
