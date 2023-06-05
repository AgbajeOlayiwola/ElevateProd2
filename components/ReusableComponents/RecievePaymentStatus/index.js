import React, { useEffect, useState } from 'react';
import Popup from '../../layout/Popup';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadussdStatus,
    ussdStatusLoadError
} from '../../../redux/actions/actions';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
import Lottie from 'react-lottie';

const RecievePaymentStatus = ({
    back,
    type,
    overlay,
    action,
    transactionId
}) => {
    const { ussdStatus, errorMessageussdStatus } = useSelector(
        (state) => state.ussdStatusReducer
    );
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
    useEffect(() => {
        const data = {
            transactionRef: transactionId
        };

        dispatch(loadussdStatus(data));
    }, []);
    useEffect(() => {
        console.log();
        setUssDmainStatus(ussdStatus);
        if (ussdStatus != null) {
            setIsLoading(false);
        } else if (errorMessageussdStatus != null)
            setUssdErr('Unable to get USSD Payment Status');
    }, [ussdStatus, errorMessageussdStatus]);

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
