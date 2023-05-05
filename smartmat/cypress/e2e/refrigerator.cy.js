describe('Refrigerator', () => {
    beforeEach(() => {
        cy.fixture('user').then((users) => {
            const {testUser} = users;
            cy.visit("/")
            cy.get('input[name=username]').type(testUser.username);
            cy.get('input[name=password]').type(testUser.password);
            cy.get('#loginBtn').click();
            cy.contains("testUser")
            cy.get('#profile-card').click()
            cy.get('input[type=password]').type(testUser.password)
            cy.get('button[type=submit]').click()
            cy.visit("/home")
            cy.visit("/refrigerator")
        })
    });

    it('refrigerator renders ', () => {
        cy.contains("Kjøleskap");

    });

    it('can eat a grocery', () => {

        cy.get(".container").first().find("#count").then(($count) => {
            const beforeThrown = parseInt($count.text().replace("Antall: ", " "));
            console.log(beforeThrown)
            cy.get(".container").first().find("#eatBtn").click();
            cy.get('#grocery_grid').should('be.visible');
            cy.get(".container").first().find("#count").should(($updateCount) => {
                const afterThrown = parseInt($updateCount.text().replace("Antall: ", " "));
                console.log(afterThrown)
                expect(afterThrown).to.equal(beforeThrown - 1)
            })

        })

    })


    it('can throw away a grocery', () => {

        cy.get(".container").first().find("#count").then(($count1) => {
            const beforeThrown = parseInt($count1.text().replace("Antall: ", " "));
            console.log(beforeThrown)
            cy.get('.container').first().find('.throwModalBtn').click()
            cy.get('#throwSlider').invoke('val', 50).trigger('input')
            cy.get('#throwModalBtn').click()
            cy.get('#grocery_grid').should('be.visible');
            cy.get(".container").first().find("#count").should(($updateCount1) => {
                const afterThrown = parseInt($updateCount1.text().replace("Antall: ", " "));
                console.log(afterThrown)
                expect(afterThrown).to.equal(beforeThrown - 1)
            })

        })

    })
});