import React, {FC} from 'react';

import {IMovieDetails} from "../../interfaces/movieDetailsInterface";
import css from './MovieInfo.module.css'
import {StarsRating} from "../StarsRating";
import {useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {IMovieCast} from "../../interfaces";

interface IProps {
    movieDetails: IMovieDetails
    movieCast: IMovieCast
}

const MovieInfo:FC<IProps> = ({movieDetails, movieCast}) => {

    const mainActors = movieCast.cast
        .filter(actor => actor.known_for_department === 'Acting')
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 9);

    const {
        title,
        vote_average,
        genres,
        overview,
        production_countries,
        release_date,
        runtime,
        adult,
        tagline
    } = movieDetails

    const {isLight} = useAppSelector(state => state.theme)

    const navigate = useNavigate()

    return (
        <article className={`${css.MovieInfo} ${isLight ? css.light : ''}`}>
            <h2 className={css.MovieInfoHeading}>{title.toUpperCase()}</h2>
            <div className={css.MovieInfoTop}>
                <i className={`fa-solid fa-angles-left ${css.Arrow}`} onClick={() => navigate(-1)}></i>
                <div className={css.MovieInfoRelease}>
                    <p>{release_date}</p>
                    <p><span>|</span></p>
                    <div className={css.MovieInfoReleaseGenres}>
                        {genres.map(genre => <p className={css.MovieInfoReleaseGenre} key={genre.id}>{genre.name}</p>)}
                    </div>
                </div>
                <p>{tagline}</p>
                <div className={css.MovieInfoRating}>
                    <StarsRating initialValue={Math.round(vote_average)} readonly={true} allowFraction={true} size={20} showTooltip={false}/>
                </div>
            </div>
            <div className={css.MovieInfoMiddle}>
                <div className={css.MovieInfoBlock}>
                    <h3 className={css.MovieInfoBlockHeading}>
                        The Story
                    </h3>
                    <p className={css.MovieInfoBlockText}>
                        {overview}
                    </p>
                </div>
                <div className={css.MovieInfoBlock}>
                    <h3 className={css.MovieInfoBlockHeading}>
                        Main Cast
                    </h3>
                    <div className={css.MovieInfoBlockCast}>
                        {mainActors
                            .map(actor =>
                                <p key={actor.id}>{actor.name}</p>)
                        } and others..
                    </div>
                </div>
            </div>
            <div className={css.MovieInfoBottom}>
                {adult ? <p className={css.MovieInfoBottomBlock}>18+</p> : <p className={css.MovieInfoBottomBlock}>6+</p>}
                <p className={css.MovieInfoBottomBlock}>{runtime} min</p>
                {production_countries.map((country, index) => <p className={css.MovieInfoBottomBlock} key={index}>{country.name}</p>)}
            </div>
        </article>
    );
};

export {
    MovieInfo
};