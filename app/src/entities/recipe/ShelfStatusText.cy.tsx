/// <reference types="cypress" />

import { getExtensions } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import { Provider, createStore, useSetAtom } from 'jotai';
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

const store = createStore();
const TestProvider = ({allowAdd = false}: {allowAdd?: boolean}) => {
  return (
    <Provider store={store}>
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
  beforeEach(() => {
    // cy.clearAllLocalStorage() fails to clear jotai storage data
    store.set(recipeAmountAtoms(forgeRecipe), 0)
    store.set(recipeAmountAtoms(extRecipes[0]), 0)
    store.set(recipeAmountAtoms(extRecipes[1]), 0)
  });

  it('is not on shelf', () => {
    cy.mount(<TestProvider />);
    cy.get('[data-testid="status"]').should('be.empty');
  });

  it('has extension but not on shelf', () => {
    cy.mount(<TestProvider />);

    cy.contains('button', 'Ext 1').click();
    cy.get('[data-testid="status"]').should('be.empty');
  });

  it('is on shelf but missing extensions', () => {
    cy.mount(<TestProvider />);

    cy.contains('button', 'Forge').click();
    cy.get('[data-testid="status"]').should('have.text', 'Missing Extensions');
  });

  it('is on shelf and has enough extensions', () => {
    cy.mount(<TestProvider />);

    cy.contains('button', 'Forge').click();

    cy.contains('button', 'Ext 1').click();
    cy.get('[data-testid="status"]').should('have.text', 'On Shelf');

    cy.contains('button', 'Ext 2').click();
    cy.get('[data-testid="status"]').should('have.text', 'On Shelf');
  });

  it('shows add button if not on shelf', () => {
    cy.mount(<TestProvider allowAdd />);

    cy.get('[data-testid="status"]')
      .get('button[aria-label="Add"]')
      .should('exist')
      .click();

    cy.get('[data-testid="status"]').should('have.text', 'Missing Extensions');
  });
});
