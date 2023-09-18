import React from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import animationData from '../../ReusableComponents/Lotties/paylink.json';
const Paylink = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={styles.paylinkInut}>
            <Lottie options={defaultOptions} height={300} width={300} />
            <label>Paylink</label>
            <input type="text" placeholder="Eco.com/jsdhjdbjhasbzd/wdcshdj" />
            <button>Copy Paylink</button>
        </div>
    );
};

export default Paylink;
