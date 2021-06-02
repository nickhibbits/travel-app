const request = require("supertest");
const app = require("./src/server/app");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .post("/current")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// import { server } from "../src/server/server.js"
//
// describe("Testing server startup response", () => {
//   test("Testing the server function expression", () => {
//     const input = 8000;
//     expect(server().toHaveBeenCalled())
//   });
// });
