import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import OtpInput from '../../ReusableComponents/Otpinput';
import { ResetOTP } from '../NotRegisteredForms/StepTwoBVNAuthenticator/styles.module';
import styles from './styles.module.css';

const FirstStep = ({ handleSubmit }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.existingBody}>
            <div className={styles.stepFour}>
                <h1 className={styles.header}>OTP Verification</h1>
                <p className={styles.p}>
                    A one time Password has been sent to your registered phone
                    number please enter digits below.
                </p>
                <form>
                    <OtpInput />
                    <div className={styles.resendFlex}>
                        <p style={{ color: '#005B82', cursor: 'pointer' }}>
                            Resend OTP
                        </p>
                        <button
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
                    onClick={handleSubmit}
                    type="submit"
                    text="Proceed"
                />
            </div>
        </div>
    );
};

export default FirstStep;
