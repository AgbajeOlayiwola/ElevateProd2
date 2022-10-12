import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import BulkTransfer from './bulktransfer';
import ForeignTransfer from './foreigntransfer';
import BillPayment from './billpayment';
import SingleTransfer from './singletransfer';
import Overlay from '../Overlay';
import CloseButton from '../CloseButtonSvg';
import { bankAccountsData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const MakePaymentFirst = ({
    firstTitle,
    closeAction,
    buttonText,
    action,
    selfaction,
    othersaction,
    overlay,
    scheduleLater,
    arrowAction,
    dataAction,
    airtimeAction,
    type,
    secondAction,
    isLoading
}) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const [bankAccounts, setBankAccounts] = useState([]);
    const { bankAccount } = useSelector((state) => state.banksReducer);
    useEffect(() => {
        dispatch(bankAccountsData());
    }, []);
    useEffect(() => {
        if (bankAccount !== null) {
            setBankAccounts(bankAccount);
        }
    }, [bankAccount]);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.firstDiv} ref={myref}>
                <div
                    className={
                        firstTitle === 'Bulk Payments'
                            ? styles.bulkBody
                            : styles.firstBody
                    }
                >
                    {firstTitle === 'Single Transfer Payment' ? (
                        <SingleTransfer
                            selfaction={selfaction}
                            othersaction={othersaction}
                            firstTitle="Single Transfer Payment"
                            buttonText={buttonText}
                            scheduleLater={scheduleLater}
                            isLoading={isLoading}
                            bankAccounts={bankAccounts}
                        />
                    ) : firstTitle === 'Foreign Transfer' ? (
                        <ForeignTransfer
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            type={type}
                            secondAction={secondAction}
                            scheduleLater={scheduleLater}
                            bankAccounts={bankAccounts}
                        />
                    ) : firstTitle === 'Bulk Payments' ? (
                        <BulkTransfer
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            bankAccounts={bankAccounts}
                        />
                    ) : (
                        <BillPayment
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            arrowAction={arrowAction}
                            scheduleLater={scheduleLater}
                            dataAction={dataAction}
                            airtimeAction={airtimeAction}
                            bankAccounts={bankAccounts}
                        />
                    )}
                </div>
                <div>
                    <img
                        src="../../Assets/Images/bluemoney.png"
                        alt=""
                        className={styles.greenImg}
                    />
                    <CloseButton
                        action={closeAction}
                        classes={styles.closebtn}
                        color="white"
                    />
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentFirst;
