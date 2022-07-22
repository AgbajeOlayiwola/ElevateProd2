import { Layout } from '../components';
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { wrapper, store } from '../redux/store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import countryReducer from '../redux/reducers/country.reducer';

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

    const store = createStore(countryReducer);
    return (
        <Layout>
            <AnimatePresence exitBeforeEnter>
                <Provider store={store}>
                    {/* <motion.div key={router.route} {...pageMotionProps}> */}
                    <Component {...pageProps} />
                    {/* </motion.div> */}
                </Provider>
            </AnimatePresence>
        </Layout>
    );
}

export default wrapper.withRedux(MyApp);
