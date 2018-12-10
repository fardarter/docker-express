const replaceFn = require("../lib/replaceFn");
const todolist1 = ["foo", "revised", "la", "so", "fa"];
const todolist2 = ["foo", "bar", "la", "so", "fa"];
const todolist3 = ["foo", "bar", "la", "so", "revised"];
const todolist4 = ["foo", "bar", "revised", "so", "fa"];
const todolist5 = ["foo", "bar", "la", "so", "fa", "revised"];

describe("replaceFn", () => {
  test("replaceFn(req.body.toedit = 1, todolist.length = 5)", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 1, revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual(todolist1);
  });
  test("replaceFn(req.body.toedit = 4, todolist.length = 5)", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 4, revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual(todolist3);
  });
  test("replaceFn(req.body.toedit = 2, todolist.length = 5)", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 2, revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual(todolist4);
  });
  test("replaceFn(req.body.toedit = 8, todolist.length = 5)", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 8, revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual(todolist5);
  });
  test("'body' no property 'revision'", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 8 }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual([]);
  });
  test("'body' no property 'toedit')", async () => {
    const req = {
      sanitize: data => data,
      body: { revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual([]);
  });
  test("no property on req 'body'", async () => {
    const req = {
      sanitize: data => data
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual([]);
  });
  test("req no sanitize()", async () => {
    const req = {
      body: { toedit: 8, revision: "revised" }
    };
    const todolist = todolist2;
    expect(replaceFn({ req, todolist })).toEqual([]);
  });

  test("no todolist", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 8, revision: "revised" }
    };
    expect(replaceFn({ req })).toEqual([]);
  });
  test("todolist not array (bool)", async () => {
    const req = {
      sanitize: data => data,
      body: { toedit: 8, revision: "revised" }
    };
    const todolist = true;
    expect(replaceFn({ req, todolist })).toEqual([]);
  });
});
