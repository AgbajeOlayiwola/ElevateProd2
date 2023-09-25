import React from 'react';
import Nav from '../../components/layout/LandingPageCompoenets/Nav';
import HeroSection from '../../components/layout/LandingPageCompoenets/HeroSection';
import ImporveSection from '../../components/layout/LandingPageCompoenets/improve';
import DownloadSect from '../../components/layout/LandingPageCompoenets/DownloadSect';
import Footer from '../../components/layout/LandingPageCompoenets/footer';

const LandingPage = () => {
    return (
        <div>
            <Nav />
            <HeroSection />
            <ImporveSection />
            <DownloadSect />
            <Footer />
        </div>
    );
};

export default LandingPage;
