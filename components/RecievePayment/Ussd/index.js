import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import animationData from '../../ReusableComponents/Lotties/call.json';
const USSDInput = () => {
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
        <div className={styles.paylinkInut}>
            <Lottie
                options={defaultOptions}
                height={width > 990 ? 500 : 200}
                width={width > 990 ? 500 : 200}
            />
            <button type="tel">*303*238473*2000#</button>
        </div>
    );
};

export default USSDInput;
