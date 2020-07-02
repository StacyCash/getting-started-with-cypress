// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-e2e-id attribute.
     * @example cy.getByE2eId('name');
    */
    getByE2eId(e2eId: string): Chainable<Element>

    /**
     * Custom command to select DOM element by data-e2e-id attribute,
     *  clear the contents and fill with a new value.
     * @example cy.fillByE2eId('name', 'Susan Foreman');
    */
    fillByE2eId(e2eId: string, value: string): Chainable<Element>
  }
}