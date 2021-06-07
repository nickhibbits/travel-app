/**
 * @jest-environment jsdom
 */

import { performAction } from "../src/client/js/performAction.js"

describe("Testing the the result of clicking search", () => {
  test("Testing the performAction function", () => {
    document.body.innerHTML =
      '<input type="text" id="dest" placeholder="Destination">'
      '<button id="search" type = "submit">Search</button>';
    const event = { preventDefault: () => {} };
        const spy = jest.spyOn(event, 'preventDefault');
        performAction(event)
        expect(performAction).toBeDefined();
  });
});
