/// <reference types="cypress" />

describe('Recipe data', () => {
  it.skip('fail to fetch data', () => {});

  it('import from user file', () => {
    cy.intercept('/data.json').as('jsonData');
    cy.visit('/');
    cy.wait('@jsonData');

    cy.fixture('data/valid.json').as('dataFile');
    cy.get('[data-testid="cy-input-import"]')
      .selectFile('@dataFile', { force: true });

    cy.search('"Steel Ingot"');
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr')
      .should('have.length', 1);
  });

  it.skip('fail to import from user file', () => {});
});
