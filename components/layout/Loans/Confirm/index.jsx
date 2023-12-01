import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLoanBookingMutation } from '../../../../redux/api/authApi';
import { loansDetails } from '../../../ReusableComponents/Data';
import LoansDetails from '../../../ReusableComponents/LoanDetails';
import LoanLayout from '../../../ReusableComponents/LoanLayout';
import OtpInput from '../../../ReusableComponents/Otpinput';
import StorePopup from '../../../ReusableComponents/StorePopup';
import Success from '../../../ReusableComponents/Success';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');

const ConfirmLoan = ({ backward }) => {
    const [otpValue, setOtpValue] = useState('');
    const affiliate = localStorage.getItem('affiliateCode');
    const [alert, setAlert] = useState(false);
    // const loanDetails = [
    //     {
    //         id: 1,
    //         name: 'Loan Amount',
    //         value: `${
    //             countryToCurrency[`${affiliate?.substring(1)}`]
    //         } ${formatNumberWithComma(data?.loanAmount)}`
    //     },
    //     {
    //         id: 1,
    //         name: 'Request date',
    //         value: moment(data?.repaymentDate, 'YYYY-MM-DD').format(
    //             'DD MMM, YYYY'
    //         )
    //     },
    //     { id: 2, name: 'Loan interest', value: `${data?.interest}%` },
    //     {
    //         id: 3,
    //         name: 'Repayment duration',
    //         value: `${
    //             moment(data?.repaymentDate, 'YYYY-MM-DD').diff(
    //                 moment(data?.dateCreated, 'YYYY-MM-DD'),
    //                 'months'
    //             ) || 0
    //         } ${
    //             moment(data?.repaymentDate, 'YYYY-MM-DD').diff(
    //                 moment(data?.dateCreated, 'YYYY-MM-DD'),
    //                 'months'
    //             ) > 1
    //                 ? ' months'
    //                 : ' month'
    //         }`
    //     },
    //     { id: 3, name: 'Repayment schedule', value: 'Monthly' },
    //     {
    //         id: 4,
    //         name: 'Repayment date',
    //         value: `${Number(day)}${getNumberSuffix(
    //             Number(day)
    //         )} of every month`
    //     },
    //     {
    //         id: 5,
    //         name: 'Monthly payment',
    //         value: `${
    //             countryToCurrency[`${affiliate?.substring(1)}`]
    //         } ${formatNumberWithComma(monthlyAmount)}`
    //     }
    // ];
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const [
        loanBooking,
        {
            data: loanBookingData,
            isLoading: loanBookingLoad,
            isSuccess: loanBookingSuccess,
            isError: loanBookingFalse,
            error: loanBookingErr,
            reset: loanBookingReset
        }
    ] = useLoanBookingMutation();
    useEffect(() => {
        loanBooking({
            accountNo: 'datas',
            prod_token: 'ECO-ZE9EGP',
            amount: '100',
            repaymentDate: moment().format('YYYYMMDD'),
            interest: 'loanData?.data?.interest'
        });
    }, []);
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
