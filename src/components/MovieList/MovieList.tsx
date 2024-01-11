import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";


import {MovieListCard} from "../MovieListCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux/slices";
import css from './MovieList.module.css'


const MovieList= () => {

    const {isLight} = useAppSelector(state => state.theme)
    const {movies, total_pages, keyword} = useAppSelector(state => state.movie)
    const [query, setQuery] = useSearchParams({page: '1'})
    const isNext = +query.get('page') === total_pages
    const isPrev = +query.get('page') > 1;

    const dispatch = useAppDispatch()

    useEffect(()=> {
        if (keyword) {
            dispatch(moviesActions.searchByKeyWord({
                page: +query.get('page'),
                query: keyword
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

        if (!query.get('with_genre') && !keyword) {
            dispatch(moviesActions.getMovies(+query.get('page')))
            return;
        }
    }, [query, keyword, dispatch])

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
            prev.set('search', e.target.value)
            prev.delete('with_genre')
            return prev
        }))
        dispatch(moviesActions.setKeyword(e.target.value))
    }

    return (
        <section className={css.WrapMovieList}>
            <div className={css.MovieListSearch}>
                <input type="text"
                       placeholder={'Type to search...'}
                       value={keyword}
                       onChange={(e) => startSearch(e)}
                       className={isLight ? css.light : ''}
                />
                <button
                    disabled={!keyword}>
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