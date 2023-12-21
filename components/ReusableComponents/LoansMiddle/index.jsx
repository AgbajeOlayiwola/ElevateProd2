import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useLoanBalanceMutation,
    useLoanScoringMutation
} from '../../../redux/api/authApi';
import { setLoanData } from '../../../redux/slices/loansData';
import { formatter } from '../../../utils/formatter/formatter';
import { getMonthlyPayment } from '../../../utils/getNumberSuffix';
import LoansSvg from '../LoansSvg';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const LoansMiddle = ({ status, state, loads, data, account }) => {
    const dispatch = useDispatch();
    const affiliate = localStorage.getItem('affiliateCode');
    const [acctNummber, setAcctNumber] = useState('');
    const { allAccountInfo } = useSelector((store) => store);
    const [
        loanBalance,
        {
            data: loanBalanceData,
            isLoading: loanBalanceLoad,
            isSuccess: loanBalanceSuccess,
            isError: loanBalanceFalse,
            error: loanBalanceErr,
            reset: loanBalanceReset
        }
    ] = useLoanBalanceMutation();
    const [
        loanScoring,
        {
            data: loanScoringData,
            isLoading: loanScoringLoad,
            isSuccess: loanScoringSuccess,
            isError: loanScoringFalse,
            error: loanScoringErr,
            reset: loanScoringReset
        }
    ] = useLoanScoringMutation();

    useEffect(() => {
        setAcctNumber(
            allAccountInfo
                ?.filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account.accountNo)
                .filter(Boolean)
                .join(', ') // Join array elements into a string
        );
        loanScoring({
            account: acctNummber,
            prod_token: 'ECO-ZE9EGP'
        });
        loanBalance({
            account: acctNummber,
            prod_token: 'ECO-ZE9EGP'
        });
    }, [account]);
    function formatDateString(originalDateString) {
        const originalDate = new Date(originalDateString);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        return new Intl.DateTimeFormat('en-US', options).format(originalDate);
    }
    useEffect(() => {
        if (loanScoringSuccess || loanBalanceSuccess) {
            dispatch(setLoanData(loanScoringData, loanBalanceData));
        }
    }, [loanScoringSuccess, loanBalanceSuccess]);

    const router = useRouter();
    return (
        <div className={styles.loansMiddle}>
            <div className={styles.loansBalance}>
                <p>
                    Loan: <span>Loan 1</span>
                </p>
                <div className={styles.loansBalanceBody}>
                    <div className={styles.circle}>
                        <LoansSvg />
                    </div>
                    <div className={styles.text}>
                        {state ? (
                            <h2>
                                {formatter.format(10000000)}
                                <span>/{formatter.format(100000000)}</span>
                            </h2>
                        ) : (
                            <>
                                <h2>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            `${affiliate.substring(1)}`
                                        ]
                                    )}
                                    {parseFloat(loanBalanceData?.data?.loan)
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </h2>

                                {/* <span>/{formatter.format(0)}</span> */}
                            </>
                        )}
                        <p>Loan Balance</p>
                    </div>
                </div>
            </div>
            <div className={styles.loansDetails}>
                <div className={styles.loansDetailsHead}>
                    {state ? (
                        <p
                            className={styles.click}
                            onClick={() => {
                                router.push('/Admin/Loans/Details');
                            }}
                        >
                            Click to view
                        </p>
                    ) : null}
                    <div>
                        <h2>Loan details</h2>
                        <p>
                            {status === 'default'
                                ? 'Confirm eligibility to apply for a loan.'
                                : status === 'request sent'
                                ? 'Eligibility request sent'
                                : status === 'request declined'
                                ? 'You currently do not qualify for a loan. Keep transacting to qualify.'
                                : status === 'request granted'
                                ? 'You are now eligible for a ₵5,000,000.00 loan.'
                                : null}
                        </p>
                    </div>
                </div>
                <div className={styles.loansDetailsBody}>
                    {state ? (
                        <>
                            <div>
                                <p>Date Disbursed</p>
                                <h2>Jan. 5, 2022</h2>
                            </div>
                            <div>
                                <p>Repayment period</p>
                                <h2>6 months</h2>
                            </div>
                            <div>
                                <p>Repayment amount</p>
                                <h2>{formatter.format(234000)}</h2>
                            </div>
                            <div>
                                <p>Next Repayment </p>
                                <h2>
                                    {' '}
                                    {
                                        countryToCurrency[
                                            `${affiliate?.substring(1)}`
                                        ]
                                    }
                                    {getMonthlyPayment(
                                        Number(loanScoringData?.data?.interest),
                                        Number(loanScoringData?.data?.period),
                                        Number(loanScoringData?.data?.loan)
                                    ) || 0.0}
                                </h2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p>Date Disbursed</p>
                                <h2>
                                    {loanBalanceData?.data?.activity[0]?.date
                                        ? formatDateString(
                                              loanBalanceData?.data?.activity[0]
                                                  ?.date
                                          )
                                        : 'N/A'}
                                </h2>
                            </div>
                            <div>
                                <p>Repayment period</p>
                                <h2>
                                    {data?.data?.period
                                        ? data?.data?.period
                                        : 'N/A'}
                                </h2>
                            </div>
                            <div>
                                <p>Repayment amount</p>
                                <h2>
                                    {data?.data?.limit
                                        ? countryToCurrency[
                                              affiliate?.substring(1)
                                          ] +
                                          parseFloat(data?.data?.limit)
                                              .toFixed(2)
                                              .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  ','
                                              )
                                        : 'N/A'}
                                </h2>
                            </div>
                            <div>
                                <p>Next Repayment </p>
                                <h2>
                                    {loanScoringSuccess
                                        ? countryToCurrency[
                                              affiliate?.substring(1)
                                          ] +
                                          (getMonthlyPayment(
                                              Number(
                                                  loanScoringData?.data
                                                      ?.interest
                                              ),
                                              Number(
                                                  loanScoringData?.data?.period
                                              ),
                                              Number(
                                                  loanScoringData?.data?.loan
                                              )
                                          ) || 0.0)
                                        : 'N/A'}
                                </h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoansMiddle;
