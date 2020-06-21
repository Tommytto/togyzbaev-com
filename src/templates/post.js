import React from 'react';
import './post.less'
import ArticleContent from "../components/article-content";
import Layout from "../components/layout";
import {graphql} from "gatsby";
import Breadcrumbs from "../components/breadcrumbs";

const Post = ({data}) => {
    const post = data.contentfulBlogPost;
    return (
        <Layout>
            <Breadcrumbs links={[
                {
                    to: '/',
                    title: 'Главная'
                },
                {
                    to: '/blog',
                    title: 'Блог'
                }
            ]}/>
            <div className="article-page">
                <div className="article-page__start">
                    <div className="article-page__title-wrapper">
                        <h1 className="article-page__title">
                            {post.title}
                        </h1>
                    </div>
                    <div className="article-page__hero">
                        <div className="article-page__hero-inner">
                            <img src={post.heroImage.fluid.src}
                                 className="article-page__hero-img"
                                 alt="hero"
                            />
                        </div>
                    </div>
                </div>
                <div className="article-page__body">
                    <ArticleContent content={post.body.childMarkdownRemark.html}/>
                </div>
            </div>
        </Layout>
    );
};

export default Post;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
