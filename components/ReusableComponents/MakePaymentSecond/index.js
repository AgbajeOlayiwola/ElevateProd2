import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBulkTransferMutation,
    useCreateTxBeneficiaryMutation,
    useSingleTransferMutation
} from '../../../redux/api/authApi';
import { clearTransfer } from '../../../redux/slices/transferSlice';
import ArrowBackSvg from '../ArrowBackSvg';
import ButtonComp from '../Button';
import CloseButton from '../CloseButtonSvg';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import {
    RegistrationStatus,
    SuccessMainHeading
} from '../PaymentSuccess/styles.module';
import ConfirmLockSvg from '../ReusableSvgComponents/ConfirmLockSvg';
import SuccessCheckSvg from '../ReusableSvgComponents/SuccessCheckSvg';
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
        toast.success('Transfer Successfull', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // setTimeout(() => {
        //     // closeAction();
        //     dispatch(clearTransfer());
        // }, 7000);
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
    const [totalAmount, setTotalAmount] = useState();

    useEffect(() => {
        if (title === 'Bulk Payments') {
            setTotalAmount(
                transfer.reduce((sum, item) => {
                    const transactionAmount = parseFloat(
                        item.transactionAmount
                    );
                    if (!isNaN(transactionAmount)) {
                        return sum + transactionAmount;
                    }
                    return sum;
                }, 0)
            );
        }
    }, []);

    const showBulkSuccessToastMessage = () => {
        toast.success(bulkTransferData?.responseMessage, {
            autoClose: 10000,
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // setTimeout(() => {
        //     // closeAction();

        // }, 7000);
    };
    useEffect(() => {
        if (bulkTransferSuccess) {
            showBulkSuccessToastMessage();
        }
    }, [bulkTransferSuccess]);

    const showBulkErrorToastMessage = () => {
        toast.error(bulkTransferErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (bulkTransferErr) {
            showBulkErrorToastMessage();
        }
    }, [bulkTransferErr]);
    console.log('Total Amount:', transfer);

    // console.log(transfer);
    const [
        createTxBeneficiary,
        {
            data: createTxBeneficiaryData,
            isLoading: createTxBeneficiaryLoad,
            isSuccess: createTxBeneficiarySuccess,
            isError: createTxBeneficiaryFalse,
            error: createTxBeneficiaryErr,
            reset: createTxBeneficiaryReset
        }
    ] = useCreateTxBeneficiaryMutation();
    const saveBeneficiary = () => {
        const data = {
            beneficiaryName: transfer?.beneficiaryName,
            accountNumber: transfer?.accountNumber,
            bankName: transfer?.bankName,
            bankCode: transfer?.bankCode
        };
        createTxBeneficiary(data);
    };
    const showBeneToast = () => {
        toast.succes('Bneficiary Addd Successfuly', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (createTxBeneficiarySuccess) {
            showBeneToast();
        }
    }, [createTxBeneficiarySuccess]);

    return (
        <Overlay overlay={overlay}>
            <ToastContainer />
            <>
                {singleTransferSuccess || bulkTransferSuccess ? (
                    <>
                        <div className={styles.PaymentSecond}>
                            <div className={styles.successPage}>
                                <div className={styles.successCheck}>
                                    <div>
                                        <SuccessCheckSvg />
                                    </div>
                                </div>

                                <RegistrationStatus>
                                    <SuccessMainHeading>
                                        Transfer Successful
                                    </SuccessMainHeading>

                                    {title === 'Bulk Payments' ? null : (
                                        <p style={{ textAlign: 'center' }}>
                                            {getSymbolFromCurrency(
                                                countryToCurrency[
                                                    `${affiliate?.substring(1)}`
                                                ]
                                            )}
                                            {parseFloat(
                                                transfer?.transactionAmount
                                            )
                                                .toFixed(2)
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ','
                                                )}{' '}
                                            will be transferred to{' '}
                                            {transfer?.beneficiaryName}
                                        </p>
                                    )}
                                    <ButtonComp
                                        disabled={true}
                                        active={'active'}
                                        text="Close"
                                        type="button"
                                        onClick={() => {
                                            closeAction(),
                                                dispatch(clearTransfer());
                                        }}
                                    />
                                </RegistrationStatus>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className={styles.PaymentSecond}>
                            <div className={styles.icons}>
                                <div className={styles.backIcon}>
                                    <ArrowBackSvg
                                        color="#102572"
                                        action={backAction}
                                    />
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
                                            {title === 'Bulk Payments'
                                                ? parseFloat(totalAmount)
                                                      .toFixed(2)
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ','
                                                      )
                                                : parseFloat(
                                                      transfer?.transactionAmount
                                                  )
                                                      .toFixed(2)
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ','
                                                      )}
                                        </h3>
                                    </div>
                                )}
                                {title === 'Bills Payment' ? (
                                    <div className={styles.transactiondetails}>
                                        <div
                                            className={
                                                styles.transactionsingles
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                To
                                            </p>
                                            <h3>{transfer?.beneficiaryName}</h3>
                                        </div>
                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                Platform
                                            </p>
                                            <h3>
                                                <span></span> {recieverBank}
                                            </h3>
                                        </div>
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
                                            <h3>
                                                {transfer?.totalCharge
                                                    ? getSymbolFromCurrency(
                                                          countryToCurrency[
                                                              `${affiliate?.substring(
                                                                  1
                                                              )}`
                                                          ]
                                                      ) +
                                                      parseFloat(
                                                          transfer?.totalCharge
                                                              ? transfer?.totalCharge
                                                              : 0
                                                      )
                                                          .toFixed(2)
                                                          .replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ','
                                                          )
                                                    : getSymbolFromCurrency(
                                                          countryToCurrency[
                                                              `${affiliate?.substring(
                                                                  1
                                                              )}`
                                                          ]
                                                      ) + 0.0}
                                            </h3>
                                        </div>
                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                From
                                            </p>
                                            <h3>{transfer?.accountNumber}</h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.transactiondetails}>
                                        <div
                                            className={
                                                styles.transactionsingles
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                To
                                            </p>
                                            <h3>
                                                {title === 'Bulk Payments'
                                                    ? `${transfer.length} Recipient`
                                                    : transfer?.beneficiaryName}
                                            </h3>
                                        </div>
                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                Beneficiary Bank
                                            </p>
                                            <h3>
                                                <span></span>{' '}
                                                {title === 'Bulk Payments'
                                                    ? `${transfer.length} banks`
                                                    : transfer?.destinationBank}
                                            </h3>
                                        </div>

                                        {title === 'Single Transfer' ? (
                                            recieverBank ===
                                            'ECOBANK' ? null : (
                                                <div
                                                    className={
                                                        styles.transactionsingle
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            styles.transactionTitle
                                                        }
                                                    >
                                                        Charges
                                                    </p>
                                                    <h3>
                                                        {' '}
                                                        {getSymbolFromCurrency(
                                                            countryToCurrency[
                                                                `${affiliate?.substring(
                                                                    1
                                                                )}`
                                                            ]
                                                        )}{' '}
                                                        {parseFloat(
                                                            transfer?.totalCharge
                                                                ? transfer?.totalCharge
                                                                : 0
                                                        )
                                                            .toFixed(2)
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ','
                                                            )}
                                                    </h3>
                                                </div>
                                            )
                                        ) : null}

                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                From
                                            </p>
                                            <h3>
                                                {title === 'Bulk Payments'
                                                    ? transfer[0].accountNumber
                                                    : transfer?.accountNumber}
                                            </h3>
                                        </div>
                                    </div>
                                )}
                                <form>
                                    {title === 'Single Transfer' ? (
                                        beneActive ? null : (
                                            <div className={styles.saveBene}>
                                                <label
                                                    onClick={saveBeneficiary}
                                                    className={styles.beneCheck}
                                                >
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
                                        active={'active'}
                                        text="Confirm"
                                        type="submit"
                                        onClick={
                                            title === 'Single Transfer'
                                                ? transferFunction
                                                : bulkTransferAction
                                        }
                                        loads={
                                            singleTransferLoad ||
                                            bulkTransferLoad
                                        }
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </Overlay>
    );
};

export default MakePaymentSecond;
