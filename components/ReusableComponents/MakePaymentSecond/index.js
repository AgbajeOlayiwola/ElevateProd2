import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBulkTransferMutation,
    useSingleTransferMutation
} from '../../../redux/api/authApi';
import { clearTransfer } from '../../../redux/slices/transferSlice';
import ArrowBackSvg from '../ArrowBackSvg';
import ButtonComp from '../Button';
import CloseButton from '../CloseButtonSvg';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import ConfirmLockSvg from '../ReusableSvgComponents/ConfirmLockSvg';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const MakePaymentSecond = ({
    overlay,
    transferAction,
    amount,
    sender,
    recieverName,
    recieverBank,
    title,
    refNuber,
    number,
    isLoading,
    closeAction,
    backAction,
    charges,
    formData,
    setFormdata
}) => {
    const numOfFields = 6;
    const [activeBtn, setActiveBtn] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const [beneActive, setBeneActive] = useState(false);
    const { transfer } = useSelector((store) => store);
    const [otpValue, setOtpValue] = useState('');
    const affiliate = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    console.log(transfer);
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    console.log(otpValue);
    const transferFunction = (e) => {
        e.preventDefault();
        const data = {
            ...transfer,
            transactionPin: otpValue
        };
        console.log(data);
        singleTransfer(data);
    };
    const [
        singleTransfer,
        {
            data: singleTransferData,
            isLoading: singleTransferLoad,
            isSuccess: singleTransferSuccess,
            isError: singleTransferFalse,
            error: singleTransferErr,
            reset: singleTransferReset
        }
    ] = useSingleTransferMutation();
    const [
        bulkTransfer,
        {
            data: bulkTransferData,
            isLoading: bulkTransferLoad,
            isSuccess: bulkTransferSuccess,
            isError: bulkTransferFalse,
            error: bulkTransferErr,
            reset: bulkTransferReset
        }
    ] = useBulkTransferMutation();
    const showToastMessage = () => {
        toast.error(singleTransferErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (singleTransferErr) {
            showToastMessage();
        }
    }, [singleTransferErr]);
    const showSuccessToastMessage = () => {
        toast.success('Transafr Successfull', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        closeAction();
        dispatch(clearTransfer());
    };
    useEffect(() => {
        if (singleTransferSuccess) {
            showSuccessToastMessage();
        }
    }, [singleTransferSuccess]);
    const bulkTransferAction = (e) => {
        e.preventDefault();
        const data = {
            ...transfer,
            transactionPin: otpValue
        };
        console.log(data);
        bulkTransfer(data);
    };

    return (
        <Overlay overlay={overlay}>
            <ToastContainer />
            <div>
                <div className={styles.PaymentSecond}>
                    <div className={styles.icons}>
                        <div className={styles.backIcon}>
                            <ArrowBackSvg color="#102572" action={backAction} />
                        </div>
                        <div className={styles.closeCont}>
                            <CloseButton
                                color="#A5A5A5"
                                classes={styles.closeBtn}
                                action={closeAction}
                            />
                        </div>
                    </div>
                    <div className={styles.PaymentSecondCont}>
                        <div className={styles.svgLock}>
                            <div>
                                <ConfirmLockSvg />
                            </div>
                        </div>
                        <h2>Confirm Transaction</h2>
                        {amount === 'sum' ? null : (
                            <div className={styles.transactionamount}>
                                <p>Amount</p>
                                <h3>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            `${affiliate.substring(1)}`
                                        ]
                                    )}
                                    {transfer?.transactionAmount}
                                </h3>
                            </div>
                        )}
                        {title === 'Bills Payment' ? (
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>{transfer?.beneficiaryName}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Platform
                                    </p>
                                    <h3>
                                        <span></span> {recieverBank}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Charges
                                    </p>
                                    <h3>{charges}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{transfer?.accountNumber}</h3>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>
                                        {title === 'Bulk Payments'
                                            ? `${number} Recipient`
                                            : transfer?.destinationAccountNo}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Beneficiary Bank
                                    </p>
                                    <h3>
                                        <span></span>{' '}
                                        {title === 'Bulk Payments'
                                            ? `${number} banks`
                                            : transfer?.destinationBank}
                                    </h3>
                                </div>

                                {title === 'Single Transfer' ? (
                                    recieverBank === 'ECOBANK' ? null : (
                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                Charges
                                            </p>
                                            <h3>{charges}</h3>
                                        </div>
                                    )
                                ) : null}

                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{transfer?.accountNumber}</h3>
                                </div>
                            </div>
                        )}
                        <form>
                            {title === 'Single Transfer' ? (
                                beneActive ? null : (
                                    <div className={styles.saveBene}>
                                        <label className={styles.beneCheck}>
                                            <input
                                                type="checkbox"
                                                name="beneficiary"
                                            />
                                            <span>
                                                <i></i>
                                            </span>
                                        </label>
                                        <p>Save Beneficiary</p>
                                    </div>
                                )
                            ) : null}
                            <h4>Enter Transaction Pin</h4>
                            <div className={styles.otpSect}>
                                <OtpInput
                                    onOtpChange={handleOtpChange}
                                    otpfields={6}
                                />
                            </div>
                            <ButtonComp
                                disabled={true}
                                active={false}
                                text="Confirm"
                                type="submit"
                                onClick={
                                    title === 'Single Transfer'
                                        ? transferFunction
                                        : bulkTransferAction
                                }
                                loads={singleTransferLoad}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentSecond;
