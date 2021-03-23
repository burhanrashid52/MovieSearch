Movie Search
==

A webapp to search movies from [developer.themoviedb.com](https://developers.themoviedb.org) using React.js

![](http://i.imgur.com/s25hOBEh.gif)

## How to run the application
Get the [TMDB API key](https://developers.themoviedb.org/3/getting-started/introduction).

Set environment variable for api key using:
>`$ export REACT_APP_MOVIE_API_KEY={your_api_key}`

Start local dev server using:
>`$ npm start`

## Docker Image
You can also directly pull and image from docker and run locally.
```bash
docker run -d -it -p 3000:3000 burhanrashid52/movie-search YOUR_TMDB_API_KEY
```
 

This will start the application on http://localhost:3000
