import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    CardHeadingBVN,
    LeftHeading,
    SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper
} from './styles.module';
import Progressbar from '../../../ReusableComponents/Progressbar';
import Card from '../../NotRegisteredForms/Card';
import OtpInput from '../../../ReusableComponents/Otpinput';
import Loader from '../../../ReusableComponents/Loader';
import { resetOtpData } from '../../../../redux/actions/resetOtpAction';
import { changeNumberAction } from '../../../../redux/actions/changeNumberAction';

const StepTwoBVNAuthenticator = ({
    handleShowThirdStep,
    setFormData,
    formData,
    action,
    otpError
}) => {
    const [otps, setOtp] = useState([]);
    if (typeof window !== 'undefined') {
        let accounts = window?.localStorage?.getItem('user');
        var newAccounts = JSON.parse(accounts);
    }

    const dispatch = useDispatch();

    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );
    const { changeNumber, changeNumberError } = useSelector(
        (state) => state.changeNumberReducer
    );

    const [activeBtn, setActiveBtn] = useState(true);
    const otpLength = 6;
    const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
    const otpInputs = useRef([]);

    const handleInputChange = (inputIndex, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[inputIndex] = value;
        setOtpValues(newOtpValues);

        // Concatenate the values to form the OTP string
        const myOtp = newOtpValues.join('');
        // console.log('OTP:', otpString);

        if (value && inputIndex > length - 1) {
            const nextInput = otpInputs.current[inputIndex + 1];
            if (nextInput) {
                nextInput.focus(); // Move cursor to the next input if it exists
            }
        }
        setFormData({ ...formData, otp: myOtp });
    };
    const handleInputKeyPress = (event, inputIndex) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            handleInputChange(inputIndex, '');

            if (inputIndex > 0) {
                otpInputs.current[inputIndex - 1].focus(); // Move cursor to the previous input
            }
        }
    };

    const ResetOtp = (e) => {
        e.preventDefault();
        const data = {
            userId: newAccounts?.userId
        };
        dispatch(resetOtpData(data));
    };

    useEffect(() => {
        // setValue((ssnValues) => ['']);
    }, [resetOtp, resetOtpErrorMessages]);

    const [phone, setPhone] = useState('otp');
    const [newPhone, setNewPhone] = useState('otp');
    const [countryCodes, setCountryCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submit = () => {
        setError('');
        setLoading(true);
        const data = {
            phoneNumber: newPhone,
            countryCode: countryCodes
        };

        dispatch(changeNumberAction(data));
    };

    const changeTest = () => {
        if (changeNumber !== null) {
            setPhone('otp');
            setLoading(false);
        } else if (changeNumberError !== null) {
            setError(changeNumberError);
            setLoading(false);
        }
    };

    useEffect(() => {
        changeTest();
    }, [changeNumber, changeNumberError]);

    return (
        <div className={styles.bvnBody}>
            <div className={styles.cover}>
                <div>
                    <CardHeadingBVN>
                        <LeftHeading>OTP Verification</LeftHeading>
                    </CardHeadingBVN>
                    <SmallInstructionText>
                        A one time Password has been sent to your registered
                        phone number please enter digits below.
                    </SmallInstructionText>
                    {otpError ? (
                        <p className={styles.error}>{otpError}</p>
                    ) : null}
                    {error ? <p className={styles.error}>{error}</p> : null}
                    {resetOtpErrorMessages ? (
                        <p> {resetOtpErrorMessages.response.data.message}</p>
                    ) : resetOtpErrorMessages?.response?.data?.message ? (
                        <p>{resetOtp?.data.message}</p>
                    ) : null}
                    <div className={styles.bvnHeading}>
                        <p
                            className={styles.inp}
                            onClick={() => {
                                setPhone('otp');
                            }}
                        >
                            Input OTP
                        </p>
                        <p
                            className={styles.inp}
                            onClick={() => {
                                setPhone('phone');
                            }}
                        >
                            Change Phone Number
                        </p>
                    </div>
                    {phone === 'otp' ? (
                        <form>
                            <div className={styles.newOtpInput}>
                                {otpValues.map((value, index) => (
                                    <>
                                        <input
                                            key={index}
                                            type="password"
                                            className="otp-input"
                                            maxLength="1"
                                            value={otpValues[index]}
                                            onInput={(e) =>
                                                handleInputChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleInputKeyPress(e, index)
                                            }
                                            ref={(input) =>
                                                (otpInputs.current[
                                                    index
                                                ] = input)
                                            }
                                        />
                                    </>
                                ))}
                            </div>
                            <div className={styles.resendFlex}>
                                <button
                                    className={styles.resetOtp}
                                    onClick={ResetOtp}
                                    type="reset"
                                >
                                    Resend OTP
                                </button>
                                <button className={styles.clr} type="reset">
                                    Clear
                                </button>
                            </div>
                        </form>
                    ) : phone === 'phone' ? (
                        <div className={styles.changePhone}>
                            <form onSubmit={handleSubmit(submit)}>
                                <div className={styles.submit}>
                                    <input
                                        placeholder="+234"
                                        type="number"
                                        onChange={(e) =>
                                            setCountryCode(e.target.value)
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter New Phone Number"
                                        {...register('countryCode_number', {
                                            required:
                                                'Phone Number is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Min length is 10'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'Max length is 10'
                                            }
                                        })}
                                        onInput={(e) => {
                                            setNewPhone(e.target.value),
                                                setFormData({
                                                    ...formData,
                                                    phoneNumber:
                                                        event.target.value
                                                });
                                        }}
                                    />
                                </div>
                                <div className={styles.error}>
                                    {errors.countryCode_number?.message}
                                </div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <button type="submit">Change</button>
                                )}
                            </form>
                        </div>
                    ) : null}
                    {phone === 'otp' ? (
                        <ButtonComp
                            onClick={action}
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="button"
                            margin="80px 0px 0px 0px"
                            text="Proceed"
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
