import React from "react";
import {useMovieDetailsApi} from "../hooks/movies";
import Loader from "../components/Loader";
import Error from "../components/Error";
import './Overview.css'

const MovieOverview = ({match}) => {
    const [{loading, movieDetails}] = useMovieDetailsApi(match.params.movieId)
    if (loading) {
        return <Loader/>
    }
    if (movieDetails) {
        return <div className="details-container">
            <img alt={movieDetails.title} src={movieDetails.posterUrl}/>
            <div className="item-details">
                <h1>{movieDetails.title}</h1>
                <h3>{movieDetails.tagline}</h3>
                <p>{movieDetails.overview}</p>
                <Genres items={movieDetails.genres}/>
            </div>
        </div>
    }
    return <Error error="Something went wrong."/>
}

const Genres = (props) => {
    return <ul>{props.items.map((name, i) => <li key={i}>{name}</li>)}</ul>
}

export default MovieOverview
