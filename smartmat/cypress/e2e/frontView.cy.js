describe('FrontView', () => {
    beforeEach(() => {
        cy.visit("/home")
        cy.get('input[name=username]').type("jonas");
        cy.get('input[name=password]').type("jonas");
        cy.get('#loginBtn').click();
    });

    it('router links work correctly', () => {
        cy.get('#outer-border').find('a').each(($link) => {
            const href = $link.attr('href'); // Get the href attribute of the link
            cy.visit(href); // Click the link
            cy.url().should('include', href); // Check that the URL includes the href value
          });
    });
});