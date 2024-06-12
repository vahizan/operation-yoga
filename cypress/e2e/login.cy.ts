/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

const loginFixture = "login";
describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should go to login page", () => {
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.href).to.contains("login");
    });
  });

  it.only("should enter email and password incorrectly", () => {
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get("input[type=email]").type("test@email.com");
    cy.get("input[type=password]").type("test");
    cy.get("button").contains("Login").click();
    cy.get("p").contains("Invalid email or password");
  });

  it("should enter email and password correctly", () => {
    cy.server();
    cy.intercept("POST", "/api/login", (req) => {
      req.reply((res) => {
        res.send({ fixture: loginFixture });
      });
    });
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get("input[name=email]").type("email@email.com");
    cy.get("input[name=password]").type("password");
    cy.get("button").contains("Login").click();
    cy.get("p").contains("Welcome back");
  });

  it("should timeout on network error", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/api/login",
      status: 500,
      response: {},
    });
    cy.get("a").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
    cy.get("input[name=email]").type("email@email.com");
    cy.get("input[name=password]").type("password");
    cy.get("button").contains("Login").click();
    cy.get("p").contains("Network error");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
