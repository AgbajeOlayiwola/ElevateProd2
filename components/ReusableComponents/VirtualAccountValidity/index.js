import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVirtualAccountStatusMutation } from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const VirtualAccountValidity = ({ data }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const [countdown, setCountdown] = useState(30 * 60); // 30 minutes in seconds
    const [orderId, stOrdrId] = useState(data?.data?.oderId);
    const { profile } = useSelector((store) => store);
    // console.log(data?.data?.oderId);
    const [
        virtualAccountStatus,
        {
            data: virtualAccountStatusData,
            isLoading: virtualAccountStatusLoad,
            isSuccess: virtualAccountStatusSuccess,
            isError: virtualAccountStatusFalse,
            error: virtualAccountStatusErr,
            reset: virtualAccountStatusReset
        }
    ] = useVirtualAccountStatusMutation();
    const checkVirtualStatus = () => {
        const data = {
            orderId: orderId
        };
        virtualAccountStatus(data);
    };
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (countdown === 0) {
                clearInterval(countdownInterval);
            } else {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const showErrorToastMessage = () => {
        if (
            virtualAccountStatusData?.data?.transactionStatus ===
            'TRANS_IN_PROGRESS'
        ) {
            toast.info(virtualAccountStatusData?.data?.transactionStatus, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message'
            });
        } else {
            toast.success(virtualAccountStatusData?.data?.transactionStatus, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message'
            });
        }
    };
    useEffect(() => {
        if (virtualAccountStatusSuccess) {
            showErrorToastMessage();
        }
    }, [virtualAccountStatusSuccess]);
    return (
        <div className={styles.countDown}>
            <ToastContainer />
            {/* <h1>Pay via account</h1> */}
            <p className={styles.copy}>
                This account will remain active to receive payment for this
                duration
            </p>
            <div className={styles.virtFlex}>
                <p>Account Number:</p> <p>{data?.data?.accountNumber}</p>
            </div>
            <div className={styles.virtFlex}>
                <p>Account Name:</p>{' '}
                <p>
                    {profile?.user?.firstName} {profile?.user?.lastName}
                </p>
            </div>
            <p className={styles.countDownP}>
                Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}
                {seconds}
            </p>

            <div className={styles.virtFlex}>
                <p>Amount:</p>{' '}
                <p>
                    {getSymbolFromCurrency(
                        countryToCurrency[`${affiliate?.substring(1)}`]
                    )}
                    {parseFloat(data?.data?.amount)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
            </div>
            {countdown === 0 && <p>Account Validity Period Exeeded</p>}
            <ButtonComp
                disabled={true}
                active={'active'}
                text={'Virtual Account Status'}
                onClick={checkVirtualStatus}
                type="submit"
                loads={virtualAccountStatusLoad}
            />
        </div>
    );
};

export default VirtualAccountValidity;
