const request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require("../../app");

describe("Route: /todo/add/", () => {
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
  test("POST, <script>console.log('foo')</script>", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=<script>console.log('foo')</script>")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo1").textContent).toEqual("");
  });
  test("POST, <script>console.log('foo')</script> Outside of tags", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=<script>console.log('foo')</script>Outside of tags")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo2").textContent).toEqual(
      "Outside of tags"
    );
  });
});
