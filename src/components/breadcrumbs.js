import React from 'react';
import styles from './breadcrumbs.module.less'
import {Link} from "gatsby";

const Breadcrumbs = ({links}) => {
    return (
        <div className={styles.breadcrumbs}>
            {
                links.map(({title, to}, index) => {
                    return <React.Fragment key={index}><Link className={styles.link} to={to}>{title}</Link>{index === links.length - 1 ? '' : ' — '}</React.Fragment>
                })
            }
        </div>
    );
};

Breadcrumbs.INDEX = {
    to: '/',
    title: 'Главная'
};

Breadcrumbs.BLOG = {
    to: '/blog',
    title: 'Блог'
};

export default Breadcrumbs;
