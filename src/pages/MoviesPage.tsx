import React from 'react';


import {GenreList, MovieList} from "../components";
import css from './MoviesPage.module.css'
import {useAppSelector} from "../hooks";


const MoviesPage = () => {


    const {isLight} = useAppSelector(state => state.theme)

    return (
        <section className={`${css.MoviePage} ${isLight ? css.light : ''}`}>
            <div className={css.MoviePageWrap}>
                <GenreList/>
                <MovieList/>
            </div>
        </section>
    );
};

export {MoviesPage};