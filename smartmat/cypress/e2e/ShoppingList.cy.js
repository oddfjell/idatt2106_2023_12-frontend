describe('ShoppingList', () => {
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
            cy.visit("/shoppingList")
        })
    });

     it('shoppingList items render correctly', () => {
         cy.contains("Handleliste");
         cy.get("#dropdown").should("be.visible")
         cy.get(".buttons").should('have.length', 2);
     });

    it('shoppingList can add an item and save', () => {
        cy.get('.dropdown input').type('Nøkkelost')
        cy.get('.dropdown-menu li').contains('Nøkkelost').click();
        cy.contains("Lagt til Nøkkelost");
        cy.get(".buttons").contains("Lagre endringer").click();
        cy.contains("Lagret!")
    });

    it('can remove an item and save', () => {
        cy.get('.dropdown input').type('Nøkkelost')
        cy.get('.dropdown-menu li').contains('Nøkkelost').click();
        cy.contains("Lagt til Nøkkelost");
        cy.get("#shoppingListEntitiesGrid").find(".material-symbols-outlined").click()
        cy.get(".buttons").contains("Lagre endringer").click();
        cy.get("Nøkkelost").should("not.exist")
    });

    it('the user can select the item to the fridge', () => {
        cy.get('.dropdown input').type('Nøkkelost')
        cy.get('.dropdown-menu li').contains('Nøkkelost').click();
        cy.get('[type="checkbox"]').check()
        cy.get(".buttons").contains("Kjøp valgte varer").click();
        cy.intercept({
            method: 'POST',
            url: '**/buy',
        }).as('buy');
        cy.wait('@buy')
        cy.visit("/refrigerator");
        cy.get("#eatBtn").click()
    });






});
