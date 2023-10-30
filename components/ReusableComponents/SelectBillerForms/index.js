import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useBillerValidationMutation } from '../../../redux/api/authApi';
import { processObjects } from '../../../utils/processObject';
import ButtonComp from '../Button';
import Loader from '../Loader';
const SelectBillerForms = ({ billerDatails }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const { profile } = useSelector((store) => store);
    const [showOtherFields, setShowOtherFields] = useState(false);
    const [prodCode, setProdCode] = useState('');
    const [currncy, setCurrency] = useState();
    const [initialFormValues, setInitialFormValues] = useState({});
    const [accountNo, setAccountNo] = useState();

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
    const formRef = useRef();

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
        if (prodCode.length > 1) {
            if (billerDatails?.billerDetail?.validationRequired === 'Y') {
                const formVal = formRef?.current?.values;
                console.log(formVal);
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
    return (
        <>
            <div>
                <h4>{billerDatails?.billerDetail?.billerName}</h4>
                <p>{billerDatails?.billerDetail?.billerDescription}</p>
            </div>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
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
                                    const selectedAccount = allAccountInfo.find(
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
                                <option value="">Select Account To Use</option>
                                {allAccountInfo
                                    .filter((account) => account.accountNo)
                                    .map((account) => {
                                        return (
                                            <>
                                                <option
                                                    value={account?.accountNo}
                                                >
                                                    <p>{account?.accountNo}</p>
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
                                            // if (selBiller?.amount) {
                                            //     setArryAmaount(
                                            //         selBiller?.amount.split(',')
                                            //     );
                                            // }
                                            // setSelectedAmountType(selBiller?.amountType);
                                        }
                                        setShowOtherFields(true);
                                    }}
                                >
                                    <option>Choose Network</option>
                                    {billerDatails?.billerProductInfo?.map(
                                        (data, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={data?.productCode}
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
                        {billerValidationLoad ? <Loader /> : null}
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text={'Make Payment'}
                            type="submit"
                        />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SelectBillerForms;
