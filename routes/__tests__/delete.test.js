const request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require("../../app");

describe("Route: /todo/delete/", () => {
  test("POST, newtodo=john", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=john")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo0").textContent).toEqual(
      "john"
    );
  });
  test("POST, newtodo=harry", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=harry")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo1").textContent).toEqual(
      "harry"
    );
    expect(dom.window.document.querySelector("#todo0").textContent).toEqual(
      "john"
    );
  });
  test("GET, /todo/delete/1", async () => {
    const response = await request(app)
      .get("/todo/delete/1")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo1")).toEqual(null);
  });
  test("GET, /todo/delete/0", async () => {
    const response = await request(app)
      .get("/todo/delete/0")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo0")).toEqual(null);
  });
});
