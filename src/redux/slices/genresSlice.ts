import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenres} from "../../interfaces";
import {genresService} from "../../services";

interface IState {
    genres : IGenres []
}

const getGenres = createAsyncThunk<IGenres[], void>(
    'genresSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data: {genres}} = await genresService.getGenres()
            return genres
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState: IState = {
    genres : []
}

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {},
    extraReducers : builder =>
        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload
            })

})

const {reducer: genresReducer, actions} = genresSlice

const genresActions = {
    ...actions,
    getGenres
}

export {
    genresActions,
    genresReducer
}