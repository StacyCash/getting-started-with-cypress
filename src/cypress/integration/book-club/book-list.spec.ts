context('Book List Tests', () => {
    beforeEach(function() {
        cy.server();
        cy.visit('https://cypresstest.z6.web.core.windows.net/');
        cy.fixture('book-club/book-list.json').as('bookList')
    });

    it('should load with a list of 3 books', function() {
        const bookListApi = 'https://cypresstestapi.azurewebsites.net/api/booklist';
        const book = this.bookList[this.bookList.length -1];
        const titleE2eId = `title-${book.title.toLowerCase().split(' ').join('-')}`;

        cy.route(bookListApi, '@bookList');
        cy.getByE2eId('link-to-booklist').click();
        cy.getByE2eId(titleE2eId).should('be.visible');
        cy.getByE2eId(titleE2eId).should('contain', book.title);
    });
});