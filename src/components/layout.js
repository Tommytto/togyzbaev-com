import React from 'react'
import './layout.less'
import Header from "./header";

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
        <div>
        <Header />
        <main className="default-layout">
          {children}
        </main>
        </div>
    )
  }
}

export default Template
