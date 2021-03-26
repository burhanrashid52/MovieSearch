import React from 'react';
import { render } from '@testing-library/react';
import Movies from '.';

const movies = [
    { id: 1, title: 'Movie 1', description: 'Test Description 1', imageUrl: 'test1.jpg' },
    { id: 2, title: 'Movie 2', description: 'Test Description 2', imageUrl: 'test2.jpg' }
]

it('should render one movie', () => {
    const {getByText } = render(<Movies movies={movies} />)

    expect(getByText(movies[0].title)).toBeInTheDocument();
})

it('should render multiple movies', () => {
    const {getByText } = render(<Movies movies={movies} />)
    expect(getByText(movies[0].title)).toBeInTheDocument();
    expect(getByText(movies[1].title)).toBeInTheDocument();
})

it('should render movie image', () => {
    const { container, getByText } = render(<Movies movies={movies} />)

    const imgElems = container.querySelectorAll('img');
    expect(imgElems[0].getAttribute('src')).toBe(movies[0].imageUrl);
    expect(imgElems[1].getAttribute('src')).toBe(movies[1].imageUrl);
})
