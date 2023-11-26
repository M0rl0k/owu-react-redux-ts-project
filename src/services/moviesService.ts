import {axiosService} from "./axiosService";

import {urls} from "../constants";
import {IRes} from "../types";
import {IMovieCast, IMovieInterface, IMoviesRes} from "../interfaces";
import {IMovieDetails} from "../interfaces/movieDetailsInterface";

const moviesService = {
    getMovies: (page= 1): IRes<IMoviesRes<IMovieInterface[]>> => axiosService.get(urls.movies.movies, {params: {page}}),
    getMovieDetailsById: (id:number): IRes<IMovieDetails> => axiosService.get(urls.movies.byId(id)),
    searchByKeyWord: (query:string, page= 1): IRes<IMoviesRes<IMovieInterface[]>> => axiosService.get(urls.search, {params: {query, page}}),
    getMoviesByGenre: (page:number, with_genres:string): IRes<IMoviesRes<IMovieInterface[]>> => axiosService.get(urls.movies.movies, {params: {page, with_genres}}),
    getMovieCastList: (movieId: number) : IRes<IMovieCast> => axiosService.get(urls.movies.castById(movieId))
}


export {
    moviesService
}