import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import HomeMain from './Home';
import 'react-pro-sidebar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ellevate</title>

                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeMain />
        </div>
    );
}
