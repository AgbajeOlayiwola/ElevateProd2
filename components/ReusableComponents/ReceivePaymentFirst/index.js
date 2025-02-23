import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useDynamicQrMutation,
    usePaymentbanklistMutation,
    useUssdRefferenceMutation
} from '../../../redux/api/authApi';
import { setDynamicQrData } from '../../../redux/slices/dynamicQrSlice';
import { setUssdData } from '../../../redux/slices/ussddataSlice';
import ButtonComp from '../Button';
import CloseButton from '../CloseButtonSvg';
import Loader from '../Loader';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import Search from '../SearchInput';
import styles from './styles.module.css';
// import axios from 'axios';

const ReceivePaymentFirst = ({
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
    const [
        paymentbanklist,
        {
            data: paymentbanklistData,
            isLoading: paymentbanklistLoad,
            isSuccess: paymentbanklistSuccess,
            isError: paymentbanklistFalse,
            error: paymentbanklistErr,
            reset: paymentbanklistReset
        }
    ] = usePaymentbanklistMutation();
    const [
        ussdRefference,
        {
            data: ussdRefferenceData,
            isLoading: ussdRefferenceLoad,
            isSuccess: ussdRefferenceSuccess,
            isError: ussdRefferenceFalse,
            error: ussdRefferenceErr,
            reset: ussdRefferenceReset
        }
    ] = useUssdRefferenceMutation();

    const [selectedBank, setSelectedBank] = useState(null);
    const handleBankSelect = (bank) => {
        setSelectedBank(bank?.institutionCode);
    };
    const [
        dynamicQr,
        {
            data: dynamicQrData,
            isLoading: dynamicQrLoad,
            isSuccess: dynamicQrSuccess,
            isError: dynamicQrFalse,
            error: dynamicQrErr,
            reset: dynamicQrReset
        }
    ] = useDynamicQrMutation();
    useEffect(() => {
        if (dynamicQrSuccess) {
            dispatch(setDynamicQrData(dynamicQrData));
            action();
        }
    }, [dynamicQrSuccess]);
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
        if (otpValue.length === 5) {
            setActiveBtn(true);
        }
    };
    const banks = {
        data: [
            {
                institutionName: 'GTBank',
                institutionCode: '*737*',
                bankID: '000'
            },
            {
                institutionName: 'First Bank',
                institutionCode: '*894*',
                bankID: '000'
            },
            {
                institutionName: 'Zenith Bank',
                institutionCode: '*966*',
                bankID: '000'
            },
            {
                institutionName: 'UBA',
                institutionCode: '*919*',
                bankID: '000'
            },
            {
                institutionName: 'Stanbic Bank',
                institutionCode: '*909*',
                bankID: '000'
            },
            {
                institutionName: 'Sterling Bank',
                institutionCode: '*822*',
                bankID: '000'
            },
            {
                institutionName: 'Unity Bank',
                institutionCode: '*7799*',
                bankID: '000'
            },
            {
                institutionName: 'Keystone Bank',
                institutionCode: '*7111*',
                bankID: '000'
            },
            {
                institutionName: 'Fidelity Bank',
                institutionCode: '*770*',
                bankID: '000'
            },
            {
                institutionName: 'Ecobank',
                institutionCode: '*326*',
                bankID: '000'
            },
            {
                institutionName: 'Wema Bank',
                institutionCode: '*945*',
                bankID: '000'
            },
            {
                institutionName: 'Access Bank',
                institutionCode: '*901*',
                bankID: '000'
            },
            {
                institutionName: 'Access (Diamond )',
                institutionCode: '*426*',
                bankID: '000'
            },
            {
                institutionName: 'FCMB',
                institutionCode: '*329*',
                bankID: '000'
            },
            {
                institutionName: 'Heritage Bank',
                institutionCode: '*745*',
                bankID: '000'
            },
            {
                institutionName: 'Union Bank',
                institutionCode: '*826*',
                bankID: '000'
            },
            {
                institutionName: 'VFD MFB',
                institutionCode: '*5037*',
                bankID: '000'
            },
            {
                institutionName: 'Rubies (Highstreet) MFB',
                institutionCode: '*7797*',
                bankID: '000'
            },
            {
                institutionName: 'Globus bank',
                institutionCode: '*989*',
                bankID: '000'
            },
            {
                institutionName: 'Kuda Bank',
                institutionCode: '*5593*',
                bankID: '000'
            }
        ]
    };
    const { allAccountInfo } = useSelector((store) => store);
    const initialValues = {
        ecoAccountId: '',
        ecoSourceAccount: '',
        ecoCurrency: '',
        accountNumber: '',
        amount: '',
        paymentTitle: '',
        description: ''
    };
    useEffect(() => {
        paymentbanklist();
    }, []);
    useEffect(() => {
        if (paymentbanklistSuccess) {
            // console.log(paymentbanklistData);
        }
    }, [paymentbanklistSuccess]);

    const showToastMessage = () => {
        toast.error(ussdRefferenceErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (ussdRefferenceErr) {
            showToastMessage();
        }
    }, [ussdRefferenceErr]);
    useEffect(() => {
        if (ussdRefferenceSuccess) {
            const data = {
                ussdData: ussdRefferenceData?.data,
                bank: selectedBank,
                code: selectedBank
            };
            dispatch(setUssdData(data));
            action();
        }
    }, [ussdRefferenceSuccess]);
    const showQrToastMessage = () => {
        toast.error(dynamicQrErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (dynamicQrErr) {
            showQrToastMessage();
        }
    }, [dynamicQrErr]);
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
                                const data = {
                                    amount: values.amount,
                                    nameOfPayment: values.paymentTitle,
                                    productName: values.paymentTitle,
                                    productCode: values.paymentTitle,
                                    description: values.description,
                                    transactionPin: otpValue
                                };
                                const ussdData = {
                                    amount: values.amount,
                                    subMerchant: values.paymentTitle,
                                    transactionPin: otpValue
                                };
                                if (firstTitle === 'Create USSD Payment Code') {
                                    ussdRefference(ussdData);
                                } else {
                                    dynamicQr(data);
                                }
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
                                    {/* <label>Source Account</label> */}
                                    {/* <select
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
                                        </select> */}

                                    <br />
                                    <div className={styles.formGroup}>
                                        {/* <label>Account Number</label>
                                        <input
                                            type="number"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'accountNumber',
                                                    e.target.value
                                                );
                                            }}
                                            name="amount"
                                        />
                                        <p className={styles.error}>
                                            {errors?.amount?.message}
                                        </p> */}

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
                                        {/* <p className={styles.error}>
                                            {errors?.amount?.message}
                                        </p> */}
                                    </div>
                                    <br />
                                    {firstTitle ===
                                    'Create USSD Payment Code' ? (
                                        <div className={styles.narration}>
                                            <div className={styles.formBank}>
                                                <label
                                                    className={styles.bulkLabel}
                                                >
                                                    Choose Bank
                                                </label>
                                                <Search
                                                    array={banks}
                                                    placeholder="Search for bank"
                                                    onBankSelect={
                                                        handleBankSelect
                                                    }
                                                />
                                            </div>

                                            <p className={styles.error}>
                                                {errors ? (
                                                    <>{errors?.ecoChooseBank}</>
                                                ) : null}
                                            </p>
                                        </div>
                                    ) : null}
                                    <div className={styles.formGroup}>
                                        {firstTitle ===
                                        'Create USSD Payment Code' ? (
                                            <label>Payer name</label>
                                        ) : (
                                            <label>Payment title</label>
                                        )}
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
                                    {firstTitle ===
                                    'Create USSD Payment Code' ? null : (
                                        <div className={styles.formGroup}>
                                            <label>Description</label>
                                            <textarea
                                                name="description"
                                                id=""
                                                placeholder="Enter note to be displayed to customer."
                                                value={values.description}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'description',
                                                        e.target.value
                                                    );
                                                }}
                                            ></textarea>
                                            <p className={styles.error}>
                                                {errors?.description?.message}
                                            </p>
                                        </div>
                                    )}
                                    <br />
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
                                            loads={
                                                dynamicQrLoad ||
                                                ussdRefferenceLoad
                                            }
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

export default ReceivePaymentFirst;
