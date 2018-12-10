const request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require("../../app");

describe("Route: /todo/", () => {
  test("GET, /todo/", async () => {
    const response = await request(app)
      .get("/todo/")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector(".todolist")).not.toEqual(null);
  });
});
