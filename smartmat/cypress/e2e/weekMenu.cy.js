describe('WeekMenu', () => {
    beforeEach(() => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.visit("/home")
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.contains("testUser")
            cy.get('#profile-card').click()
            cy.get('input[type=password]').type(testUser.password)
            cy.get('button[type=submit]').click()
            cy.visit("/weeklyMenu")
        })
    });

    it('recipes get displayed', () => {
        cy.get('ol').find('li').first().find('div').find('h3').invoke('text').should('exist')
    });

    it('recipes change properly', () => {
        let recipeTitle;
        cy.get('ol').find('li').first().find('div').first().find('h3').invoke('text').then(h3 => {
            recipeTitle=h3;
        })
        cy.get('#refreshRecipeBtn').click({force:true});
        cy.get('ol').find('li').first().find('div').first().find('h3').should('not.include.text', recipeTitle);
    });
});