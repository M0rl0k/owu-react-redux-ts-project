import React from 'react';
import {useNavigate} from "react-router-dom";

import {UserInfo} from "../UserInfo";
import {ThemeSwitcher} from "../ThemeSwitcher";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './Header.module.css'
import {moviesActions} from "../../redux/slices";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const goHome = () => {
        dispatch(moviesActions.setKeyword(''))
        navigate('/')
    }

    const {isLight} = useAppSelector(state => state.theme)

    return (
        <header className={`${css.Header} ${isLight ? css.light : ''}`}>
            <div className={css.HeaderContainer}>
                <div className={css.HeaderContainerLeft}>
                    <span onClick={goHome}>TEKA</span>
                    <ThemeSwitcher/>
                </div>
                <div className={css.HeaderContainerRight}>
                    <UserInfo/>
                </div>
            </div>
        </header>
    );
};

export {
    Header
};