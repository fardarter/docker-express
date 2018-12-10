const request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require("../../app");

describe("Route: /todo/edit/", () => {
  test("GET, /edit/1", async () => {
    const response = await request(app)
      .get("/todo/edit/1")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#toedit")).toEqual(null);
  });

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
  test("GET, /edit/1", async () => {
    const response = await request(app)
      .get("/todo/edit/1")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#toedit").value).toEqual("1");
  });
});
