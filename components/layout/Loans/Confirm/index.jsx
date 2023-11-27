import React, { useState } from 'react';
import { loansDetails } from '../../../ReusableComponents/Data';
import LoansDetails from '../../../ReusableComponents/LoanDetails';
import LoanLayout from '../../../ReusableComponents/LoanLayout';
import OtpInput from '../../../ReusableComponents/Otpinput';
import StorePopup from '../../../ReusableComponents/StorePopup';
import Success from '../../../ReusableComponents/Success';
import styles from './styles.module.css';

const ConfirmLoan = ({ backward }) => {
    const [otpValue, setOtpValue] = useState('');
    const [alert, setAlert] = useState(false);
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    return (
        <>
            <LoanLayout title="Request loan confirmation" backward={backward}>
                <LoansDetails amount={2300000} loansDetails={loansDetails}>
                    <div className={styles.pinContainer}>
                        <div>
                            <h2>Enter your PIN to proceed</h2>
                            <div className={styles.enter}>
                                <OtpInput
                                    otpfields={6}
                                    onOtpChange={handleOtpChange}
                                    pin={true}
                                />
                            </div>
                            <p>Forgot PIN</p>
                        </div>
                        <button
                            onClick={() => {
                                setAlert(true);
                            }}
                        >
                            Request loan
                        </button>
                    </div>
                    {alert ? (
                        <StorePopup type={true} overlay={alert}>
                            <div className={styles.successCont}>
                                <div className={styles.successSvg}>
                                    <Success />
                                </div>
                                <div className={styles.successText}>
                                    <h2>Loan application submitted</h2>
                                    <p>
                                        Your loan application of{' '}
                                        <span>N2,300,000.00</span> has been sent
                                        for approval.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setAlert(false);
                                    }}
                                >
                                    Return to loan
                                </button>
                            </div>
                        </StorePopup>
                    ) : null}
                </LoansDetails>
            </LoanLayout>
        </>
    );
};

export default ConfirmLoan;
