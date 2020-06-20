import React from 'react'
import {graphql} from 'gatsby'
import get from 'lodash/get'
import './blog.less';
import PostListItem from "../components/post-list-item";
import Layout from "../components/layout";

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const data = get(this, 'props.data')
        const posts = get(this, 'props.data.allContentfulBlogPost.edges')
        console.log(data);
        return (
            <Layout>
                <div className="blog-page">
                      <h1 className="blog-page__title">Все статьи</h1>
                      <div className="blog-page__container">
                        {posts.map(({node: post}) => {
                            console.log(post);
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
          publishDate(formatString: "MMMM Do, YYYY")
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
