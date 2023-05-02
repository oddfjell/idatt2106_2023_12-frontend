describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });


    it('Login components render'), () => {
        cy.contains("Login");
        cy.contains("Brukernavn");
        cy.get('input[name=username]').should('be.visible');
        cy.contains("Passord");
        cy.get('input[name=password]').should('be.visible');
        cy.get('#loginBtn').should('have.text', 'Sign in');
        cy.get('#registerBtn').should('have.text', 'Dont have an account? Register here!');
    }

    it('login redirects to register', () => {
        cy.wait('#loginBtn').click();
        cy.url().should('include', '/register')
    })


    it('login redirects to home page', () => {
        cy.fixture('user').then((users) => {
            const {user1} = users;
            cy.get('input[name=username]').type(user1.username);
            cy.get('input[name=password]').type(user1.password);
            cy.wait('#loginBtn').click();
            cy.url().should('include', '/home')
        });

        it('invalid username ', () => {
            cy.fixture('user').then((users) => {
                const {user1} = users;
                cy.get('input[name=username]').type('invalidusername');
                cy.get('input[name=password]').type(user1.password);
                cy.wait('#loginBtn').click();
                cy.get('error').should('contain', 'Could not find user')
            });

            it('invalid password ', () => {
                cy.fixture('user').then((users) => {
                    const {user1} = users;
                    cy.get('input[name=username]').type(user1.username);
                    cy.get('input[name=password]').type('invalidpassword');
                    cy.wait('#loginBtn').click();
                    cy.get('error').should('contain', 'Could not find user')

                });

                it('submit is disabled until login field is filled', () => {
                    cy.fixture('user').then((users) => {
                        const {user1} = users;
                        cy.get('input[name=username]').type(user1.username);
                        cy.get('input[name=password]').type(user1.password);
                        cy.get('input[name=password]').clear();
                        cy.get('#loginBtn').should('be.disabled');


                    });

                })
            });
        });
    });
});