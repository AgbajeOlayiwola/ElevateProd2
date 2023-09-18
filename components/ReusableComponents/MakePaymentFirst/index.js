import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import BulkTransfer from './bulktransfer';
import ForeignTransfer from './foreigntransfer';
import BillPayment from './billpayment';
import SingleTransfer from './singletransfer';
import Overlay from '../Overlay';
import CloseButton from '../CloseButtonSvg';

import { useDispatch, useSelector } from 'react-redux';
import { bankAccountsData } from '../../../redux/actions/bankAccountsDetailsAction';
import { getBeneficiariesData } from '../../../redux/actions/getBeneficiariesAction';

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
    isLoading,
    payload,
    formData,
    setFormdata,
    backAction
}) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const [bankAccount, setBankAccount] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const { getBeneficiaries } = useSelector(
        (state) => state.getBeneficiariesReducer
    );
    const { bankAccounts } = useSelector((state) => state.bankAccountsReducer);
    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(getBeneficiariesData());
    }, []);
    useEffect(() => {
        if (bankAccounts !== null) {
            setBankAccount(bankAccounts);
        }
    }, [bankAccounts]);
    useEffect(() => {
        if (getBeneficiaries !== null) {
            setBeneficiaries(getBeneficiaries);
        }
    }, [getBeneficiaries]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.firstDiv} ref={myref}>
                <div className={styles.firstBody}>
                    {firstTitle === 'Single Transfer Payment' ? (
                        <SingleTransfer
                            formData={formData}
                            setFormdata={setFormdata}
                            selfaction={selfaction}
                            othersaction={othersaction}
                            firstTitle="Single Transfer Payment"
                            buttonText={buttonText}
                            scheduleLater={scheduleLater}
                            isLoading={isLoading}
                            bankAccounts={bankAccount}
                            beneficiaries={beneficiaries}
                            payload={payload}
                        />
                    ) : firstTitle === 'Foreign Transfer' ? (
                        <ForeignTransfer
                            formData={formData}
                            setFormdata={setFormdata}
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            type={type}
                            secondAction={secondAction}
                            scheduleLater={scheduleLater}
                            bankAccounts={bankAccount}
                        />
                    ) : firstTitle === 'Bulk Payments' ? (
                        <BulkTransfer
                            formData={formData}
                            setFormdata={setFormdata}
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            bankAccounts={bankAccount}
                            payload={payload}
                            isLoading={isLoading}
                        />
                    ) : (
                        <BillPayment
                            formData={formData}
                            setFormdata={setFormdata}
                            action={action}
                            firstTitle={firstTitle}
                            buttonText={buttonText}
                            arrowAction={arrowAction}
                            scheduleLater={scheduleLater}
                            dataAction={dataAction}
                            airtimeAction={airtimeAction}
                            bankAccounts={bankAccount}
                            isLoading={isLoading}
                            backAction={backAction}
                        />
                    )}
                </div>
                <div>
                    {width > 950 ? (
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
                    ) : (
                        <CloseButton
                            action={closeAction}
                            classes={styles.closebtn}
                            color="grey"
                        />
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentFirst;
