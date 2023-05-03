describe('WeekMenu', () => {
    beforeEach(() => {
        cy.visit("/home")
        cy.get('input[name=username]').type("jonas");
        cy.get('input[name=password]').type("jonas");
        cy.get('#loginBtn').click();
        cy.visit("/weeklyMenu")
    });

    it('recipes get displayed', () => {
        cy.get('ol').find('li').first().find('div').find('h3').invoke('text').should('exist')
    });

    it('recipes change properly', () => {
        let recipeTitle;
        cy.get('ol').find('li').first().find('div').first().find('h3').invoke('text').then(h3 => {
            recipeTitle=h3;
        })
        cy.get('#refreshRecipeBtn').click();
        cy.get('ol').find('li').first().find('div').first().find('h3').should('not.include.text', recipeTitle);
    });
});