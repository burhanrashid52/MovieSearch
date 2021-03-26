import {render, waitForDomChange} from "@testing-library/react";
import React from "react";
import MovieOverview from "./index";
import {fetchDetails} from "../api";

jest.mock('../api');

const routeInfo = {
    params: {
        movieId: 123
    }
}

it('should loading initially', async () => {
    fetchDetails.mockReturnValue(new Promise(() => {
    }))
    const {container} = render(<MovieOverview match={routeInfo}/>)

    const imgElems = container.querySelectorAll('img');
    expect(imgElems[0].getAttribute('src')).toContain("loader.png");
    expect(imgElems[0].getAttribute('alt')).toBe("loading...");
})

it('should show details', async () => {
    const movieDetails = {
        title: 'Hello',
        overview: 'My Overview',
        tagline: 'Part of the journey is the end',
        genres: []
    };
    fetchDetails.mockReturnValue(Promise.resolve(movieDetails))
    const {queryByText} = render(<MovieOverview match={routeInfo}/>)
    await waitForDomChange()
    expect(queryByText(movieDetails.title)).toBeInTheDocument()
    expect(queryByText(movieDetails.tagline)).toBeInTheDocument()
    expect(queryByText(movieDetails.overview)).toBeInTheDocument()
})

it('should show genres', async () => {

    const movieDetails = {
        title: 'Hello',
        overview: 'My Overview',
        tagline: 'Part of the journey is the end',
        genres: ["Action", "Comedy"]
    };
    fetchDetails.mockReturnValue(Promise.resolve(movieDetails))
    const {queryByText} = render(<MovieOverview match={routeInfo}/>)
    await waitForDomChange()
    movieDetails.genres.forEach(value =>
        expect(queryByText(value)).toBeInTheDocument()
    )
})
