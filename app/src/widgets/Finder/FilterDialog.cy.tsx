/// <reference types="cypress" />

import { createStore, Provider } from 'jotai';
import FilterDialog from './FilterDialog';
import FinderButton from './FinderButton';
import { FinderContextProvider } from './provider';

const TestProvider = ({ store }: { store: ReturnType<typeof createStore> }) => {
  const setEntity = cy.spy().as('setEntity');
  return (
    <Provider store={store}>
      <FinderButton />
      <FinderContextProvider entity="" setEntity={setEntity}>
        <FilterDialog />
      </FinderContextProvider>
    </Provider>
  );
};

describe('<FilterDialog />', () => {
  beforeEach(() => {
    cy.mount(<TestProvider store={createStore()}/>);
    cy.contains('button', 'Search').click({ force: true });
  });

  it('does not list all entities', () => {
    cy.get('input[cmdk-input]').should('be.empty');
    cy.get('[cmdk-list]').should('contain.text', 'No results found.');
  });

  it('selects entities by name', () => {
    cy.get('input[cmdk-input]').should('be.empty').type('Flint');
    cy.get('[cmdk-list-sizer] [data-value="FlintKnife"]').should('exist').click();
    cy.get('@setEntity').should('have.been.calledOnceWith', 'FlintKnife');
  });

  it('selects entities by category', () => {
    cy.contains('button', 'Weapon').click();

    cy.get('[cmdk-list-sizer] [data-value="FlintKnife"]').should('exist').click();
    cy.get('@setEntity').should('have.been.calledOnceWith', 'FlintKnife');
  });

  it('has sub-category', () => {
    cy.contains('select a category').should('exist');
    cy.contains('button', 'Weapon').click();
    cy.contains('select a category').should('exist');
    cy.contains('button', 'Axe').click();

    cy.contains('select a category').should('not.exist');

    cy.get('[cmdk-list-sizer] [data-value="FlintKnife"]').should('not.exist');
    cy.get('[cmdk-list-sizer] [data-value="FlintAxe"]').should('exist').click();
    cy.get('@setEntity').should('have.been.calledOnceWith', 'FlintAxe');
  });

  it('removes category filter', () => {
    cy.get('input[cmdk-input]').should('be.empty').type('Workbench');
    cy.get('[cmdk-list-sizer] [data-value="Workbench"]').should('exist');

    cy.contains('button', 'Weapon').click();
    cy.get('[cmdk-list]').should('contain.text', 'No results found.');

    cy.get('[aria-label="Selected filter"]').contains('button', 'Weapon').click(); // remove
    cy.get('[cmdk-list-sizer] [data-value="Workbench"]').should('exist');
  });

  it('keeps input and filter after close and re-open', () => {
    cy.get('input[cmdk-input]').should('be.empty').type('Flint');
    cy.contains('button', 'Weapon').click();
    cy.get('[aria-label="Selected filter"]').contains('button', 'Weapon').should('exist');
    cy.contains('button', 'Close').click();

    cy.contains('button', 'Search').click({ force: true });
    cy.get('input[cmdk-input]').should('contain.value', 'Flint');
    cy.get('[aria-label="Selected filter"]').contains('button', 'Weapon').should('exist');
  });
});
