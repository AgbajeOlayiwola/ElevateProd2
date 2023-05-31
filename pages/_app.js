import { Layout } from '../components';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';

import { AnimatePresence, motion } from 'framer-motion';
import { wrapper, store } from '../store';
import { Provider } from 'react-redux';
import DashLayout from '../components/layout/Dashboard';

function MyApp({ Component, pageProps, router }) {
    const variants = {
        hidden: { background: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -200 }
    };
    const [previous, setPrevious] = useState();
    if (
        typeof window !== 'undefined' &&
        typeof window.navigator !== 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.userAgent
    ) {
        const disableDevtool = require('disable-devtool');
        disableDevtool();
    }

    // const pageMotionProps = {
    //     initial: 'pageInitial',
    //     animate: 'pageAnimate',
    //     exit: 'pageExit',
    //     variants: pageVariants
    // };

    // const store = configureStore();
    return (
        // <Layout>
        <Provider store={store}>
            <DashLayout>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={router.route}
                        variants={variants} // Pass the variant object into Framer Motion
                        initial="hidden" // Set the initial state to variants.hidden
                        animate="enter" // Animated state to variants.enter
                        exit="exit" // Exit state (used later) to variants.exit
                        transition={{ type: 'linear' }} // Set the transition to linear
                        className=""
                    >
                        <Component {...pageProps} />
                    </motion.div>
                </AnimatePresence>
            </DashLayout>
        </Provider>
        // </Layout>
    );
}

export default MyApp;
