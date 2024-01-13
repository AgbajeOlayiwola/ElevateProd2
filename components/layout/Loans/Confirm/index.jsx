import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useLoanRepaymntMutation,
    useVerifyTransactionPinMutation
} from '../../../../redux/api/authApi';
import { getMonthlyPayment } from '../../../../utils/getNumberSuffix';
import Loader from '../../../ReusableComponents/Loader';
import LoansDetails from '../../../ReusableComponents/LoanDetails';
import LoanLayout from '../../../ReusableComponents/LoanLayout';
import StorePopup from '../../../ReusableComponents/StorePopup';
import Success from '../../../ReusableComponents/Success';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const ConfirmLoan = ({ backward, comingFrom }) => {
    const [otpValue, setOtpValue] = useState('');
    const affiliate = localStorage.getItem('affiliateCode');
    const { loanRequest } = useSelector((store) => store);
    const { loanScoring } = useSelector((store) => store);
    const { loanData } = useSelector((store) => store);
    const { loanRepayment } = useSelector((store) => store);
    const [alert, setAlert] = useState(false);
    // console.log(loanData);
    const loanDetails = [
        {
            id: 1,
            title: 'Loan Amount',
            value: `${getSymbolFromCurrency(
                countryToCurrency[`${affiliate?.substring(1)}`]
            )}
                                            ${parseFloat(
                                                loanRepayment?.loanAmount
                                            ).toLocaleString('en-US')}`
        },
        {
            id: 2,
            title: 'Request Date',
            value: `${loanRepayment?.dateCreated}%`
        },
        // {
        //     id: 2,
        //     title: 'Repayment Schedule',
        //     value: `${loanScoring?.interest}%`
        // },
        {
            id: 3,
            title: 'Repayment duration',
            value: `${
                moment(loanRepayment?.repaymentDate, 'YYYY-MM-DD').diff(
                    moment(loanRepayment?.dateCreated, 'YYYY-MM-DD'),
                    'months'
                ) || 0
            } ${
                moment(loanRepayment?.repaymentDate, 'YYYY-MM-DD').diff(
                    moment(loanRepayment?.dateCreated, 'YYYY-MM-DD'),
                    'months'
                ) > 1
                    ? ' months'
                    : ' month'
            }`
        },
        {
            id: 1,
            title: 'Request date',
            value: moment(loanRepayment?.repaymentDate, 'YYYY-MM-DD').format(
                'DD MMM, YYYY'
            )
        },
        { id: 2, title: 'Loan interest', value: `${loanRepayment?.interest}%` },
        { id: 3, title: 'Repayment schedule', value: 'Monthly' },
        // {
        //     id: 4,
        //     title: 'Repayment date',
        //     value: `${Number(day)}${getNumberSuffix(
        //         Number(day)
        //     )} of every month`
        // }
        {
            id: 5,
            title: 'Monthly payment',
            value: `${
                countryToCurrency[affiliate?.substring(1)] +
                getMonthlyPayment(
                    Number(loanRepayment?.interest),
                    Number(loanData?.data?.period),
                    Number(loanData?.data?.loan)
                )
            } `
        }
    ];
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const [
        verifyTransactionPin,
        {
            data: verifyTransactionPinData,
            isLoading: verifyTransactionPinLoad,
            isSuccess: verifyTransactionPinSuccess,
            isError: verifyTransactionPinFalse,
            error: verifyTransactionPinErr,
            reset: verifyTransactionPinReset
        }
    ] = useVerifyTransactionPinMutation();
    const showToastErrorMessage = () => {
        toast.error(verifyTransactionPinErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    useEffect(() => {
        if (verifyTransactionPinErr) {
            showToastErrorMessage();
        }
    }, [verifyTransactionPinErr]);

    const showToastRepaymentErrorMessage = () => {
        toast.error(loanRepaymntErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    useEffect(() => {
        if (loanRepaymntErr) {
            showToastRepaymentErrorMessage();
        }
    }, [loanRepaymntErr]);
    const [
        loanRepaymnt,
        {
            data: loanRepaymntData,
            isLoading: loanRepaymntLoad,
            isSuccess: loanRepaymntSuccess,
            isError: loanRepaymntFalse,
            error: loanRepaymntErr,
            reset: loanRepaymntReset
        }
    ] = useLoanRepaymntMutation();

    const bookLoan = () => {
        verifyTransactionPin({
            transactionPin: otpValue
        });
    };

    useEffect(() => {
        if (verifyTransactionPinSuccess) {
            loanBooking({
                accountNo: loanRequest?.loanAccount,
                prod_token: 'ECO-ZE9EGP',
                amount: loanRequest?.loanAmount,
                repaymentDate: moment().format('YYYYMMDD'),
                interest: 1.5
            });
        }
    }, [verifyTransactionPinSuccess]);
    const showToastBookingErrorMessage = () => {
        toast.error(loanBookingErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const repayLoan = () => {
        const data = {
            transactionID: 'T000191',
            transactionDate: '20230925',
            details: [
                {
                    sourceAccount: loanRepayment?.accountNo,
                    destinationAccount: '151000009',
                    amount: `${getMonthlyPayment(
                        Number(loanRepayment?.interest),
                        Number(loanData?.data?.period),
                        Number(loanData?.data?.loan)
                    )}`,
                    type: 'Interest'
                }
            ],
            action: 'LRP',
            mobileNumber: '233249284166'
        };
        loanRepaymnt(data);
    };
    return (
        <>
            <ToastContainer />

            <LoanLayout
                title="Request loan confirmation"
                backward={backward}
                comingFrom={comingFrom}
            >
                <LoansDetails
                    amount={loanRepayment?.loanAmount}
                    loansDetails={loanDetails}
                >
                    <div className={styles.pinContainer}>
                        <div>
                            {/* <h2>Enter your PIN to proceed</h2> */}
                            {/* <div className={styles.enter}>
                                <OtpInput
                                    otpfields={6}
                                    onOtpChange={handleOtpChange}
                                    pin={true}
                                />
                            </div> */}
                        </div>
                        {comingFrom === 'loan' ? (
                            <button
                                onClick={() => {
                                    repayLoan();
                                }}
                            >
                                {loanRepaymntLoad ? (
                                    <Loader />
                                ) : (
                                    `Reapay ${
                                        countryToCurrency[
                                            affiliate?.substring(1)
                                        ] +
                                        getMonthlyPayment(
                                            Number(loanRepayment?.interest),
                                            Number(loanData?.data?.period),
                                            Number(loanData?.data?.loan)
                                        )
                                    }`
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    bookLoan();
                                }}
                            >
                                {loanBookingLoad ? <Loader /> : 'Request loan'}
                            </button>
                        )}
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
                                        <span>
                                            {getSymbolFromCurrency(
                                                countryToCurrency[
                                                    `${affiliate?.substring(1)}`
                                                ]
                                            )}
                                            {parseFloat(
                                                loanRequest?.loanAmount
                                            ).toLocaleString('en-US')}
                                        </span>{' '}
                                        has been sent for approval.
                                    </p>
                                </div>
                                <button onClick={() => {}}>
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
