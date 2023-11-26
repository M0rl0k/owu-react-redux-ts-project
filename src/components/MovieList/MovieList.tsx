import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";


import css from './MovieList.module.css'
import {MovieListCard} from "../MovieListCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux/slices";


const MovieList= () => {

    const {isLight} = useAppSelector(state => state.theme)
    const {movies, total_pages} = useAppSelector(state => state.movie)
    const [query, setQuery] = useSearchParams({page: '1'})
    const [value, setInputValue] = useState<string>('')
    const isNext = +query.get('page') === total_pages
    const isPrev = +query.get('page') > 1;

    const dispatch = useAppDispatch()

    useEffect(()=> {
        if (value) {
            dispatch(moviesActions.searchByKeyWord({
                page: +query.get('page'),
                query: value
            }))
            return
        }

        if (query.get('with_genre')) {
            dispatch(moviesActions.getMoviesByGenre({
                page: +query.get('page'),
                with_genres: query.get('with_genre')
            }))
            return
        }

        if (!query.get('with_genre') && !value) {
            dispatch(moviesActions.getMovies(+query.get('page')))
            return;
        }
    }, [query, value])

    const prevPage = () => {
        setQuery(prev => {
            prev.set('page', `${+prev.get('page') - 1}`)
            return prev
        })
    }

    const nextPage = () => {
        setQuery(prev => {
            prev.set('page', `${+prev.get('page') + 1}`)
            return prev
        })
    }

    const startSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery((prev => {
            prev.set('page' , '1')
            return prev
        }))
        setInputValue(e.target.value)
    }

    return (
        <section className={css.WrapMovieList}>
            <div className={css.MovieListSearch}>
                <input type="text"
                       placeholder={'Type to search...'}
                       value={value}
                       onChange={(e) => startSearch(e)}
                       className={isLight ? css.light : ''}
                />
                <button
                    disabled={!value}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className={css.MovieList}>
                {movies.map(movie => <MovieListCard movie={movie} key={movie.id}/>)}
            </div>
            <div className={`${css.Pagination} ${isLight ? css.light : ''}`}>
                <button onClick={prevPage} disabled={!isPrev}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                {query.get('page')}
                <button onClick={nextPage} disabled={isNext}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </section>

    );
};

export {
    MovieList
};