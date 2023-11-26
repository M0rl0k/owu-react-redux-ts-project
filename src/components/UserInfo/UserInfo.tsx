import React from 'react';

import css from './UserInfo.module.css'

const UserInfo = () => {
    return (
        <div className={css.User}>
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="User logo"/>
            <div>
                Hello,
                <br/>
                <span>
                    User!
                </span>
            </div>
        </div>
    );
};

export {
    UserInfo
};