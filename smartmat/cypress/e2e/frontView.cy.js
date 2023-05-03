describe('FrontView', () => {
    beforeEach(() => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.visit("/home")
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.contains("testUser")
            cy.get('#profile-card').click()
            cy.get('input[type=password]').type(testUser.password)
            cy.get('button[type=submit]').click()
        })
    });

    it('router links work correctly', () => {

        cy.get('#outer-border').find('a').should('have.length', 3).each(($link) => {
            const href = $link.attr('href'); // Get the href attribute of the link
            cy.visit(href); // Click the link
            cy.url().should('include', href); // Check that the URL includes the href value
          });
    });

    it('shows statistics properly', () =>{
        cy.get("#graphGrid").find('canvas').should('have.length', 2)
    })
});