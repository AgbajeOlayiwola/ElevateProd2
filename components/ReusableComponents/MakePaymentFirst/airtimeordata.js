import { Formik } from 'formik';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useAirNetworksMutation,
    useAirtimeTopupMutation,
    useBillerDetailsMutation
} from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import Loader from '../Loader';
import socialdata from '../Lotties/loading.json';
import OtpInput from '../Otpinput';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');

const AirtimeOrData = ({
    action,
    firstTitle,
    buttonText,
    arrowAction,
    airtimeAction,
    scheduleLater,
    dataAction,
    isLoading,
    bankAccounts,
    formData,
    setFormdata,
    backAction,
    closeAction
}) => {
    const [network, setNetwork] = useState();
    const [networkData, setNetworkData] = useState([]);
    const [beneActive, setBeneActive] = useState();
    // const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState();
    const [billerId, setBillerId] = useState('');
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    const [airtimebeneficiaries, setAirtimeBeneficiaries] = useState([]);
    const [isLoadingg, setIsLoading] = useState(true);
    const [isLoadinggg, setIsLoadinggg] = useState(false);
    const [bene, setBene] = useState(false);
    const dispatch = useDispatch();
    const affiliate = localStorage.getItem('affiliateCode');
    const [currency, setCurrency] = useState();

    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [showForm, setShowForm] = useState(true);
    const [billerCodes, setBillerCodes] = useState();
    const [showOtherFields, setShowOtherFields] = useState(false);
    const [arrayAmmount, setArryAmaount] = useState([]);
    const [selectedAmountType, setSelectedAmountType] = useState();

    const [
        airNetworks,
        {
            data: airNetworksData,
            isLoading: airNetworksLoad,
            isSuccess: airNetworksSuccess,
            isError: airNetworksFalse,
            error: airNetworksErr,
            reset: airNetworksReset
        }
    ] = useAirNetworksMutation();

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
        airtimeTopup,
        {
            data: airtimeTopupData,
            isLoading: airtimeTopupLoad,
            isSuccess: airtimeTopupSuccess,
            isError: airtimeTopupFalse,
            error: airtimeTopupErr,
            reset: airtimeTopupReset
        }
    ] = useAirtimeTopupMutation();

    const initialValues = {
        networkCode: '',
        ecoSourceAccount: '',
        ammount: '',
        phoneNumbr: '',
        ecoSourceAccount: '',
        Narration: ''
    };

    useEffect(() => {
        if (airNetworksSuccess) {
            setNetworkData(airNetworksData?.data);
            console.log(airNetworksData?.data?.networks);
        }
    }, [airNetworksSuccess]);
    const { allAccountInfo } = useSelector((store) => store);
    const showSuccessToastMessage = () => {
        toast.success('Airtime payment Successfull', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        closeAction();
    };
    useEffect(() => {
        if (airtimeTopupErr) {
            showSuccessToastMessage();
        }
    }, [airtimeTopupErr]);
    const [otpValue, setOtpValue] = useState('');
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    return (
        <>
            <ToastContainer />
            <div>
                <h2 className={styles.firstTitle}>{firstTitle}</h2>
                <div className={styles.billBody}>
                    <Formik
                        // validationSchema={initSchema}
                        // validateOnChange={true}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values);
                            const data = {
                                transactionReference: '',
                                transactionAmount: values?.ammount,
                                accountNumber: values?.ecoSourceAccount,
                                paymentDescription: values?.Narration,
                                affiliateCode: affiliate,
                                billerCode: values?.networkCode,
                                billerId:
                                    billerDetailsData?.data?.billerDetail
                                        ?.billerID,
                                productCode:
                                    billerDetailsData?.data
                                        ?.billerProductInfo[0]?.productCode,
                                currency:
                                    countryToCurrency[
                                        `${affiliate.substring(1)}`
                                    ],
                                mobileNumber: values?.phoneNumbr,
                                transactionPin: otpValue
                            };
                            console.log(data);
                            airtimeTopup(data);
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
                                <div>
                                    <label>Airtime or Data</label>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value === 'airtime') {
                                                airNetworks(null);
                                            }
                                        }}
                                    >
                                        <option value="">Choose</option>
                                        <option value="airtime">Airtime</option>
                                        <option value="data">Data</option>
                                    </select>
                                </div>
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
                                                (account) => account.accountNo
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
                                            <>{errors?.ecoSourceAccount}</>
                                        ) : null}
                                    </p>
                                </div>
                                <br />
                                {airNetworksLoad ? (
                                    <Loader />
                                ) : (
                                    <div>
                                        <label>Select network</label>
                                        <select
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'networkCode',
                                                    e.target.value
                                                ),
                                                    billerDetails({
                                                        billerCode:
                                                            e.target.value
                                                    });
                                                const selBiller =
                                                    airNetworksData?.data?.networks.find(
                                                        (item) =>
                                                            e.target.value ===
                                                            item?.code
                                                    );
                                                if (selBiller) {
                                                    console.log(
                                                        selBiller?.amountType
                                                    );
                                                    setArryAmaount(
                                                        selBiller?.amount.split(
                                                            ','
                                                        )
                                                    );
                                                    setSelectedAmountType(
                                                        selBiller?.amountType
                                                    );
                                                }
                                                setShowOtherFields(true);
                                            }}
                                        >
                                            <option>Choose Network</option>
                                            {airNetworksData?.data?.networks.map(
                                                (data, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={data?.code}
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
                                        {selectedAmountType === 'V' ? (
                                            <div>
                                                <label>Ammount</label>
                                                <div className={styles.ammt}>
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
                                                                e.target.value
                                                            );
                                                        }}
                                                        type="text"
                                                        placeholder="data"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <label>
                                                    Ammount{' '}
                                                    {getSymbolFromCurrency(
                                                        countryToCurrency[
                                                            `${affiliate.substring(
                                                                1
                                                            )}`
                                                        ]
                                                    )}
                                                </label>
                                                <div className={styles.ammt}>
                                                    <select
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                'ammount',
                                                                e.target.value
                                                            );
                                                        }}
                                                        type="text"
                                                        placeholder="data"
                                                    >
                                                        <option>
                                                            Choose Amount
                                                        </option>
                                                        {arrayAmmount?.map(
                                                            (item, index) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        <br />
                                        <div>
                                            <label>Narration</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'Narration',
                                                        e.target.value
                                                    );
                                                }}
                                                type="text"
                                                placeholder="phone number"
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <p>Transaction Pin</p>
                                        <div className={styles.transaction}>
                                            <OtpInput
                                                onOtpChange={handleOtpChange}
                                                otpfields={6}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                    </>
                                ) : null}
                                <br />
                                <br />

                                <ButtonComp
                                    disabled={true}
                                    active={'active'}
                                    text={buttonText}
                                    type="submit"
                                    loads={airtimeTopupLoad}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};
export default AirtimeOrData;