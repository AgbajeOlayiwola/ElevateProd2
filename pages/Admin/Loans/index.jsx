import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../../components/ReusableComponents/EmptyState';
import Loader from '../../../components/ReusableComponents/Loader';
import LoansHeader from '../../../components/ReusableComponents/LoansHeader';
import LoansMiddle from '../../../components/ReusableComponents/LoansMiddle';
import LoansTable from '../../../components/ReusableComponents/LoansTable';
import ConfirmLoan from '../../../components/layout/Loans/Confirm';
import {
    useGetLoansMutation,
    useLoanScoringMutation
} from '../../../redux/api/authApi';
import { setLoanScoring } from '../../../redux/slices/loanScoring';
import styles from './styles.module.css';

const Loans = () => {
    const [status, setStatus] = useState('request granted');
    const [state, setState] = useState(false);
    const [sourceAccount, setSourceAccount] = useState();
    const [acctNummber, setAcctNumber] = useState('');
    const [loanRepayment, setLoanRepayment] = useState(false);
    const { allAccountInfo } = useSelector((store) => store);
    const dispatch = useDispatch();
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
    const [
        getLoans,
        {
            data: getLoansData,
            isLoading: getLoansLoad,
            isSuccess: getLoansSuccess,
            isError: getLoansFalse,
            error: getLoansErr,
            reset: getLoansReset
        }
    ] = useGetLoansMutation();
    useEffect(() => {
        getLoans();
    }, []);

    useEffect(() => {
        setAcctNumber(
            allAccountInfo
                ?.filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account.accountNo)
                .filter(Boolean)
        );
    }, []);
    const [filteredData, setFilteredData] = useState();
    useEffect(() => {
        loanScoring({
            account: acctNummber,
            prod_token: 'ECO-ZE9EGP'
        });
        setFilteredData(
            getLoansData?.data?.filter((loan) => loan.accountNo === acctNummber)
        );
    }, [acctNummber]);

    useEffect(() => {
        if (loanScoringSuccess) {
            console.log(loanScoringData?.data);
            dispatch(setLoanScoring(loanScoringData?.data));
        }
    }, [loanScoringSuccess]);

    return (
        <>
            {loanRepayment ? (
                <ConfirmLoan comingFrom="loan" />
            ) : (
                <div className={styles.loansContainer}>
                    <h2>Loans</h2>
                    <div className={styles.loansWrapper}>
                        <div className={styles.accountELigibility}>
                            <div className={styles.narration}>
                                <label>Source Account</label>
                                <select
                                    name="ecoSourceAccount"
                                    value={acctNummber}
                                    onChange={(e) => {
                                        const selectedAccount =
                                            allAccountInfo.find(
                                                (account) =>
                                                    account?.accountNo ===
                                                    e.target.value
                                            );
                                        if (selectedAccount) {
                                            setAcctNumber(
                                                selectedAccount?.accountNo
                                            );
                                        }
                                    }}
                                >
                                    <option value="">
                                        Select Account To Use
                                    </option>
                                    {allAccountInfo
                                        .filter((account) => account.accountNo)
                                        .map((account) => {
                                            return (
                                                <>
                                                    <option
                                                        className={
                                                            styles.accntP
                                                        }
                                                        value={
                                                            account?.accountNo
                                                        }
                                                    >
                                                        <p>
                                                            {account?.accountNo}
                                                        </p>
                                                        {/* <p>
                                                        {account?.availableBal.toLocaleString()}
                                                    </p> */}
                                                    </option>
                                                </>
                                            );
                                        })}
                                </select>
                            </div>
                            <LoansHeader
                                state={state}
                                status={status}
                                action={() => {
                                    setStatus('request granted');
                                }}
                                loads={loanScoringLoad}
                                data={loanScoringData}
                            />
                        </div>
                        <LoansMiddle
                            state={state}
                            status={status}
                            loads={loanScoringLoad}
                            data={loanScoringData}
                        />
                        {getLoansLoad ? (
                            <Loader />
                        ) : filteredData?.length > 0 ? (
                            <LoansTable
                                repayloan={() => setLoanRepayment(true)}
                                loads={loanScoringLoad}
                                data={filteredData}
                            />
                        ) : (
                            <div className={styles.loansBody}>
                                <EmptyState />
                                {status === 'default' ? (
                                    <p>
                                        Do you want a loan? Confirm your
                                        eligibility.
                                    </p>
                                ) : status === 'request sent' ? (
                                    <p>
                                        You will be able to apply for loan once
                                        we confirm your eligibility
                                    </p>
                                ) : status === 'request declined' ? (
                                    <p>
                                        You currently do not qualify for a loan.
                                        Keep transacting to qualify.
                                    </p>
                                ) : status === 'request granted' ? (
                                    <p>
                                        You do not have a loan yet. Your loan
                                        activity will appear here once you
                                        request for one.
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
            )}
        </>
    );
};

export default Loans;
