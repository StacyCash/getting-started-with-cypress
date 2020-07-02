context('Book Club Signup', () => {
    beforeEach(() => {
        cy.server();
        cy.visit('https://cypresstest.z6.web.core.windows.net/')
        cy.fixture('book-club/donna-noble.json').as('person')
    });

    it('should allow data to be filled in, submitted and check the response', function () {
        cy.fillByE2eId('name', this.person.name);
        cy.fillByE2eId('email', this.person.email);
        cy.fillByE2eId('genre', this.person.genre);

        cy.route("POST", 'https://cypresstestapi.azurewebsites.net/api/bookclubsignup').as('SignUpApi');

        cy.getByE2eId('submit').click();
        cy.wait('@SignUpApi')

        cy.getByE2eId('feedback0').should('contain', this.person.name);
    })

    it('should navugate to all the books', () => {
        cy.getByE2eId('link-to-booklist').click();
        cy.location('pathname').should('eq', '/book-list');
    });
});