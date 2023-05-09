import React from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import animationData from '../../ReusableComponents/Lotties/qr.json';
const QrInput = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={styles.qrInp}>
            <Lottie options={defaultOptions} height={200} width={200} />
            <img src="/Assets/Images/eraImage.png" width={104} height={34} />
            <div>
                <p>Merchant ID:</p>
                <p>1234567890</p>
            </div>
            <div>
                <p>Terminal ID:</p>
                <p>1234567890</p>
            </div>
        </div>
    );
};

export default QrInput;
