/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {
  it('should hover over nav items and remain visible', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="veda-yogshala"]').trigger('mouseover');

    // The new url should include "/about"
    cy.get('a[href*="/veda-yogshala/teacher-training-courses"]').should('be.visible')

    // The new page should contain an h1 with "About page"
    cy.get('a[href*="/veda-yogshala/teacher-training-courses"]').trigger('mouseover').should('be.visible')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
