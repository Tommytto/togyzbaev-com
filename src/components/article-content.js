import React from 'react';
import './article-content.less'

const ArticleContent = ({content}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: content}} className="article-content"/>

    );
};

export default ArticleContent;
