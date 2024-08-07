/// <reference types="cypress" />

import { getExtensions } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import { Provider, useSetAtom } from 'jotai';
import ShelfStatusText from './ShelfStatusText';
import { EntityRecipeContextProvider } from './provider';

const forgeRecipe = { entity: 'Forge', quality: 1 };

const extRecipes = getExtensions('Forge').map(entity => ({
  entity,
  quality: 1,
}));

const TestButtons = () => {
  const setForge = useSetAtom(recipeAmountAtoms(forgeRecipe))
  const setExt1 = useSetAtom(recipeAmountAtoms(extRecipes[0]))
  const setExt2 = useSetAtom(recipeAmountAtoms(extRecipes[1]))
  return (
    <div>
      <button onClick={() => setForge(1)}>Forge</button>
      <button onClick={() => setExt1(1)}>Ext 1</button>
      <button onClick={() => setExt2(1)}>Ext 2</button>
    </div>
  );
};

const TestComponent = ({allowAdd = false}: { allowAdd?: boolean }) => {
  return (
    <Provider>
      <EntityRecipeContextProvider entity={forgeRecipe.entity} quality={2}>
        <div data-testid="status">
          <ShelfStatusText allowAdd={allowAdd} />
        </div>
      </EntityRecipeContextProvider>
      <TestButtons />
    </Provider>
  );
};

describe('<ShelfStatusText />', () => {
  it('should not be on the shelf', () => {
    cy.mount(<TestComponent />);
    cy.get('[data-testid="status"]').should('be.empty');
  });

  it('should not be on the shelf when only extension is on the shelf', () => {
    cy.mount(<TestComponent />);

    cy.findByRole('button', {name: 'Ext 1'}).click();
    cy.get('[data-testid="status"]').should('be.empty');
  });

  it('should be on shelf with proper number of extensions', () => {
    cy.mount(<TestComponent />);

    cy.findByRole('button', {name: 'Forge'}).click();

    cy.findByRole('button', {name: 'Ext 1'}).click();
    cy.get('[data-testid="status"]').should('have.text', 'On Shelf');

    cy.findByRole('button', {name: 'Ext 2'}).click();
    cy.get('[data-testid="status"]').should('have.text', 'On Shelf');
  });

  it('should be on the shelf and show missing extensions', () => {
    cy.mount(<TestComponent />);

    cy.findByRole('button', {name: 'Forge'}).click();
    cy.get('[data-testid="status"]').should('have.text', 'Missing Extensions');
  });

  it('should show add button when it is not on the shelf', () => {
    cy.mount(<TestComponent allowAdd />);

    cy.get('[data-testid="status"]')
      .findByRole('button', {name: /add/i})
      .should('exist')
      .click();

    cy.get('[data-testid="status"]').should('have.text', 'Missing Extensions');
  });
});
