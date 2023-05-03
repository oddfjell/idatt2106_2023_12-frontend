describe('Profile', () => {
    before(() => {
        cy.visit("/home");
        cy.get('input[name=username]').type("jonas");
        cy.get('input[name=password]').type("jonas");
        cy.get('#loginBtn').click();
        cy.get('nav').contains('person').click();
        cy.url().should('include', '/profile');
    });


    it('components render corrclty', () => {
        cy.contains('You are logged in as:');
        cy.get('h1').contains('jonas');
    });
  /*  it('The user is logged out', () => {
        cy.find('button').click();
        cy.url().should('include', '/login')


});

   */
});