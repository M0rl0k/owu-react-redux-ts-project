import React, {FC} from 'react';


import css from './GenreBadge.module.css'
import {IGenres} from "../../interfaces";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux/slices";

interface IProps {
    genre: IGenres
}

const GenreBadge: FC<IProps> = ({genre}) => {

    const {name, id} = genre

    const [query, setQuery] = useSearchParams({with_genre: ''})
    const dispatch = useAppDispatch()

    const handleKey = (e:React.KeyboardEvent<HTMLButtonElement>):void => {
      if (e.key !== 'Enter') return
        setQuery(prev => {
            prev.set('page', '1')
            prev.set('with_genre', `${id}`)
            dispatch(moviesActions.setKeyword(''))
            return prev
        })
    }
    const handleClick = ():void => {
        setQuery(prev => {
            prev.set('page', '1')
            prev.set('with_genre', `${id}`)
            prev.delete('search')
            dispatch(moviesActions.setKeyword(''))
            return prev
        })
    }

    const {isLight} = useAppSelector(state => state.theme)

    return (
        <button tabIndex={0} className={`${css.GenreBadge} ${isLight ? css.light : ''}
         ${query.get('with_genre') === genre.id.toString() ? css.active : ''}`}
           onClick={handleClick}
            onKeyDown={(e) => handleKey(e)}>
            {name}
        </button>
    );
};

export {
    GenreBadge
};