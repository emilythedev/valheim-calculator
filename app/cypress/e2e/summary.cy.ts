/// <reference types="cypress" />

describe('Summary', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/data.json').as('jsonData');
    cy.wait('@jsonData');
  });

  it('is empty', () => {
    cy.get('[data-testid="cy-summaryTabs"]')
      .contains('button', 'Summary')
      .click();

    cy.get('[data-testid="cy-table-summary"] > tbody > tr')
      .should('have.length', 1)
      .invoke('text')
      .should('match', /add item/i);
  });

  it('summarize the materials of crafting an item and its upgrades', () => {
    cy.search('"black forge"');

    // Add item
    cy.get('table[data-testid=cy-table-recipes] > tbody')
      .contains('tr', 'Black forge')
      .as('targetRow')
      .find('[data-testid="cy-btn-addItem"]')
      .click();

    // View upgrades
    cy.get('@targetRow')
      .find('[data-testid="cy-btn-viewUpgrades"]')
      .click();

    // Add upgrades
    cy.get('table[data-testid=cy-table-recipes] > tbody > tr')
      .should('have.length', 2)
      .find('[data-testid="cy-btn-addItem"]')
      .each(($btn) => {
        cy.wrap($btn).click();
      });

    // View summary
    cy.get('[data-testid="cy-summaryTabs"]')
      .contains('button', 'Summary')
      .click();

    cy.get('[data-testid="cy-table-summary"] > tbody > tr')
      .then(($trs) => {
        const data: string[][] = [];

        $trs.each((i, tr) => {
          const row: string[] = [];

          cy.wrap(tr).find('td').each(($td) => {
            row.push($td.text());
          });

          data.push(row);
        });

        cy.wrap(data).should('deep.equal', [
          ['Black core', 'x5'],
          ['Black marble', 'x14'],
          ['Copper', 'x13'],
          ['Iron', 'x10'],
          ['Mechanical spring', 'x2'],
          ['Yggdrasil wood', 'x10'],
        ]);
      });

  });
});
