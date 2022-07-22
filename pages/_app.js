import { Layout } from '../components';
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import store from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps, router }) {
    const pageVariants = {
        pageInitial: {
            backgroundColor: 'black',
            opacity: 0
        },
        pageAnimate: {
            backgroundColor: 'transparent',
            filter: ``,
            opacity: 1
        },
        pageExit: {
            backgroundColor: 'none',
            opacity: 0
        }
    };
    const pageMotionProps = {
        initial: 'pageInitial',
        animate: 'pageAnimate',
        exit: 'pageExit',
        variants: pageVariants
    };
    return (
        // <Provider store={store}>
        <Layout>
            <AnimatePresence exitBeforeEnter>
                <motion.div key={router.route} {...pageMotionProps}>
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </Layout>
        /* </Provider> */
    );
}

export default MyApp;
