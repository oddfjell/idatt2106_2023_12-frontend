    describe('Register',()=>{
        beforeEach(()=>{
            cy.visit('/register');
        });

    it('register user ',() => {

        cy.fixture('register').then((users) => {
            const {user1} = users;
        cy.get('input[name=username]').type(user1.username);
        cy.get('input[name=password]').type(user1.password);
        cy.wait( '#registerBtn').click();
        cy.wait( '@registerUser').then(({response}) =>{
            expect(response.body.message).to.equal(  'input[name=username]')
        })
    });
    });

    it('register user ',() => {

            cy.fixture('register').then((users) => {
                const {user1} = users;
                cy.get('input[name=username]').type(user1.username);
                cy.get('input[name=password]').type(user1.password);
                cy.wait( '#registerBtn').click();
                cy.wait( '@registerUser').then(({response}) =>{
                    expect(response.body.message).to.equal(  'input[name=username]')
                })
            });
        });

        it(' ',() => {

            cy.fixture('register').then((users) => {
                const {user1} = users;
                cy.get('input[name=username]').type(user1.username);
                cy.get('input[name=password]').type(user1.password);
                cy.wait( '#registerBtn').click();
                cy.wait( '@registerUser').then(({response}) =>{
                    expect(response.body.message).to.equal(  'input[name=username]')
                })
            });
        });

    })