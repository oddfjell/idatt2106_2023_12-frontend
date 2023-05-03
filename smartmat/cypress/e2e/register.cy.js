describe('Register', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('Register components render in', () => {
        cy.contains("Registrer");
        cy.contains("Brukernavn");
        cy.get('input[name=username]').should('be.visible');
        cy.contains("Passord");
        cy.get('input[name=password]').should('be.visible');
        cy.get('#registerBtn').should('be.visible');
        cy.get('#loginBtn').should('be.visible');
    })


    it('register user redirects to home page', () => {
        cy.fixture('user').then((users) => {
            const {user1} = users;
            cy.get('input[name=username]').type(user1.username);
            cy.get('input[name=password]').type(user1.password);
            cy.get('#registerBtn').click();
            cy.url().should('include', '/home')

        })
    });

    it('redirects to login at "Have an account? Login here!"', () => {
        cy.get("#loginBtn").click();
        cy.url().should('include', '/')

    })


    it('registration fail, no username', () => {
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.get('input[name=username]').clear();
            cy.get('input[name=password]').type(testRegisterUser.password);
            cy.get('#registerBtn').click();
            cy.get('#error').should('contain', 'Registration failed')

        })
    });

    it('registration fail, no password', () => {
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.get('input[name=username]').type(testRegisterUser.username);
            cy.get('input[name=password]').clear();
            cy.get('#registerBtn').click();
            cy.get('#error').should('contain', 'Registration failed')

        })
    });

});
