import RecipeListItem from './RecipeListItem';

describe('<RecipeListItem />', () => {
  it('should display name and quality level', () => {
    cy.mount(<RecipeListItem entity="LeatherTunic" quality={2} />);
    cy.contains('Leather tunic');
    cy.findByText('Quality level').next().should('contain.text', '2');
  });

  it('should not show quality level 1 for non-upgradable', () => {
    cy.mount(<RecipeListItem entity="Adze" quality={1} />);
    cy.contains('Adze');
    cy.findByText('Quality level').should('not.exist');
  });

  it('should show quality level >1 for extendable', () => {
    cy.mount(<RecipeListItem entity="Workbench" quality={2} />);
    cy.contains('Workbench');
    cy.findByText('Quality level').next().should('contain.text', '2');
  });

  it('should click on recipe button', () => {
    const onClick = cy.spy().as('onClickSpy');

    cy.mount(<RecipeListItem entity="Workbench" quality={2} onViewRecipe={onClick} />);
    cy.findByRole('button', {name: 'View recipe details'}).click();
    cy.get('@onClickSpy').should('have.been.calledOnceWith');
  });

  it('should hide recipe button', () => {
    cy.mount(<RecipeListItem entity="Workbench" quality={2} hideRecipeButton/>);
    cy.findByRole('button', {name: 'View recipe details'}).should('not.exist');
  });
});
