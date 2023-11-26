import {configureStore} from "@reduxjs/toolkit";

import {genresReducer, movieDetailsReducer, moviesReducer, themeReducer} from "./slices";

const store = configureStore({
    reducer: {
        theme : themeReducer,
        genre: genresReducer,
        movieDetails: movieDetailsReducer,
        movie: moviesReducer
    }
})

export {
    store
}