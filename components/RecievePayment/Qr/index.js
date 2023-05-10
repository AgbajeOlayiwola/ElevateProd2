import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import animationData from '../../ReusableComponents/Lotties/qr.json';
const QrInput = ({ type, data }) => {
    const [qrData, setQrData] = useState();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        setQrData(`data:image/png;base64,${data}`?.split(' ')?.join(''));
    }, [data]);

    console.log(qrData);
    return (
        <div className={styles.qrInp}>
            <Lottie options={defaultOptions} height={200} width={200} />
            <img src={qrData} />
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
