describe('Movie Details', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.intercept(
            {
                method: 'GET', // Route all GET requests
                url: 'https://api.themoviedb.org/3/search/*', // that have a URL that matches '/users/*'
            },
            {fixture: 'movie-result.json'} // and force the response to be: []
        )

        cy.intercept(
            {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/315635',
            },
            {fixture: 'movie-details-315635.json'}
        )
    })

    it('Search Spiderman and show first details ', () => {

        cy.get('input')
            .type('Spiderman')
            .type('{enter}');

        cy.get('input').should('have.value', 'Spiderman')

        cy.url().should('eq', 'http://localhost:3000/search?query=Spiderman');

        cy.wait(1000)
        cy.contains('Spider-Man: Homecoming').click()

        cy.url().should('eq', 'http://localhost:3000/movie/315635');

        cy.fixture('movie-details-315635.json').then((movieDetails) => {
            cy.contains(movieDetails.title)
            cy.contains(movieDetails.tagline)
            cy.contains(movieDetails.overview)
            for (let i = 0; i < movieDetails.genres.length; i++) {
                cy.contains(movieDetails.genres[i].name)
            }
        });
    })
})
