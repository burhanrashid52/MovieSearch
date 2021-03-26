const TMBD_URL = "https://api.themoviedb.org/3"
const BASE_URL = Cypress.config().baseUrl


describe('Movie Details', () => {

    beforeEach(() => {
        cy.visit(BASE_URL)
        cy.intercept(
            {
                method: 'GET',
                url: TMBD_URL + '/search/*',
            },
            {fixture: 'movie-result.json'}
        )

        cy.intercept(
            {
                method: 'GET',
                url: TMBD_URL + '/movie/315635',
            },
            {fixture: 'movie-details-315635.json'}
        )
    })

    it('Search Spiderman and show first details ', () => {


        cy.get('input')
            .type('Spiderman')
            .type('{enter}');

        cy.get('input').should('have.value', 'Spiderman')

        cy.url().should('eq', BASE_URL + '/search?query=Spiderman');

        cy.wait(1000)
        cy.contains('Spider-Man: Homecoming').click()

        cy.url().should('eq', BASE_URL + '/movie/315635');

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

describe('Show Error', () => {

    beforeEach(() => {
        cy.visit(BASE_URL)
    })

    it('Search Result Error ', () => {
        cy.intercept(
            {
                method: 'GET',
                url: TMBD_URL + '/search/*',
            },
            []
        )

        cy.get('input')
            .type('Spiderman')
            .type('{enter}');
        cy.contains('Something went wrong')
    })

    it('Movie Detail Error ', () => {

        cy.intercept(
            {
                method: 'GET',
                url: TMBD_URL + '/search/*',
            },
            {fixture: 'movie-result.json'}
        )
        cy.intercept(
            {
                method: 'GET',
                url: TMBD_URL + '/movie/315635',
            },
            []
        )

        cy.get('input')
            .type('Spiderman')
            .type('{enter}');

        cy.contains('Spider-Man: Homecoming').click()

        cy.contains('Something went wrong')
    })
})
