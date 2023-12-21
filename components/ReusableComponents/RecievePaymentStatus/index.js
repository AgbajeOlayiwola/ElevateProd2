import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../../layout/Popup';
import styles from './styles.module.css';

import Lottie from 'react-lottie';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
import { useTransactionHistoryMutation } from '../../../redux/api/authApi';

const RecievePaymentStatus = ({
    back,
    type,
    overlay,
    action,
    transactionId
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ussdMainStatus, setUssDmainStatus] = useState();
    const [ussdErr, setUssdErr] = useState('');
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const dispatch = useDispatch();

    const [
        transactionHistory,
        {
            data: transactionHistoryData,
            isLoading: transactionHistoryLoad,
            isSuccess: transactionHistorySuccess,
            isError: transactionHistoryFalse,
            error: transactionHistoryErr,
            reset: transactionHistoryReset
        }
    ] = useTransactionHistoryMutation();
    return (
        <>
            <Popup overlay={overlay} action={action}>
                <div>Ussd Payment Status</div>
                {isLoading ? (
                    <Lottie options={socialOptions} height={200} width={200} />
                ) : ussdErr ? (
                    <>
                        <p className={styles.error}>{ussdErr}</p>
                        <button onClick={back}>Return To Previous Page</button>
                    </>
                ) : (
                    <>
                        <div className={styles.status}>
                            <p
                                className={
                                    ussdMainStatus?.transactionStatus ===
                                    'PENDING'
                                        ? styles.statusText
                                        : ussdMainStatus?.transactionStatus ===
                                          'FAILED'
                                        ? styles.failedText
                                        : styles.successText
                                }
                            >
                                Status: {ussdMainStatus?.transactionStatus}
                            </p>
                            <p>
                                Transaction Amount:{' '}
                                {ussdMainStatus?.transactionAmount}
                            </p>
                        </div>

                        <button onClick={back}>Return To Previous Page</button>
                    </>
                )}
            </Popup>
        </>
    );
};

export default RecievePaymentStatus;
