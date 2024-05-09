/// <reference types="cypress" />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/data.json').as('jsonData');
    cy.wait('@jsonData');
  });

  it('search for an item by full name', () => {
    cy.search('"forge"');

    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr')
      .should('have.length', 1)
      .find('> td:first-child')
      .should('have.text', 'Forge');
  });

  it('search for all items containing search text', () => {
    cy.search('forge');

    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr > td:first-child')
      .should('include.text', 'forge');
  });

  it('view upgrades', () => {
    cy.search('"forge"');
    const forgeUpgrades = [
      'Anvils', 'Forge bellows', 'Forge cooler',
      'Forge toolrack', 'Grinding wheel', 'Smith\'s anvil',
    ];

    // View upgrades
    cy.get('table[data-testid=cy-table-recipes] > tbody')
      .contains('tr', 'Forge')
      .find('[data-testid="cy-btn-viewUpgrades"]')
      .click();

    // Results
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr > td:first-child')
      .then(($tds) => {
        const titles = $tds.map((i, td) => {
          return Cypress.$(td).text();
        }).get();

        expect(titles).to.deep.equal(forgeUpgrades);

        cy.wrap(titles);
      })
      .as('prevTitles');

    // will also update search box
    cy.get('[data-testid="cy-select-queryType"] > button[name="queryType"]')
      .should('have.text', 'Upgrades of');

    cy.get('input[name="queryInputValue"]')
      .should('have.value', '"Forge"');

    // Search with the same values, will get the same result
    cy.get('button[type=submit]').click();
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr > td:first-child')
      .then(($tds) => {
        const titles = $tds.map((i, td) => {
          return Cypress.$(td).text();
        }).get();

        cy.get('@prevTitles')
          .then((prevs) => {
            expect(titles).to.deep.equal(prevs);
          });
      });
  });

  it('clear search text', () => {
    // Get original results
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr')
      .should('have.length.gt', 1)
      .find('td:first-child')
      .then(($tds) => {
        const titles = $tds.map((i, td) => {
          return Cypress.$(td).text();
        }).get();
        cy.wrap(titles);
      })
      .as('prevTitles');

    // Search
    cy.search('"forge"');

    // Get a different result
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr')
      .should('have.length', 1);

    // Clear search input and search
    cy.get('[data-textid="cy-btn-clearSearchValue"]')
      .click();
    cy.get('button[type=submit]').click();

    // Should be the same as the original results
    cy.get('table[data-testid="cy-table-recipes"] > tbody > tr > td:first-child')
    .then(($tds) => {
      const titles = $tds.map((i, td) => {
        return Cypress.$(td).text();
      }).get();

      cy.get('@prevTitles')
        .then((prevs) => {
          expect(titles).to.deep.equal(prevs);
        });
    });
  });

  it('scroll to load more search results', () => {
    cy.get('[data-testid="cy-table-recipes"]').as('table');

    // Get result count
    cy.get('@table').find('tr').its('length').then((length) => {
      // scroll to bottom
      cy.get('@table')
        .find('tr')
        .last()
        .scrollIntoView();

      // compare result count
      cy.get('@table')
        .find('tr')
        .its('length')
        .should('be.gt', length);
    });
  })
});
