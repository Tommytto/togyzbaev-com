import React from 'react';
import './post-list-item.less'
import {Link} from 'gatsby'

const PostListItem = ({post}) => {
    return (
        <Link to={"/blog/" + post.slug} className="link">
            <article className="post-list-item">
                <div className="post-list-item__bullet"/>
                <div>
                    <h2 className="post-list-item__title">{post.title}</h2>
                    <div dangerouslySetInnerHTML={{
                        __html: post.description.childMarkdownRemark.html,
                    }} className="post-list-item__preview-text"/>
                    <footer className="post-list-item__footer">
                      <span className="post-list-item__footer-item">
                          {post.createdAt}
                      </span>
                      {/*<span className="post-list-item__footer-item">*/}
                      {/*  Читать: {post.readTime} минут*/}
                      {/*</span>*/}
                    </footer>
                </div>
            </article>
        </Link>
    );
};

export default PostListItem;
