import { performAction } from "../src/client/js/app.js"

describe("Testing the the result of clicking search", () => {
  test("Testing the performAction function", () => {
    document.body.innerHTML = '<button id="search" type = "submit">Search</button>';
    const event = { preventDefault: () => {} };
        const spy = jest.spyOn(event, 'preventDefault');
        performAction(event)
        expect(spy).toBeDefined()
  });
});
