import React, {FC} from 'react';

import {posterURL} from "../../constants";
import css from './PosterPreview.module.css'

interface IProps {
    posterPath: string,
    alt: string
}

const PosterPreview:FC<IProps> = ({posterPath, alt}) => {
    return (
        <aside className={css.PosterPreview}>
            <img src={`${posterURL}${posterPath}`} alt={alt}/>
        </aside>
    );
};

export {
    PosterPreview
};