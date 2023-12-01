import Head from 'next/head';
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from '../styles/Home.module.css';
import LandingPage from './LandingPage';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MYSMEApp</title>
                <meta name="description" content="Powerd by Ecobank" />
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhpfYGw58daK7Ci6HnizX2QkVBs7hfPpc&libraries=places"></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingPage />
        </div>
    );
}
