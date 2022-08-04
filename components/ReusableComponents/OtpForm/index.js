import React, { useState, useRef, useEffect } from 'react';
import OtpInput from '../Otpinput';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import styles from './styles.module.css';

const OtpForm = ({ overlay }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    return (
        <Popup overlay={overlay}>
            <div className={styles.otpForms} ref={myref}>
                <h2>OTP Authenticator</h2>
                <p className={styles.text}>
                    An OTP has been sent to your phone number registered with
                    this account. Please enter the OTP to proceed.
                </p>
                <div className={styles.otpGroup}>
                    <form>
                        <h4>Input OTP</h4>
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
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Proceed"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default OtpForm;
