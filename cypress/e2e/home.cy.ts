describe("home", () => {
  it("should load", () => {
    cy.visit("/");
    cy.contains("I'm Kishan, a software engineer");
  });
});
