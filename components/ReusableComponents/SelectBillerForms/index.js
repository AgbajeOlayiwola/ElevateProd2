import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import {
    useBillerPaymentMutation,
    useBillerValidationMutation
} from '../../../redux/api/authApi';
import { processObjects } from '../../../utils/processObject';
import ButtonComp from '../Button';
import Loader from '../Loader';
import OtpInput from '../Otpinput';
import {
    RegistrationStatus,
    SuccessMainHeading
} from '../PaymentSuccess/styles.module';
import SuccessCheckSvg from '../ReusableSvgComponents/SuccessCheckSvg';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const SelectBillerForms = ({ billerDatails }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const { profile } = useSelector((store) => store);
    const [showOtherFields, setShowOtherFields] = useState(false);
    const [prodCode, setProdCode] = useState('');
    const [currncy, setCurrency] = useState();
    const [initialFormValues, setInitialFormValues] = useState({});
    const [accountNo, setAccountNo] = useState();
    const [arrayAmmount, setArryAmaount] = useState([]);
    const [selectedAmountType, setSelectedAmountType] = useState();
    const affiliate = localStorage.getItem('affiliateCode');
    const [otpValue, setOtpValue] = useState('');
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
    const [
        billerPayment,
        {
            data: billerPaymentData,
            isLoading: billerPaymentLoad,
            isSuccess: billerPaymentSuccess,
            isError: billerPaymentFalse,
            error: billerPaymentErr,
            reset: billerPaymentReset
        }
    ] = useBillerPaymentMutation();
    const formRef = useRef();
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const generateSchemaAndInitialValues = (fields) => {
        const schemaShape = {};
        const initialValues = {};
        fields?.forEach((field) => {
            const fieldName = field?.fieldName;
            const label = field?.fieldTitle || fieldName;

            // Build Yup schema based on field data type (You may need to adjust this part)
            if (field?.dataType === 'String') {
                schemaShape[fieldName] = yup.string();
            } else {
                // Handle other data types if needed
            }

            // Add validation rules if required (You can adjust this part)
            // if (field?.validateField === 'N') {
            schemaShape[fieldName] = schemaShape[fieldName]?.required(
                `Please enter your ${label}`
            );
            // }

            // Set initial values (You may use defaultValue if available)
            initialValues[fieldName] = field?.defaultValue || '';

            // For email fields, add email validation
            if (field?.fieldName?.toLowerCase()?.includes('email')) {
                schemaShape[fieldName] =
                    schemaShape[fieldName]?.email('Invalid email');
            }
        });

        const schema = yup.object().shape(schemaShape);

        return { schema, initialValues };
    };
    const { schema, initialValues } = generateSchemaAndInitialValues(
        billerDatails?.billFormData
    );
    useEffect(() => {
        console.log(formRef?.current?.values);
        if (prodCode.length > 1 && formRef?.current?.values) {
            if (billerDatails?.billerDetail?.validationRequired === 'Y') {
                const formVal = formRef?.current?.values;
                console.log(formVal.ammount);
                const formDataValue = processObjects(
                    formVal,
                    billerDatails?.billFormData
                );
                const data = {
                    customerName: `${profile?.user?.firstName} ${profile?.user?.lastName}`,
                    billerCode: billerDatails?.billerDetail?.billerCode,
                    transactionReference: '',
                    transactionType: 'BILLPAY',
                    billerId: billerDatails?.billerDetail?.billerID.toString(),
                    accountNumber: accountNo,
                    productCode: prodCode,
                    description: 'jhgfd',
                    transactionAmount: formRef?.current?.values?.ammount,
                    // productCode ||
                    // billerInfo?.billerProductInfo?.[0]?.productCode?.toString() ||
                    // '',
                    currency: currncy,
                    formDataValue
                };
                billerValidation(data);
                console.log(data);
            }
        }
    }, [prodCode]);
    // Function to dynamically update initial form values

    const { allAccountInfo } = useSelector((store) => store);
    const showBillValToastMessage = () => {
        toast.success('Biller Validation Successful', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (billerValidationSuccess) {
            showBillValToastMessage();
        }
    }, [billerValidationSuccess]);
    const showBillerValErrorToastMessage = () => {
        toast.error(billerValidationErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (billerValidationErr) {
            showBillerValErrorToastMessage();
        }
    }, [billerValidationErr]);
    const showErrorToastMessage = () => {
        toast.error(billerPaymentErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (billerPaymentErr) {
            showErrorToastMessage();
        }
    }, [billerPaymentErr]);
    const showSuccessToastMessage = () => {
        toast.success('Bill Payment Successful', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (billerPaymentSuccess) {
            showSuccessToastMessage();
        }
    }, [billerPaymentSuccess]);
    return (
        <>
            <ToastContainer />
            <div>
                <h4>{billerDatails?.billerDetail?.billerName}</h4>
                {/* <p>{billerDatails?.billerDetail?.billerDescription}</p> */}
            </div>
            {billerPaymentSuccess ? (
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
                <Formik
                    innerRef={formRef}
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                        const formVal = formRef?.current?.values;
                        console.log(formVal.ammount);
                        const formDataValue = processObjects(
                            formVal,
                            billerDatails?.billFormData
                        );
                        const data = {
                            customerName: `${profile?.user?.firstName} ${profile?.user?.lastName}`,
                            billerCode: billerDatails?.billerDetail?.billerCode,
                            transactionReference: '',
                            transactionType: 'BILLPAY',
                            transactionPin: otpValue,
                            billerId:
                                billerDatails?.billerDetail?.billerID.toString(),
                            accountNumber: accountNo,
                            productCode: prodCode,
                            transactionAmount:
                                formRef?.current?.values?.ammount,
                            // productCode ||
                            // billerInfo?.billerProductInfo?.[0]?.productCode?.toString() ||
                            // '',
                            paymentDescription: 'test',
                            currency: currncy,
                            formDataValue
                        };
                        billerPayment(data);
                        validatee();
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
                                            setAccountNo(
                                                selectedAccount?.accountNo
                                            );
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
                                        .filter((account) => account.accountNo)
                                        .map((account) => {
                                            return (
                                                <>
                                                    <option
                                                        value={
                                                            account?.accountNo
                                                        }
                                                    >
                                                        <p>
                                                            {account?.accountNo}
                                                        </p>
                                                        {/* <p>
                                                        {account?.availableBal.toLocaleString()}
                                                    </p> */}
                                                    </option>
                                                </>
                                            );
                                        })}
                                </select>
                            </div>
                            <br />
                            <br />
                            {billerDatails?.billFormData?.map((field, index) =>
                                field?.dataType?.toLowerCase() === 'string' ? (
                                    <div key={index}>
                                        <label>{field.fieldName}</label>
                                        <input
                                            placeholder={field.fieldName}
                                            iconName1="mail"
                                            name={field?.fieldName}
                                            autoCorrect={false}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    field?.fieldTitle ||
                                                        field?.fieldName,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <br />
                                        <br />
                                    </div>
                                ) : null
                            )}

                            {selectedAmountType === 'V' ? (
                                <div>
                                    <label>Ammount</label>
                                    <div className={styles.ammt}>
                                        <p>
                                            {getSymbolFromCurrency(
                                                countryToCurrency[
                                                    `${affiliate.substring(1)}`
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
                                            name="ammount"
                                            type="text"
                                            placeholder="Amount"
                                        />
                                    </div>
                                </div>
                            ) : selectedAmountType === 'D' ? (
                                <div>
                                    <label>
                                        Ammount{' '}
                                        {getSymbolFromCurrency(
                                            countryToCurrency[
                                                `${affiliate.substring(1)}`
                                            ]
                                        )}
                                    </label>
                                    <div>
                                        <select
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'ammount',
                                                    e.target.value
                                                );
                                            }}
                                            name="ammount"
                                            type="text"
                                            placeholder="Amount"
                                        >
                                            <option>Choose Amount</option>
                                            {arrayAmmount?.map(
                                                (item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {item}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label>Ammount</label>
                                    <div className={styles.ammt}>
                                        <p>
                                            {getSymbolFromCurrency(
                                                countryToCurrency[
                                                    `${affiliate.substring(1)}`
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
                                            name="ammount"
                                            value={
                                                billerDatails?.billerProductInfo
                                                    ?.maxAmount
                                            }
                                            type="text"
                                            placeholder="Amount"
                                        />
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            )}
                            {billerDatails?.billerProductInfo ? (
                                <div>
                                    <label>Select network</label>
                                    <select
                                        onChange={(e) => {
                                            setProdCode(e.target.value);
                                            console.log(prodCode);
                                            const selBiller =
                                                billerDatails?.billerProductInfo.find(
                                                    (item) =>
                                                        e.target.value ===
                                                        item?.productCode
                                                );
                                            if (selBiller) {
                                                // console.log(selBiller?.prod);
                                                setCurrency(selBiller?.ccy);
                                                console.log(
                                                    selBiller?.amountType
                                                );
                                                if (selBiller?.amount) {
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
                                            // setShowOtherFields(true);
                                        }}
                                    >
                                        <option>Choose Product</option>
                                        {billerDatails?.billerProductInfo?.map(
                                            (data, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={
                                                            data?.productCode
                                                        }
                                                    >
                                                        {data?.productName}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <br />
                                    <br />
                                </div>
                            ) : null}
                            {billerValidationLoad ? (
                                <>
                                    <p style={{ textAlign: 'center' }}>
                                        Bills Payment Is Being Validated
                                    </p>
                                    <Loader />
                                </>
                            ) : null}
                            <label>Transaction Pin</label>
                            <div className={styles.transaction}>
                                <OtpInput
                                    onOtpChange={handleOtpChange}
                                    otpfields={6}
                                />
                            </div>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text={'Make Payment'}
                                loads={billerPaymentLoad}
                                type="submit"
                            />
                        </form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default SelectBillerForms;
