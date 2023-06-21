import { Layout } from '../components';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';

import { AnimatePresence, motion } from 'framer-motion';
import { wrapper, store } from '../store';
import { Provider } from 'react-redux';
import DashLayout from '../components/layout/Dashboard';
import { useRouter } from 'next/router';
import Loader from '../components/ReusableComponents/Loader';
import socialdata from '../components/ReusableComponents/Lotties/loading.json';
import Lottie from 'react-lottie';

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
        const handleStart = (url) => (
            url !== router.asPath && setLoaded(true), console.log('started')
        );
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

function MyApp({ Component, pageProps, router }) {
    const variants = {
        hidden: { background: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -200 }
    };
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
            <Provider store={store}>
                <DashLayout>
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
            </Provider>
        </>
        // </Layout>
    );
}

export default MyApp;
