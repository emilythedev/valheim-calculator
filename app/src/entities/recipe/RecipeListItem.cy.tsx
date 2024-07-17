import RecipeListItem from './RecipeListItem';

describe('<RecipeListItem />', () => {
  it('displays name and quality level', () => {
    cy.mount(<RecipeListItem entity="LeatherTunic" quality={2} />);
    cy.contains('Leather tunic');
    cy.get('[aria-label="Quality level"]').siblings().contains('2');
  });

  it('does not show quality level 1 for non-upgradable', () => {
    cy.mount(<RecipeListItem entity="Adze" quality={1} />);
    cy.contains('Adze');
    cy.get('[aria-label="Quality level"]').should('not.exist');
  });

  it('shows quality level >1 for extendable', () => {
    cy.mount(<RecipeListItem entity="Workbench" quality={2} />);
    cy.contains('Workbench');
    cy.get('[aria-label="Quality level"]').siblings().contains('2');
  });

  it('clicks on recipe button', () => {
    const onClick = cy.spy().as('onClickSpy');

    cy.mount(<RecipeListItem entity="Workbench" quality={2} onViewRecipe={onClick} />);
    cy.get('[aria-label="View recipe details"]').click();
    cy.get('@onClickSpy').should('have.been.calledOnceWith');
  });

  it('hides recipe button', () => {
    cy.mount(<RecipeListItem entity="Workbench" quality={2} hideRecipeButton/>);
    cy.get('[aria-label="View recipe details"]').should('not.exist');
  });
});
