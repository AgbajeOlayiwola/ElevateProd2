import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBillerDetailsMutation,
    useBillerValidationMutation,
    useMobiNetworksMutation,
    useMobileMoneyMutation
} from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import Loader from '../Loader';
import socialdata from '../Lotties/loading.json';
import OtpInput from '../Otpinput';
import {
    RegistrationStatus,
    SuccessMainHeading
} from '../PaymentSuccess/styles.module';
import SuccessCheckSvg from '../ReusableSvgComponents/SuccessCheckSvg';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const MobileMoney = ({ firstTitle, closeAction }) => {
    const dispatch = useDispatch();
    const [selectedAmountType, setSelectedAmountType] = useState();
    const [billerId, setBillerId] = useState();
    const affiliate = localStorage.getItem('affiliateCode');
    const [showOtherFields, setShowOtherFields] = useState(false);
    const [arrayAmmount, setArryAmaount] = useState([]);
    const [otpValue, setOtpValue] = useState('');
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const { allAccountInfo } = useSelector((store) => store);
    const initialValues = {
        ecoSourceAccount: '',
        ammount: '',
        phoneNumbr: '',
        naration: '',
        customer_name: ''
    };

    const [
        mobiNetworks,
        {
            data: mobiNetworksData,
            isLoading: mobiNetworksLoad,
            isSuccess: mobiNetworksSuccess,
            isError: mobiNetworksFalse,
            error: mobiNetworksErr,
            reset: mobiNetworksReset
        }
    ] = useMobiNetworksMutation();
    const [
        mobileMoney,
        {
            data: mobileMoneyData,
            isLoading: mobileMoneyLoad,
            isSuccess: mobileMoneySuccess,
            isError: mobileMoneyFalse,
            error: mobileMoneyErr,
            reset: mobileMoneyReset
        }
    ] = useMobileMoneyMutation();
    const [
        billerDetails,
        {
            data: billerDetailsData,
            isLoading: billerDetailsLoad,
            isSuccess: billerDetailsSuccess,
            isError: billerDetailsFalse,
            error: billerDetailsErr,
            reset: billerDetailsReset
        }
    ] = useBillerDetailsMutation();
    const [
        billerValidation,
        {
            data: billerValidationData,
            isLoading: billerValidationLoad,
            isSuccess: billerValidationSuccess,
            isError: billerValidationFalse,
            error: billerValidationErr,
            reset: billerValidationReset
        }
    ] = useBillerValidationMutation();

    useEffect(() => {
        mobiNetworks();
    }, []);
    console.log(mobiNetworksData);

    const showSuccessToastMessage = () => {
        toast.success('Mobile money payment Successfull', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (mobileMoneySuccess) {
            showSuccessToastMessage();
        }
    }, [mobileMoneySuccess]);
    const validateBiller = (values) => {
        const data = {
            transactionReference: '',
            transactionAmount: values?.ammount,
            accountNumber: values?.ecoSourceAccount,
            billerCode: billerDetailsData?.data?.billerDetail?.billerCode,
            billerId: billerId,
            customerName: '',
            transactionType: 'MOBILEMONEY',
            productCode:
                billerDetailsData?.data?.billerProductInfo[0]?.productCode,
            currency: countryToCurrency[`${affiliate.substring(1)}`],
            formDataValue: [
                {
                    fieldName: 'BEN_PHONE_NO',
                    fieldValue: values?.phoneNumbr,
                    dataType: 'string'
                }
            ]
        };
        console.log(data);
        billerValidation(data);
    };
    return (
        <div>
            {mobileMoneySuccess ? (
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
                                    Mobile Money Transfer Successful
                                </SuccessMainHeading>

                                <h4 className={styles.elevateSuccess}>
                                    {billerValidationData?.data?.customerName}
                                </h4>

                                <ButtonComp
                                    disabled={true}
                                    active={'active'}
                                    text="Close"
                                    type="button"
                                    onClick={closeAction}
                                />
                            </RegistrationStatus>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <ToastContainer />
                    <h2 className={styles.firstTitle}>Mobile Money</h2>
                    <div>
                        <div className={styles.mainDv}>
                            <Formik
                                // validationSchema={initSchema}
                                // validateOnChange={true}
                                initialValues={initialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    const data = {
                                        transactionReference: '',
                                        transactionAmount: values?.ammount,
                                        accountNumber: values?.ecoSourceAccount,
                                        paymentDescription: values?.naration,
                                        description: 'jhgfd',
                                        billerCode:
                                            billerDetailsData?.data
                                                ?.billerDetail?.billerCode,
                                        billerId: billerId,
                                        productCode:
                                            billerDetailsData?.data
                                                ?.billerProductInfo[0]
                                                ?.productCode,
                                        currency:
                                            countryToCurrency[
                                                `${affiliate.substring(1)}`
                                            ],
                                        mobileNumber: values?.phoneNumbr,
                                        transactionPin: otpValue
                                    };
                                    mobileMoney(data);
                                    // nextPage();
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
                                        {mobiNetworksLoad ? (
                                            <Loader />
                                        ) : (
                                            <div>
                                                <label>Choose Network</label>
                                                <select
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'networkCode',
                                                            e.target.value
                                                        );
                                                        // billerDetails({
                                                        //     billerCode:
                                                        //         e.target.value
                                                        // });
                                                        const selBiller =
                                                            mobiNetworksData?.data?.networks.find(
                                                                (item) =>
                                                                    e.target
                                                                        .value ===
                                                                    item?.code
                                                            );
                                                        billerDetails({
                                                            billerCode:
                                                                e.target.value
                                                        });

                                                        if (selBiller) {
                                                            setBillerId(
                                                                selBiller?.id
                                                            );
                                                            console.log(
                                                                selBiller?.amountType
                                                            );
                                                            if (
                                                                selBiller?.amount
                                                            ) {
                                                                setArryAmaount(
                                                                    selBiller?.amount.split(
                                                                        ','
                                                                    )
                                                                );
                                                            }
                                                            setSelectedAmountType(
                                                                selBiller?.amountType
                                                            );
                                                        }
                                                        setShowOtherFields(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <option>
                                                        Choose biller details
                                                    </option>
                                                    {mobiNetworksData?.data?.networks.map(
                                                        (data, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        data?.code
                                                                    }
                                                                >
                                                                    {data?.name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        <br />
                                        {billerDetailsLoad ? (
                                            <Loader />
                                        ) : showOtherFields ? (
                                            <>
                                                <div>
                                                    <label>Phone Number</label>
                                                    <input
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                'phoneNumbr',
                                                                e.target.value
                                                            );
                                                        }}
                                                        type="text"
                                                        placeholder="phone number"
                                                    />
                                                </div>
                                                <br />
                                                <br />

                                                <div>
                                                    <label>Amount</label>
                                                    <div
                                                        className={styles.ammt}
                                                    >
                                                        <p>
                                                            {getSymbolFromCurrency(
                                                                countryToCurrency[
                                                                    `${affiliate.substring(
                                                                        1
                                                                    )}`
                                                                ]
                                                            )}
                                                        </p>
                                                        <input
                                                            onChange={(e) => {
                                                                setFieldValue(
                                                                    'ammount',
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            onBlur={() =>
                                                                validateBiller(
                                                                    values
                                                                )
                                                            }
                                                            type="text"
                                                            placeholder="Amount"
                                                        />
                                                    </div>
                                                </div>

                                                <br />
                                            </>
                                        ) : null}
                                        {billerValidationLoad ? (
                                            <Loader />
                                        ) : !billerValidationData ? null : (
                                            <>
                                                <div>
                                                    <label>Customer Name</label>
                                                    <div
                                                        className={styles.ammt}
                                                    >
                                                        <input
                                                            value={
                                                                billerValidationData
                                                                    ?.data
                                                                    ?.customerName
                                                            }
                                                            type="text"
                                                            placeholder="customer name"
                                                        />
                                                    </div>
                                                </div>
                                                <br />
                                                <br />
                                                <div>
                                                    <label>Narration</label>
                                                    <div
                                                        className={styles.ammt}
                                                    >
                                                        <input
                                                            onChange={(e) => {
                                                                setFieldValue(
                                                                    'naration',
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            type="text"
                                                            placeholder="Narration"
                                                        />
                                                    </div>
                                                </div>
                                                <br />
                                                <br />
                                                <p>Transaction Pin</p>
                                                <div
                                                    className={
                                                        styles.transaction
                                                    }
                                                >
                                                    <OtpInput
                                                        onOtpChange={
                                                            handleOtpChange
                                                        }
                                                        otpfields={6}
                                                    />
                                                </div>
                                                <br />
                                                <br />
                                            </>
                                        )}
                                        <ButtonComp
                                            disabled={true}
                                            active={'active'}
                                            text={'Make Payment'}
                                            type="submit"
                                            loads={mobileMoneyLoad}
                                        />
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default MobileMoney;
