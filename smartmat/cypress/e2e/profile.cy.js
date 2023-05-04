describe('Profile', () => {
    beforeEach(() => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.visit("/");
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.contains("testUser")
            cy.get('#profile0').click()
            cy.get('input[type=password]').type(testUser.password)
            cy.get('button[type=submit]').click()
            cy.get('nav').contains('person').click();
            cy.url().should('include', '/account');
        })
    });


    it('components render corrclty', () => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.get('h1').contains(testUser.username);
            cy.get("#buttons").find('button').should('have.length', 3)
        });
    })
    it('The user is logged out', () => {
        cy.get("#buttons").find('#logout').click();
        cy.url().should('eq', 'http://localhost:4173/')
    });

    it( "can change profile", () =>{
        cy.get("#buttons").find('#changeProfile').click();

        cy.contains("testUser2")
        cy.get('#profile1').click()
        cy.get('button[type=submit]').click()
        cy.get('nav').contains('person').click();
        cy.url().should('include', '/account');
        cy.get('h1').contains("testUser2");
    })
});