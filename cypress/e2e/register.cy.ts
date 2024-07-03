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
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get('[data-testid="signup"]').click();
    cy.wait(1000);
    cy.get("h1").contains("Sign Up");
  });

  it("should handle unauthorized error ", () => {
    cy.server();
    cy.intercept("POST", "/api/auth/signup", (req) => {
      req.reply((res) => {
        res.send({ statusCode: 403, fixture: registerFixture });
      });
    });
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get('[data-testid="signup"]').click();
    cy.wait(100);
    cy.get("input[name=name]").type("namae miyoji");
    cy.get("input[name=email]").type("test@email.com");
    cy.get("input[name=password]").type("test");
    cy.get("input[name=confirmPassword]").type("test");
    cy.get("button").contains("Sign Up").click();
    cy.get("div").contains("An error occurred. Please try again later.");
  });

  it("should enter signup details correctly", () => {
    cy.server();
    cy.intercept("POST", "/api/auth/signup", (req) => {
      req.reply((res) => {
        res.send({ statusCode: 200, fixture: registerFixture });
      });
    });
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.wait(1000);
    cy.get('[data-testid="signup"]').click();
    cy.get("input[name=name]").type("namae miyoji");
    cy.get("input[name=email]").type("test@email.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.get("button").contains("Sign Up").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get('[data-testid="login-message"]').contains(
      "You've successfully signed up. Please login"
    );
  });

  it("should throw error on password mismatch", () => {
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.wait(1000);
    cy.get('[data-testid="signup"]').click();
    cy.get("input[name=name]").type("namae miyoji");
    cy.get("input[name=email]").type("email@email.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password1");
    cy.get("button").contains("Sign Up").click();
    cy.get("div").contains("Passwords don't match");
  });

  it("should timeout on network error", () => {
    cy.server();
    cy.intercept("POST", "/api/auth/signup", (req) => {
      req.reply((res) => {
        res.send({ statusCode: 500, fixture: registerFixture });
      });
    });
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get('[data-testid="signup"]').click();
    cy.get("input[name=name]").type("namae miyoji");
    cy.get("input[name=email]").type("test@email.com");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=confirmPassword]").type("password");
    cy.get("button").contains("Sign Up").click();
    cy.get("div").contains("An error occurred. Please try again later.");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
