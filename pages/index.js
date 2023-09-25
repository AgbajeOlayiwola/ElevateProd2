import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import HomeMain from './Auth/Signup';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-pro-sidebar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPage from './LandingPage';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MYSMEApp</title>
                <meta name="description" content="Powerd by Ecobank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingPage />
        </div>
    );
}
