import {IRes} from "../types";
import {IGenres, IGenresRes} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const genresService = {
    getGenres: ():IRes<IGenresRes<IGenres>> => axiosService.get(urls.genres)
}

export {
    genresService
}