import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import socialdata from '../components/ReusableComponents/Lotties/loading.json';
import DashLayout from '../components/layout/Dashboard';
import '../styles/globals.css';
// import persistStore from 'redux-persist/es/persistStore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Providers } from '../redux/provider';
import { persistor } from '../redux/provider/store';
const LoadingScreen = () => {
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const handleStart = (url) => url !== router.asPath && setLoaded(true);

        const handleComplete = (url) =>
            url === router.asPath && setLoaded(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    return (
        loaded && (
            <div
                className={
                    router.pathname.includes('Admin')
                        ? 'spinnerWrapper'
                        : 'otherSpinnerWrapper'
                }
            >
                <Lottie options={socialOptions} height={200} width={200} />
            </div>
        )
    );
};
// let persistor = persistStore(store);

function MyApp({ Component, pageProps, router }) {
    const variants = {
        hidden: { background: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -200 }
    };
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            offset: 200 // Offset (in pixels) from the original trigger point
        });
    }, []);
    const [previous, setPrevious] = useState();

    // if (
    //     typeof window !== 'undefined' &&
    //     typeof window.navigator !== 'undefined' &&
    //     typeof navigator !== 'undefined' &&
    //     navigator.userAgent
    // ) {
    //     const disableDevtool = require('disable-devtool');
    //     disableDevtool();
    // }

    // const pageMotionProps = {
    //     initial: 'pageInitial',
    //     animate: 'pageAnimate',
    //     exit: 'pageExit',
    //     variants: pageVariants
    // };

    // const store = configureStore();

    return (
        // <Layout>
        <>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhpfYGw58daK7Ci6HnizX2QkVBs7hfPpc&libraries=places"></script>
            <Providers>
                <PersistGate loading={null} persistor={persistor}>
                    <DashLayout
                        page={
                            router.asPath === '/Admin/CreateStorefront'
                                ? 'Create Storefront'
                                : null
                        }
                    >
                        {/* <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={router.route}
                            variants={variants} // Pass the variant object into Framer Motion
                            initial="hidden" // Set the initial state to variants.hidden
                            animate="enter" // Animated state to variants.enter
                            exit="exit" // Exit state (used later) to variants.exit
                            transition={{ type: 'linear' }} // Set the transition to linear
                            className=""
                        > */}
                        {router.pathname.includes('Admin') ? (
                            <LoadingScreen />
                        ) : null}

                        <Component {...pageProps} />
                        {/* </motion.div>
                    </AnimatePresence> */}
                    </DashLayout>
                </PersistGate>
            </Providers>
        </>
        // </Layout>
    );
}

export default MyApp;
