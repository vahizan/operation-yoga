/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Navigation", () => {
  describe("Left Drawer", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });

    it("should open and close nav drawer", () => {
      const hamburgerButton = cy.get('[data-test-id="hamburger-button"]');
      hamburgerButton.should("not.be.visible"); // verify that the drawer is not visible initially
      hamburgerButton.click(); // click the button to open the drawer
      cy.get('[data-test-id="drawer"]').should("be.visible"); // verify that the drawer is now visible
    });

    it("should close nav drawer on blur", () => {
      const hamburgerButton = cy.get('[data-test-id="hamburger-button"]');
      hamburgerButton.should("not.be.visible"); // verify that the drawer is not visible initially
      hamburgerButton.click();
      cy.get('[data-test-id="drawer"]').should("be.visible"); // verify that the drawer is now visible
      cy.get("body").click("topRight");
      cy.get('[data-test-id="drawer"]').should("not.be.visible"); // verify that the drawer is now visible
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
