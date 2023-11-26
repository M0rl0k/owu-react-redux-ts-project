import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieInterface, IMoviesRes} from "../../interfaces";
import {moviesService} from "../../services";

interface IState {
    movies: IMovieInterface[],
    total_pages: number
}

const getMovies = createAsyncThunk<IMoviesRes<IMovieInterface[]>, number>(
    'moviesSlice/getAll',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMovies(page)
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const getMoviesByGenre = createAsyncThunk<IMoviesRes<IMovieInterface[]>, {page:number, with_genres:string}>(
    'moviesSlice/getAll',
    async ({page, with_genres}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMoviesByGenre(page, with_genres)
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const searchByKeyWord = createAsyncThunk<IMoviesRes<IMovieInterface[]>, {page:number, query:string}>(
    'moviesSlice/getAll',
    async ({page, query}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.searchByKeyWord(query, page)
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState:IState = {
    movies: [],
    total_pages: null
}

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(getMoviesByGenre, getMovies, searchByKeyWord), (state, action) => {
                state.movies = action.payload.results
                state.total_pages = action.payload.total_pages
            })
})

const {reducer: moviesReducer, actions} = moviesSlice

const moviesActions = {
    ...actions,
    getMovies,
    getMoviesByGenre,
    searchByKeyWord
}

export {
    moviesActions,
    moviesReducer
}