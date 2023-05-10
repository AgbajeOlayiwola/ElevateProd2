import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import animationData from '../../ReusableComponents/Lotties/transfer.json';
const Transfer = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const [width, setWidth] = useState(991);

    const [height, setHeight] = useState(0);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };
    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    return (
        <div className={styles.accountInfo}>
            <Lottie
                options={defaultOptions}
                height={width > 990 ? 500 : 200}
                width={width > 990 ? 500 : 200}
            />{' '}
            <div>
                <p>Account Number:</p>
                <p>1234567890</p>
            </div>
            <div>
                <p>Account Name:</p>
                <p>1234567890</p>
            </div>
            <div>
                <p>Bank Name:</p>
                <p>1234567890</p>
            </div>
            <div>
                <p>Ammount:</p>
                <p>1234567890</p>
            </div>
        </div>
    );
};

export default Transfer;
