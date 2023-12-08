import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AlertSvg from '../AlertSvg';
import Close from '../Close';
import StorePopup from '../StorePopup';
import styles from './styles.module.css';

const LoansHeader = ({ state, status, action, data }) => {
    const router = useRouter();
    const [popup, setPopup] = useState(false);

    return (
        <div className={styles.loansHeader}>
            <div>
                <h2>LOAN ELIGIBILITY</h2>
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
            {state ? (
                <div className={styles.loansHeaderButton}>
                    <button>Loan top-up</button>
                    <button>Liquidate loan</button>
                </div>
            ) : status === 'request granted' ? (
                <button
                    onClick={() => {
                        router.push('/Admin/Loans/Request');
                    }}
                >
                    Request loan
                </button>
            ) : (
                <button
                    onClick={() => {
                        setPopup(true);
                    }}
                >
                    Confirm eligibility
                </button>
            )}
            {popup ? (
                <StorePopup type={true} overlay={popup}>
                    <div className={styles.loanEligible}>
                        <div className={styles.loanEligibleHead}>
                            <div>
                                <Close
                                    action={() => {
                                        setPopup(false);
                                    }}
                                />
                            </div>
                            <AlertSvg />
                        </div>
                        <h2>Loan eligibility</h2>
                        <p>
                            <input type="checkbox" />I consent to the checking
                            of my accounts inflow and outflow.
                        </p>
                        <div className={styles.loanEligibleButtons}>
                            <button
                                onClick={() => {
                                    setPopup(false);
                                }}
                            >
                                No, go back
                            </button>
                            <button
                                onClick={() => {
                                    setPopup(false);
                                    action();
                                }}
                            >
                                Yes, I consent
                            </button>
                        </div>
                    </div>
                </StorePopup>
            ) : null}
        </div>
    );
};

export default LoansHeader;
