import {useState, useEffect} from 'react';
import {fetchDetails, fetchMovies} from '../api';

export function useMovieSearchApi(defaultQuery) {
    const [movieState, setMovieState] = useState([]);
    const [query, setQuery] = useState(defaultQuery);

    const handleError = (error) => {
        setMovieState({loading: false, movies: [], error: "Something went wrong"});
    };

    const searchMovies = (searchText) => setQuery(searchText);

    useEffect(() => {
        if (query) {
            setMovieState({loading: true, movies: []});
            fetchMovies(query)
                .then(movies => {
                    setMovieState({loading: false, movies});
                }).catch(handleError);
        } else {
            setMovieState({loading: false, movies: []})
        }
    }, [query]);

    return [movieState, searchMovies];
}

export function useMovieDetailsApi(movieId) {
    const [movieState, setMovieState] = useState([]);

    const handleError = (error) => {
        setMovieState({loading: false, movieDetails: null, error: error.message});
    };

    useEffect(() => {
        if (movieId) {
            setMovieState({loading: true, movieDetails: null});
            fetchDetails(movieId)
                .then(movieDetails => {
                    const myObject = {loading: false, movieDetails: movieDetails}
                    setMovieState(myObject);
                }).catch(handleError);
        } else {
            setMovieState({loading: false, movieDetails: null})
        }
    }, [movieId]);

    return [movieState, movieId];
}
