describe('Refrigerator', () => {
    beforeEach(() => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.visit("/")
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.contains("testUser")
            cy.get('#profile-card').click()
            cy.get('input[type=password]').type(testUser.password)
            cy.get('button[type=submit]').click()
            cy.wait(2000)
            cy.visit("/refrigerator")
        })
    });

    it('refrigerator renders ', () => {
        cy.contains("Kjøleskap");
    });

    it('can eat a grocery', () => {
        cy.visit("/shoppingList")
        cy.get('.dropdown input').type('Nøkkelost')
        cy.get('.dropdown-menu li').contains('Nøkkelost').click();
        cy.get('[type="checkbox"]').check()
        cy.get(".buttons").contains("Kjøp valgte varer").click();
        cy.intercept({
            method: 'POST',
            url: '**/buy',
        }).as('buy');
        cy.wait('@buy')

        cy.visit("/refrigerator")
        cy.get('#grocery_grid').should('be.visible');
        cy.contains("Nøkkelost").should("exist")
        cy.get(".container").first().find("#eatBtn").click();
        cy.wait(3000)
        cy.contains("Nøkkelost").should("not.exist")
        })
    it('can throw away a grocery', () => {
        cy.visit("/shoppingList")
        cy.get('.dropdown input').type('Nøkkelost')
        cy.get('.dropdown-menu li').contains('Nøkkelost').click();
        cy.get('[type="checkbox"]').check()
        cy.get(".buttons").contains("Kjøp valgte varer").click();
        cy.intercept({
            method: 'POST',
            url: '**/buy',
        }).as('buy');
        cy.wait('@buy')
        cy.visit("/refrigerator")
        cy.contains("Nøkkelost").should("exist")
            cy.get('.container').first().find('.throwModalBtn').click()
            cy.get('#throwSlider').invoke('val', 50).trigger('input')
            cy.get('#throwModalBtn').click()
        cy.wait(3000)
        cy.contains("Nøkkelost").should("not.exist")
    })
});