import React from 'react';
import {fireEvent, render, waitForDomChange} from '@testing-library/react';
import {fetchMovies} from '../api';
import Home from './Home';
import {MemoryRouter} from "react-router-dom";
import App from "../App";

jest.mock('../api');

it('should not show loader by default', async () => {
    const {queryByText} = render(<Home/>)

    expect(queryByText('Loading...')).toBeNull();
})

it('should not show any movie by default', async () => {
    const {queryAllByTitle} = render(<Home/>)

    expect(queryAllByTitle('movie').length).toBe(0);
})

it('should show error', async () => {

    const {container, getByText} = render(<MemoryRouter initialentries={['/']}>
        <App/>
    </MemoryRouter>)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    fetchMovies.mockReturnValue(Promise.reject({message: 'test error'}));

    fireEvent.change(searchInput, {target: {value: 'Avengers'}})
    fireEvent.keyPress(searchInput, {key: "Enter", code: 13, charCode: 13});
    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    await waitForDomChange();
    expect(getByText('Something went wrong')).toBeInTheDocument();
})

it('should show loader while loading movies', async () => {
    const {container} = render(<MemoryRouter initialentries={['/']}>
        <App/>
    </MemoryRouter>)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    fetchMovies.mockReturnValue(new Promise(() => {
    }));

    fireEvent.change(searchInput, {target: {value: 'Avengers'}})
    fireEvent.keyPress(searchInput, {key: "Enter", code: 13, charCode: 13});
    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    const imgElems = container.querySelectorAll('img');
    expect(imgElems[0].getAttribute('src')).toContain("loader.png");
    expect(imgElems[0].getAttribute('alt')).toBe("loading...");
})

it('should show movies returned from api', async () => {
    const {container, queryAllByTitle, getByText} = render(<MemoryRouter initialentries={['/']}>
        <App/>
    </MemoryRouter>)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    const movies = [
        {id: 1, title: 'Avengers 1'},
        {id: 2, title: 'Avengers 2'}
    ]
    fetchMovies.mockReturnValue(Promise.resolve(movies));

    fireEvent.change(searchInput, {target: {value: 'Avengers'}})
    fireEvent.keyPress(searchInput, {key: "Enter", code: 13, charCode: 13});

    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    await waitForDomChange()
    const movieElems = queryAllByTitle('movie');
    expect(movieElems.length).toBe(2);

    expect(getByText(movies[0].title)).toBeInTheDocument();
    expect(getByText(movies[1].title)).toBeInTheDocument();

})
