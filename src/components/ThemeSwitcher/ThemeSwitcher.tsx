import React, {useState} from 'react';


import css from './ThemeSwitcher.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {themeActions} from "../../redux/slices";
const ThemeSwitcher = () => {

    const [isOn, setIsOn] = useState<boolean>(false);
    const body = document.body

    const {isLight} = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    const handleSwitch = () => {
        setIsOn(!isOn);
        dispatch(themeActions.setTheme())
        body.classList.toggle('light')
    };

    return (
        <div className={css.ThemeSwitcher}>
            <input
                type="checkbox"
                className={css.Checkbox}
                id="themeSwitch"
                checked={isOn}
                onChange={handleSwitch}
            />
            <label className={css.Switch} htmlFor="themeSwitch">
                <span className={`${css.Slider} ${isOn? css.on : css.off} ${isLight ? css.light : ''}`}></span>
            </label>
        </div>
    );
};

export {
    ThemeSwitcher
};