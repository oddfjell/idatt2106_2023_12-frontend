describe('Profile', () => {
    beforeEach(() => {
        cy.visit('/profile');
    });

    it('profile components renders correctly', () => {
        cy.contains("You are logged in as:");
        cy.get('#GreyBtn Btn').should('have.text', 'Log out');

    });



    it('username is rendered correct', () => {
            cy.fixture('user').then((users) => {
            const {user1} = users;
            cy.visit('/login')
            cy.get('input[name=username]').type(user1.username);
            cy.get('input[name=password]').type(user1.password);
            cy.wait('#loginBtn').click();
            cy.visit('/profile')
            cy.get('h1').contains(user1.username)
    });
    });

    it('The user is logged out',()=>{
        cy.wait('#GreyBtn Btn"').click();
        cy.url().should('include', '/login')

});


});