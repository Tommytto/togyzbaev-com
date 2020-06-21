import React from 'react'
import {graphql} from 'gatsby'
import get from 'lodash/get'
import '../components/blog/index.less';
import PostListItem from "../components/post-list-item";
import Layout from "../components/layout";
import Breadcrumbs from "../components/breadcrumbs";

class BlogIndex extends React.Component {
    render() {
        const posts = get(this, 'props.data.allContentfulBlogPost.edges');

        return (
            <Layout>
                <Breadcrumbs links={[
                    Breadcrumbs.INDEX,
                ]}/>
                <div className="blog-page">
                    <h1 className="blog-page__title">Все статьи</h1>
                    <div className="blog-page__container">
                        {posts.map(({node: post}) => {
                            return <div key={post.slug} className="blog-page__post-list-item"><PostListItem post={post}/></div>
                        })}
                    </div>
                </div>
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "DD.MM.YY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
