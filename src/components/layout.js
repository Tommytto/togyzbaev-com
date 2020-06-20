import React from 'react'
import './layout.less'
import BlogHeader from "./blog-header";

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
        <div>
        <BlogHeader />
        <main className="default-layout">
          {children}
        </main>
        </div>
    )
  }
}

export default Template
