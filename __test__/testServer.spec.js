import { server } from "../src/server/server.js"

describe("Testing server startup response", () => {
  test("Testing the server function expression", () => {
    const input = 8000;
    expect(server().toHaveBeenCalled())
  });
});
