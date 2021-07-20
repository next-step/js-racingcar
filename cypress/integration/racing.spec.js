describe("js-raicingcar", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:4001/");
  });

  it("displays two todo items by default", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get("input[type=text]")
      .type("1,2,3,4,5")
      .should("have.value", "1,2,3,4,5");
    cy.get("#text-btn").click();
    cy.get("input[type=number]").type("5").should("have.value", "5");
    cy.get("#number-btn").click();

    // cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
    // cy.get(".todo-list li").last().should("have.text", "Walk the dog");
  });
});
