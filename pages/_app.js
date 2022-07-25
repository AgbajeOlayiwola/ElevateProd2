import { Layout } from '../components';
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { wrapper, store } from '../redux/store';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';

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

    // const store = configureStore();
    return (
        <Layout>
            <AnimatePresence exitBeforeEnter>
                <motion.div key={router.route} {...pageMotionProps}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
}

export default wrapper.withRedux(MyApp);
