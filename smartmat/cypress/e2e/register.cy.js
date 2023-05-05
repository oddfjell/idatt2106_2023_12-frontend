describe('Register', () => {

    it('Register components render in', () => {
        cy.visit("/register")
        cy.contains("Registrer");
        cy.contains("Brukernavn");
        cy.get('input[name=username]').should('be.visible');
        cy.contains("Passord");
        cy.get('input[name=password]').should('be.visible');
        cy.get('#registerBtn').should('be.visible');
        cy.get('#loginBtn').should('be.visible');
    })

    it('register user, add profile and redirects to home page', () => {
        cy.visit("/register")
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.get('input[name=username]').type(testRegisterUser.username);
            cy.get('input[name=password]').type(testRegisterUser.password);
            cy.get('#registerBtn').click();
            cy.get("#addProfile").find("#choose").click()
            cy.get("input[name=username]").type(testRegisterUser.username)
            cy.get("input[name=password]").type(testRegisterUser.password)
            cy.get("button[type=submit]").click()
            cy.contains(testRegisterUser.username)
            cy.get('#profile0').click()
            cy.get("input[type=password]").type(testRegisterUser.password)
            cy.get('button[type=submit]').click()
            cy.url().should('include', '/home')

        })
    });

    it('redirects to login at "Have an account? Login here!"', () => {
        cy.visit("/register")
        cy.get("#loginBtn").click();
        cy.url().should('not.include', '/register')
    })

    it('registration fail, no username', () => {
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.visit("/register")
            cy.get('input[name=username]').clear();
            cy.get('input[name=password]').type(testRegisterUser.password);
            cy.get('#registerBtn').click();
            cy.url().should('not.include', '/profile')

        })
    });

    it('registration fail, no password', () => {
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.visit("/")
            cy.get('input[name=username]').type(testRegisterUser.username);
            cy.get('input[name=password]').clear();
            cy.get('#registerBtn').click();
            cy.url().should('not.include', '/profile')

        })
    });
    it("can log in and delete existing account", () => {
        cy.fixture('user').then((users) => {
            const {testRegisterUser} = users;
            cy.visit("/");
            cy.get('input[name=username]').type(testRegisterUser.username);
            cy.get('input[name=password]').type(testRegisterUser.password);
            cy.get('#loginBtn').click();
            cy.get('#profile0').find('#choose').click()
            cy.get('input[type=password]').type(testRegisterUser.password)
            cy.get('button[type=submit]').click()
            cy.get('nav').contains('person').click();
            cy.get('#removeAccount').click();
            cy.on('window:confirm', () => {
            })
            cy.on('window:confirm', () => true)
            cy.visit('/');
            cy.fixture('user').then((users) => {
                const {testRegisterUser} = users;
                cy.get('input[name=username]').type(testRegisterUser.username);
                cy.get('input[name=password]').type(testRegisterUser.password);
                cy.get('#loginBtn').click();
                cy.url().should('not.include', '/profile')
            })
        })
    })
});
