import React, {useEffect} from 'react';

import css from './MoviesDetailsPage.module.css'
import {MovieInfo, PosterPreview} from "../components";
import {useAppDispatch, useAppLocation, useAppSelector} from "../hooks";
import {movieDetailsActions} from "../redux/slices";

const MoviesDetailsPage = () => {

    const {pathname} = useAppLocation<string>()
    const id = pathname.split('/')[2];
    const {isLight} = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const {movieDetails, movieCast} = useAppSelector(state => state.movieDetails)

    useEffect(()=> {
        dispatch(movieDetailsActions.getMovieDetailsById(+id))
        dispatch(movieDetailsActions.getMovieCastList(+id))
    }, [id])

    return (
        <section className={`${css.MoviesDetailsPage} ${isLight ? css.light : ''}`}>
            <div className={css.MoviesDetailsPageWrap}>
                {movieDetails && <PosterPreview posterPath={movieDetails.poster_path} alt={movieDetails.title}/>}
                {movieDetails && movieCast && <MovieInfo movieDetails={movieDetails} movieCast={movieCast}/>}
            </div>
        </section>
    );
};

export {MoviesDetailsPage};