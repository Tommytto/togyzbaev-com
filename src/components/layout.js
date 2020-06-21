import React from 'react'
import './layout.less'
import Header from "./header";

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <main className="default-layout">
                {children}
            </main>
        </div>
    );
};

export default Layout;
