/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

const registerFixture = "register";

describe("Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should go to register page", () => {
    cy.get("a").contains("Register").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/register");
    });
  });

  it("should details incorrectly ", () => {
    cy.get("a").contains("Register").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/register");
    });
    cy.get("input[name=email]").type("test");
    cy.get("input[name=password]").type("test");
    cy.get("input[name=confirmPassword]").type("test");
    cy.get("button").contains("Register").click();
    cy.get("p").contains("Invalid email or password");
  });

  it("should enter user details correctly", () => {
    cy.server();
    cy.intercept("POST", "/api/register", (req) => {
      req.reply((res) => {
        res.send({ fixture: registerFixture });
      });
    });
    cy.get("a").contains("Register").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/register");
    });
    cy.get("input[name=email]").type("  ");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.get("button").contains("Register").click();
  });

  it("should throw error on password mismatch", () => {
    cy.get("a").contains("Register").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/register");
    });
    cy.get("input[name=email]").type("email");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password1");
    cy.get("button").contains("Register").click();
    cy.get("p").contains("Passwords do not match");
  });

  it("should timeout on network error", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/api/register",
      status: 500,
      response: {},
    });
    cy.get("a").contains("Register").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/register");
    });
    cy.get("input[name=email]").type("  ");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.get("button").contains("Register").click();
    cy.get("p").contains("Network error");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
