import React, { useRef, useEffect } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    });
    console.log(myref);
    return (
        <div ref={myref}>
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
