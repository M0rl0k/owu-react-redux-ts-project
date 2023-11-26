import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {GenreBadge} from "../GenreBadge";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './GenreList.module.css'
import {genresActions} from "../../redux/slices";


const GenreList = () => {

    const {isLight} = useAppSelector(state => state.theme)
    const {genres} = useAppSelector(state => state.genre)
    const dispatch = useAppDispatch();

    useEffect(()=> {
        dispatch(genresActions.getGenres())
    }, [])

    const navigate = useNavigate();

    const handleKey = (e:React.KeyboardEvent<HTMLSpanElement>):void => {
        if (e.key !== 'Enter') return
        navigate('/')
    }

    return (
        <nav className={`${css.GenreList} ${isLight ? css.light : ''}`}>
            <span
                tabIndex={0}
                onClick={()=> navigate('/')}
                onKeyDown={(e) => handleKey(e)}>All Movies</span>
            {genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
        </nav>
    );
};

export {
    GenreList
};