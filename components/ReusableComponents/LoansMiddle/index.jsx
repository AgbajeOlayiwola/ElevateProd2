import React from 'react';
import styles from './styles.module.css';
import { formatter } from '../../../utils/formatter/formatter';
import LoansSvg from '../LoansSvg';
import { useRouter } from 'next/router';

const LoansMiddle = ({ status, state }) => {
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
                            <h2>
                                {formatter.format(0)}
                                <span>/{formatter.format(0)}</span>
                            </h2>
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
                                <h2>July 4, 2022</h2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p>Date Disbursed</p>
                                <h2>N/A</h2>
                            </div>
                            <div>
                                <p>Repayment period</p>
                                <h2>N/A</h2>
                            </div>
                            <div>
                                <p>Repayment amount</p>
                                <h2>N/A</h2>
                            </div>
                            <div>
                                <p>Next Repayment </p>
                                <h2>N/A</h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoansMiddle;
