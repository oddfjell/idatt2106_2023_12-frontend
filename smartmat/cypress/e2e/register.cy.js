describe('Register', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('Register components render in'), () => {
        cy.contains("Register");
        cy.contains("Brukernavn");
        cy.get('input[name=username]').should('be.visible');
        cy.contains("Passord");
        cy.get('input[name=password]').should('be.visible');
        cy.get('#registerBtn').should('be.visible');
        cy.get('#loginBtn').should('be.visible');


    }


    it('register user redirects to home page', () => {
        cy.fixture('user').then((users) => {
            const {user1} = users;
            cy.get('input[name=username]').type(user1.username);
            cy.get('input[name=password]').type(user1.password);
            cy.wait('#registerBtn').click();
            cy.url().should('include', '/home')

        })
    });

    it('redirects to login at "Have an account? Login here!"', () => {
        cy.wait("loginBtn").click();
        cy.url().should('include', '/')

    })


    it('registration fail, no username', () => {
        cy.fixture('user').then((users) => {
            const {user2} = users;
            cy.get('input[name=username]').type(user2.username);
            cy.get('input[name=password]').type(user2.password);
            cy.wait('#registerBtn').click();
            cy.get('#error').should('contain', 'Registration failed')

        })
    });

    it('registration fail, no password', () => {
        cy.fixture('user').then((users) => {
            const {user3} = users;
            cy.get('input[name=username]').type(user3.username);
            cy.get('input[name=password]').type(user3.password);
            cy.wait('#registerBtn').click();
            cy.get('#error').should('contain', 'Registration failed')

        })
    });

});
