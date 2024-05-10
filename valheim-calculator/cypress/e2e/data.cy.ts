/// <reference types="cypress" />

describe('Recipe data', () => {
  it('fail to fetch data', () => {
    cy.intercept('/data.json', {
      statusCode: 404,
    }).as('jsonData');
    cy.visit('/');
    cy.wait('@jsonData');

    // Notify
    cy.get('.ToasterContainer > div')
      .first()
      .invoke('text')
      .should('match', /fail to load/i);

  });

  it('import from user file', () => {
    cy.intercept('/data.json').as('jsonData');
    cy.visit('/');
    cy.wait('@jsonData');

    // Select file
    cy.fixture('data/valid.json').as('dataFile');
    cy.get('[data-testid="cy-input-import"]')
      .selectFile('@dataFile', { force: true });

    // Notify
    cy.get('.ToasterContainer > div')
      .first()
      .invoke('text')
      .should('match', /valid\.json has been imported/i);

    // Searchable
    cy.search('"Steel Ingot"');
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr')
      .should('have.length', 1);
  });

  it('fail to import from user file', () => {
    cy.intercept('/data.json').as('jsonData');
    cy.visit('/');
    cy.wait('@jsonData');

    // Select file
    cy.fixture('data/invalid.json').as('dataFile');
    cy.get('[data-testid="cy-input-import"]')
      .selectFile('@dataFile', { force: true });

    // Notify
    cy.get('.ToasterContainer > div')
      .first()
      .invoke('text')
      .should('match', /import failed/i);
  });
});
