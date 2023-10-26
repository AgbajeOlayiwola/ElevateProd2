import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonComp from '../Button';
import CloseButton from '../CloseButtonSvg';
import Loader from '../Loader';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import styles from './styles.module.css';
// import axios from 'axios';

const VirtualAccountFirst = ({
    firstTitle,
    buttonText,
    closeAction,
    action,
    isLoading,
    overlay,
    type,
    typeAction,
    error
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [description, setDescription] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const dispatch = useDispatch();
    const myref = useRef();

    const handleOtpChange = (otp) => {
        setOtpValue(otp);
        if (otpValue.length === 5) {
            setActiveBtn(true);
        }
    };
    const { allAccountInfo } = useSelector((store) => store);
    const initialValues = {
        ecoAccountId: '',
        ecoSourceAccount: '',
        ecoCurrency: '',
        accountNumber: '',
        amount: '',
        paymentTitle: '',
        phoneNumbr: '',
        description: ''
    };

    return (
        <Overlay overlay={overlay}>
            <ToastContainer />
            <div className={styles.firstDiv} ref={myref}>
                <div className={styles.firstBody}>
                    <div>
                        <h2>{firstTitle}</h2>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                setFieldValue,
                                handleSubmit
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.narration}>
                                        <label>Source Account</label>
                                        <select
                                            name="ecoSourceAccount"
                                            onChange={(e) => {
                                                const selectedAccount =
                                                    allAccountInfo.find(
                                                        (account) =>
                                                            account?.accountNo ===
                                                            e.target.value
                                                    );
                                                if (selectedAccount) {
                                                    setFieldValue(
                                                        'ecoSourceAccount',
                                                        selectedAccount?.accountNo
                                                    );
                                                    setFieldValue(
                                                        'ecoAccountId',
                                                        selectedAccount?.accountId
                                                    );
                                                    setFieldValue(
                                                        'ecoCurrency',
                                                        selectedAccount?.currency
                                                    );
                                                }
                                            }}
                                        >
                                            <option value="">
                                                Select Account To Use
                                            </option>
                                            {allAccountInfo
                                                .filter(
                                                    (account) =>
                                                        account.accountNo
                                                )
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
                                                                    {
                                                                        account?.accountNo
                                                                    }
                                                                </p>
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </select>
                                        <br />
                                    </div>
                                    <br />
                                    <div className={styles.formGroup}>
                                        <label>Enter Amount</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            placeholder="0.00"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'amount',
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.formGroup}>
                                        <label>Enter Amount</label>
                                        <input
                                            type="number"
                                            name="phoneNumbr"
                                            placeholder="0.00"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'phoneNumbr',
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.formGroup}>
                                        <label>Payment title</label>

                                        <input
                                            type="text"
                                            placeholder="Enter Payment Name"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'paymentTitle',
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <p className={styles.error}>
                                            {errors?.accountName?.message}
                                        </p>
                                    </div>
                                    <div className={styles.otps}>
                                        <label>Transaction PIN.</label>
                                        <br />
                                        <OtpInput
                                            onOtpChange={handleOtpChange}
                                            otpfields={6}
                                        />
                                    </div>
                                    {error ? (
                                        <p className={styles.error}>{error}</p>
                                    ) : null}
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            // loads={
                                            //     dynamicQrLoad ||
                                            //     ussdRefferenceLoad
                                            // }
                                            text={buttonText}
                                            type="submit"
                                        />
                                    )}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div>
                    {/* <img
                        src="/Assets/Images/Group 33664.png"
                        width="100%"
                        height="100%"
                    /> */}
                    <img
                        src="/Assets/Images/greenmoney.png"
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

export default VirtualAccountFirst;
