import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmptyState from '../../../components/ReusableComponents/EmptyState';
import LoansHeader from '../../../components/ReusableComponents/LoansHeader';
import LoansMiddle from '../../../components/ReusableComponents/LoansMiddle';
import LoansTable from '../../../components/ReusableComponents/LoansTable';
import { useLoanBalanceMutation } from '../../../redux/api/authApi';
import styles from './styles.module.css';

const Loans = () => {
    const [status, setStatus] = useState('default');
    const [state, setState] = useState(false);

    return (
        <div className={styles.loansContainer}>
            <h2>Loans</h2>
            <div className={styles.loansWrapper}>
                <LoansHeader
                    state={state}
                    status={status}
                    action={() => {
                        setStatus('request granted');
                    }}
                />
                <LoansMiddle state={state} status={status} />
                {state ? (
                    <LoansTable />
                ) : (
                    <div className={styles.loansBody}>
                        <EmptyState />
                        {status === 'default' ? (
                            <p>Do you want a loan? Confirm your eligibility.</p>
                        ) : status === 'request sent' ? (
                            <p>
                                You will be able to apply for loan once we
                                confirm your eligibility
                            </p>
                        ) : status === 'request declined' ? (
                            <p>
                                You currently do not qualify for a loan. Keep
                                transacting to qualify.
                            </p>
                        ) : status === 'request granted' ? (
                            <p>
                                You do not have a loan yet. Your loan activity
                                will appear here once you request for one.
                            </p>
                        ) : null}
                        {status === 'request granted' ? (
                            <button>Request Loan</button>
                        ) : (
                            <button>Confirm eligibility</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Loans;
