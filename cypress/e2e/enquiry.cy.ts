/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Enquire", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="enquire"]').click();
  });

  it.skip("submit is disabled when fields are empty", () => {
    cy.location("pathname").should("eq", "/enquire"); // Wait for the URL to match the expected route

    const submitButton = cy.get('button[type="submit"]');

    submitButton.should("be.disabled");
    cy.contains("span", "Subject is required");
    cy.contains("span", "Message is required");
    cy.contains("span", "Email is required");
    cy.contains("span", "Name is required");
  });

  it("Name field should show error message on empty text", () => {
    cy.contains("label", "Name").click();
    const nameField = cy.get("input#name");
    nameField.type("Name");
    nameField.clear();
    cy.contains("span", "Name is required");
  });

  it("Name field should not show message by default", () => {
    cy.contains("span", "Name is required").should("not.exist");
  });

  it("Email field should show error message on invalid email text", () => {
    cy.contains("label", "Email").click();
    const emailField = cy.get("input#email");
    emailField.type("EMAIL");
    emailField.blur();
    cy.contains("span", "Email is invalid");
  });

  it("Email field should show error message on empty email text", () => {
    cy.contains("label", "Email").click();
    const emailField = cy.get("input#email");
    emailField.type("EMAIL");
    emailField.clear();
    cy.contains("span", "Email is required");
  });

  it("Email field should not show message by default", () => {
    cy.contains("span", "Email is required").should("not.exist");
    cy.contains("span", "Email is invalid").should("not.exist");
  });

  it.only("Phone field should show error message if invalid phone number", () => {
    cy.contains("label", "Phone").click();
    const phoneField = cy.get("input#phone");
    phoneField.type("13sda3sa3");
    phoneField.blur();
    cy.contains("span", "Phone number is invalid");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
