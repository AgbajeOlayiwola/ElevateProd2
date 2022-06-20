import { Layout } from '../components';
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';

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
        <Layout>
            <AnimatePresence exitBeforeEnter>
                <motion.div key={router.route} {...pageMotionProps}>
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
}

export default MyApp;
