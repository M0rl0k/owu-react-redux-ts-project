import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieDetails} from "../../interfaces/movieDetailsInterface";
import {IMovieCast} from "../../interfaces";
import {moviesService} from "../../services";

interface IState {
    movieDetails : IMovieDetails
    movieCast: IMovieCast
}

const getMovieDetailsById = createAsyncThunk<IMovieDetails, number>(
    'movieDetailsSlice/getMovieDetailsById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMovieDetailsById(id)
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const getMovieCastList = createAsyncThunk<IMovieCast, number>(
    'movieDetailsSlice/getMovieCastList',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMovieCastList(id)
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState:IState = {
    movieDetails : null,
    movieCast: null
}

const movieDetailsSlice = createSlice({
    name: 'movieDetailsSlice',
    initialState,
    reducers: {
        clearMovieDetails: (state => {
            state.movieDetails = null
            state.movieCast = null
        })
    },
    extraReducers: builder =>
        builder
            .addCase(getMovieDetailsById.fulfilled, (state, action) => {
                state.movieDetails = action.payload
            })
            .addCase(getMovieCastList.fulfilled, (state, action) => {
                state.movieCast = action.payload
            })
})

const {reducer: movieDetailsReducer, actions} = movieDetailsSlice

const movieDetailsActions = {
    ...actions,
    getMovieCastList,
    getMovieDetailsById
}

export  {
    movieDetailsActions,
    movieDetailsReducer
}