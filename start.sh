#!/bin/sh

echo $1
export REACT_APP_MOVIE_API_KEY="$1"
npm start
