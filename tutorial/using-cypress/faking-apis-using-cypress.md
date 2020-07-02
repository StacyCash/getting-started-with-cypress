# Faking APIs using Cypress

## Why fake our APIs
Until now we have been using data that is sent from the server and checking it is correct.

This presents a couple of problems:

* It can be slow
* We are retesting things that have already been tested
* It's  hard to make deterministic tests using data that is calculated at the back end

But we can change that by faking our API calls and have them instead served from Cypress itself, with known data.

By doing this we are no longer testing the underlying API layers, and we have control over what we receive from the API so we know exactly what should be displayed see back on the screen.

## Testing our book list

The last test that we made for the sign in page took us to the list of books that we have in our book club.

Now we can test this page as well.

1. In the `cypress\integration\book-club` folder make a new file called `book-list.spec.ts`
2. Add this code to check what is displayed on the page

``` ts
context('Book List Tests', () => {
    beforeEach(function() {
        cy.visit('https://cypresstest.z6.web.core.windows.net/');
    });

    it('should load with a list of 3 books', function() {
        cy.getByE2eId('link-to-booklist').click();
        cy.getByE2eId('title-head-on').should('be.visible');
        cy.getByE2eId('title-head-on').should('contain', 'Head On');
    });
});
```

This will be our base test for faking the API

## Creating the fake API

Firstly we need to intercept the `route` so that we can replace the reponse with our own.

1. On the line before the `cy.visit(...)` call the `cy.server()` function
2. in the first line of the `it(...)` function specify the route that we want to capture

`cy.route('https://cypresstestapi.azurewebsites.net/api/booklist', '[{"title": "The End Of Mister Y","author": "Scarlett Thomas","genre": "Fantasy"}]');`

> Note: In our previous test we had to specify `'POST'` as the first parameter for route, in this example we do not need to specify the HTTP method because `'GET'` is the default

3. Update our tests to look for `title-the-end-of-mister-y`
4. Update our tests to check that the title is `The End Of Mister Y`
5. Rerun your tests

We now see that the list of books has dissapeared, and has been replaced by one single book, `The End Of Mister Y`

The complete test file should now look like:

``` ts
context('Book List Tests', () => {
    beforeEach(function() {
        cy.server();
        cy.visit('https://cypresstest.z6.web.core.windows.net/');
    });

    it('should load with a list of 3 books', function() {
        cy.route('https://cypresstestapi.azurewebsites.net/api/booklist', '[{"title": "The End Of Mister Y","author": "Scarlett Thomas","genre": "Fantasy"}]');
        cy.getByE2eId('link-to-booklist').click();
        cy.getByE2eId('title-the-end-of-mister-y').should('be.visible');
        cy.getByE2eId('title-the-end-of-mister-y').should('contain', 'The End Of Mister Y');
    });
});
```

We have successfully faked our API, but there are a lot of improvements that we can make!

### A bit of clean up

We'll start by introducing some variables to make the code more readable.

1. Move the API URL into a constant: `bookListApi`
2. Move the results into a constant: `bookListResponse`
3. As we u se it more than once, move the e2e id into a constant: `titleE2eId`

Our code should now look like:

``` ts
context('Book List Tests', () => {
    beforeEach(function() {
        cy.server();
        cy.visit('https://cypresstest.z6.web.core.windows.net/');
    });

    it('should load with a list of 3 books', function() {
        const bookListApi = 'https://cypresstestapi.azurewebsites.net/api/booklist';
        const bookListResponse = '[{"title": "The End Of Mister Y","author": "Scarlett Thomas","genre": "Fantasy"}]';
        const titleE2eId = 'title-the-end-of-mister-y';

        cy.route(bookListApi, bookListResponse);
        cy.getByE2eId('link-to-booklist').click();
        cy.getByE2eId(titleE2eId).should('be.visible');
        cy.getByE2eId(titleE2eId).should('contain', 'The End Of Mister Y');
    });
});
```

The code is now much more readable, and should we change the title, the e2e id only has to be updated once.
