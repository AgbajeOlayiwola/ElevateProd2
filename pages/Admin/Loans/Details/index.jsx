import React from 'react';
import styles from './styles.module.css';
import { loansDetails } from '../../../../components/ReusableComponents/Data';
import LoansDetails from '../../../../components/ReusableComponents/LoanDetails';
import { useRouter } from 'next/router';
import LoanLayout from '../../../../components/ReusableComponents/LoanLayout';

const LoanDetails = () => {
    const router = useRouter();
    return (
        <LoanLayout title="Loan details">
            <LoansDetails amount={230000000} loansDetails={loansDetails}>
                <div className={styles.loanDetailsButtons}>
                    <button
                        onClick={() => {
                            router.push('/Admin/Loans/Liquidation');
                        }}
                    >
                        Liquidate loan
                    </button>
                    <div>
                        <button
                            onClick={() => {
                                router.push('/Admin/Loans/Reschedule');
                            }}
                        >
                            Payment reschedule
                        </button>
                        <button
                            onClick={() => {
                                router.push('/Admin/Loans/Topup');
                            }}
                        >
                            Loan top-up
                        </button>
                    </div>
                </div>
            </LoansDetails>
        </LoanLayout>
    );
};

export default LoanDetails;
