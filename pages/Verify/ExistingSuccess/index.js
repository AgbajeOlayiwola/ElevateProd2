import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Card from '../../../components/layout/NotRegisteredForms/Card';
import Link from 'next/link';
import Success from '../../../components/ReusableComponents/Success';
import { ButtonComp } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountsData } from '../../../redux/actions/actions';

const ExistingSuccess = ({ handleShowSuccessStep }) => {
    const dispatch = useDispatch();
    const [activeBtn, setActiveBtn] = useState(true);
    const [acctNo, setActNo] = useState();
    // let accountDetails;
    // let accountNumber;
    // if (typeof window !== 'undefined') {
    //     accountDetails = window.localStorage.getItem('accountNumber');
    //     if (accountDetails === null) {
    //         accountNumber = '';
    //     } else {
    //         accountNumber = JSON.parse(accountDetails);
    //     }
    // }
    const { bankAccounts, errorMessage } = useSelector(
        (state) => state.bankAccountsReducer
    );
    useEffect(() => {
        dispatch(bankAccountsData());
        //console.log(bankAccounts[0].accountNumber);

        setActNo(bankAccounts[0]?.accountNumber);
    }, [bankAccounts[0]?.accountNumber]);
    return (
        <div className={styles.cover}>
            <>
                <div className={styles.Success}>
                    <Success />
                </div>
                <div className={styles.successBody}>
                    <h2 className={styles.h2}>
                        Your profile has been successfully setup
                    </h2>
                    <h3>
                        Your Account Number is <span>{acctNo}</span>
                    </h3>
                    <Link href="/Dashboard">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            // onClick={handleSubmit}
                            type="submit"
                            text="Proceed To Dashboard"
                        />
                    </Link>
                </div>
            </>
        </div>
    );
};

export default ExistingSuccess;
