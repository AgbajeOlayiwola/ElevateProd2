import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import OtpInput from '../../ReusableComponents/Otpinput';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { ResetOTP } from '../NotRegisteredForms/StepTwoBVNAuthenticator/styles.module';
import styles from './styles.module.css';
import { resetOtpData } from '../../../redux/actions/actions';

const FirstStep = ({ handleSubmit, action, loads, setFormData, formData }) => {
    const [activeBtn, setActiveBtn] = useState(true);

    const numOfFields = 6;
    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );
    const [ssnValues, setValue] = useState(['']);
    const handleOtpChange = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split('-');

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) <= 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                setValue((prevValue) => [...prevValue, value]);

                console.log(ssnValues);

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                } else {
                }
            }
        }
    };
    useEffect(() => {
        setFormData({ ...formData, otp: ssnValues.join('') });
    }, [ssnValues]);
    const ResetOtp = () => {
        setValue((ssnValues) => ['']);
        const data = {
            phoneNumber: formData.phoneNumber
        };
        dispatch(resetOtpData(data));
        //console.logresetOtp, resetOtpErrorMessages);
    };
    const clear = () => {
        setValue((ssnValues) => ['']);
    };
    useEffect(() => {
        setValue((ssnValues) => ['']);
    }, [resetOtp, resetOtpErrorMessages]);

    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="The world is your Canvas. Explore!" />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.existingBody}>
                    <div className={styles.stepFour}>
                        <h1 className={styles.header}>OTP Verification</h1>
                        <p className={styles.p}>
                            A one time Password has been sent to your registered
                            phone number please enter digits below.
                        </p>
                        <form>
                            <div className={styles.otpInps}>
                                <input
                                    type="password"
                                    name="ssn-1"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-2"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-3"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-4"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-5"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-6"
                                    maxLength={1}
                                    onChange={handleOtpChange}
                                />
                            </div>

                            <div className={styles.resendFlex}>
                                <p onClick={ResetOtp}>Resend OTP</p>

                                <button
                                    onClick={clear}
                                    style={{ cursor: 'pointer' }}
                                    className={styles.clr}
                                    type="reset"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            onClick={action}
                            type="submit"
                            text="Proceed"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FirstStep;
