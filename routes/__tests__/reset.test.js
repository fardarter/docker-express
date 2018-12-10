const request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require("../../app");

describe("Route: /todo/reset/", () => {
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
    expect(dom.window.document.querySelector("#todo0").textContent).toEqual(
      "john"
    );
    expect(dom.window.document.querySelector("#todo1").textContent).toEqual(
      "harry"
    );
  });

  test("POST, newtodo=ada", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=ada")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo0").textContent).toEqual(
      "john"
    );
    expect(dom.window.document.querySelector("#todo1").textContent).toEqual(
      "harry"
    );
    expect(dom.window.document.querySelector("#todo2").textContent).toEqual(
      "ada"
    );
  });
  test("POST, newtodo=mohammed", async () => {
    const response = await request(app)
      .post("/todo/add/")
      .send("newtodo=mohammed")
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo0").textContent).toEqual(
      "john"
    );
    expect(dom.window.document.querySelector("#todo1").textContent).toEqual(
      "harry"
    );
    expect(dom.window.document.querySelector("#todo2").textContent).toEqual(
      "ada"
    );
    expect(dom.window.document.querySelector("#todo3").textContent).toEqual(
      "mohammed"
    );
  });
  test("GET, /reset/", async () => {
    const response = await request(app)
      .get("/todo/reset/")
      .expect(200)
      .set("Accept", "application/json");
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector("#todo0")).toEqual(null);
    expect(dom.window.document.querySelector("#todo1")).toEqual(null);
    expect(dom.window.document.querySelector("#todo2")).toEqual(null);
    expect(dom.window.document.querySelector("#todo3")).toEqual(null);
  });
});
