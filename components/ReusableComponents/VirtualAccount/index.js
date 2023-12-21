import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOrdrVirtualAccountMutation } from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import CloseButton from '../CloseButtonSvg';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import VirtualAccountValidity from '../VirtualAccountValidity';
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
    const { profile } = useSelector((store) => store);
    const { allAccountInfo } = useSelector((store) => store);
    const initialValues = {
        ecoAccountId: '',
        ecoSourceAccount: '',
        productName: '',
        accountNumber: '',
        amount: '',
        paymentTitle: '',
        phoneNumbr: '',
        description: '',
        phoneNumber: ''
    };
    const [
        ordrVirtualAccount,
        {
            data: ordrVirtualAccountData,
            isLoading: ordrVirtualAccountLoad,
            isSuccess: ordrVirtualAccountSuccess,
            isError: ordrVirtualAccountFalse,
            error: ordrVirtualAccountErr,
            reset: ordrVirtualAccountReset
        }
    ] = useOrdrVirtualAccountMutation();
    const showQrToastMessage = () => {
        toast.error(ordrVirtualAccountErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (ordrVirtualAccountErr) {
            showQrToastMessage();
        }
    }, [ordrVirtualAccountErr]);
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
                                    amount: values?.amount,
                                    customerId: values?.phoneNumber,
                                    serviceDescription: values?.narration,
                                    smeAccountNumber: values?.ecoSourceAccount,
                                    smeMerchantName: `${profile?.user?.firstName} ${profile?.user?.lastName}`,
                                    transactionPin: otpValue
                                };
                                ordrVirtualAccount(data);
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
                            }) =>
                                ordrVirtualAccountData ? (
                                    <VirtualAccountValidity
                                        data={ordrVirtualAccountData}
                                    />
                                ) : (
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
                                                {allAccountInfo.length > 0
                                                    ? allAccountInfo
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
                                                          })
                                                    : null}
                                            </select>
                                            <p className={styles.error}>
                                                {errors ? (
                                                    <>
                                                        {
                                                            errors?.ecoSourceAccount
                                                        }
                                                    </>
                                                ) : null}
                                            </p>
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <label>Clientst Name</label>
                                            <input
                                                placeholder="Name"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'productName',
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <label>Amount</label>
                                            <input
                                                placeholder="Amount"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'amount',
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <label>Phone Number</label>
                                            <input
                                                placeholder="Narration"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'phoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                type="number"
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <label>Narration</label>
                                            <input
                                                placeholder="Narration"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'narration',
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <div className={styles.transaction}>
                                                <label>Transaction Pin</label>
                                                <OtpInput
                                                    onOtpChange={
                                                        handleOtpChange
                                                    }
                                                    otpfields={6}
                                                />
                                            </div>
                                        </div>
                                        <ButtonComp
                                            disabled={true}
                                            active={'active'}
                                            text={'Pay via account'}
                                            type="submit"
                                            loads={ordrVirtualAccountLoad}
                                        />
                                    </form>
                                )
                            }
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
