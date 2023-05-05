describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should render components', () => {
        cy.contains("Logg inn");
        cy.contains("Brukernavn");
        cy.get('input[name=username]').should('be.visible');
        cy.contains("Passord");
        cy.get('input[name=password]').should('be.visible');
        cy.get('#loginBtn').should("exist");
        cy.get('#registerBtn').should("exist");
    })

    it('should redirect to register when registerButton is clicked', () => {
        cy.get('#registerBtn').click();
        cy.url().should('include', '/register')
    })
    it('login redirects to profile page', () => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.url().should('include', '/profile')
        });
    })
    it('invalid username ', () => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.get('input[name=username]').type('invalidusername');
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#error').should('not.exist')
            cy.get('#loginBtn').click();
            cy.get('#error').should('exist')
        });
    })
    it('invalid password ', () => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type('invalidpassword');
            cy.get("#error").should("not.exist")
            cy.get('#loginBtn').click();
            cy.get("#error").should("exist")

        });
    })
});