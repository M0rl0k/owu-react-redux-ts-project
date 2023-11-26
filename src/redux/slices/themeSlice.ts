import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLight: false
}

const themeSlice = createSlice({
    name : 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state) => {
            state.isLight = !state.isLight
        }
    }
})

const {reducer : themeReducer, actions} = themeSlice

const themeActions = {
    ...actions
}

export {
    themeActions,
    themeReducer
}