const baseURL = 'https://api.themoviedb.org/3';
const posterURL = 'https://image.tmdb.org/t/p/w500/';

const movies = '/discover/movie';
const genres = '/genre/movie/list';
const search = '/search/movie';

const urls = {
    movies: {
        movies,
        byId: (id:number):string => `/movie/${id}`,
        castById : (id:number): string => `/movie/${id}/credits`
    },
    genres,
    search
}

export {
    baseURL,
    posterURL,
    urls
}