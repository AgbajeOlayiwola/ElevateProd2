import React from 'react';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
