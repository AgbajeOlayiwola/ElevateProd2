import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';

const StepThree = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);

    const [bcolor, setBColor] = useState(false);

    const handleRegistrationStatus = () => {
        setIsRegistered(true);
        setBgcolor(true);
    };
    const switchRegistrationStatus = () => {
        setIsRegistered(false);
        setBgcolor(false);
    };
    const handleBusiness = () => {
        setBColor(false);
    };
    const handleBusinessTog = () => {
        setBColor(true);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div>
            <h1 className={styles.header}>Complete Your Profile</h1>

            {/* <Imag
                    src="/width"
                    alt="lineImage" /> */}
            {/* <p
                style={{
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#3E3E3E'
                }}
            >
                Is your business registered?
            </p>
            <div className={styles.ButtonWrapper}>
                <span
                    className={styles.ToggleNo}
                    onClick={switchRegistrationStatus}
                    style={
                        bgcolor
                            ? { background: '#f8f8f8' }
                            : { background: '#6ccf00' }
                    }
                >
                    <p
                        className={styles.ToggleNoText}
                        style={
                            bgcolor
                                ? { color: '#a5a5a5' }
                                : { color: '#ffffff' }
                        }
                    >
                        No
                    </p>
                </span>
                <span
                    className={styles.ToggleYes}
                    onClick={handleRegistrationStatus}
                    style={
                        bgcolor
                            ? { background: '#6ccf00' }
                            : { background: '#f8f8f8' }
                    }
                >
                    <p
                        className={styles.ToggleYesText}
                        style={
                            bgcolor
                                ? { color: '#ffffff' }
                                : { color: '#a5a5a5' }
                        }
                    >
                        Yes
                    </p>
                </span>
            </div> */}
            <p>
                Contine with your personal account or open a new business
                account
            </p>
            <div className={styles.formInner}>
                <div>
                    <label>Name </label>
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        disabled
                        value="Agbaje Olayiwola"
                    />
                </div>

                <div>
                    <label>Account Number </label>
                    <br />

                    <input
                        placeholder="Account Numberl"
                        className={styles.textInput}
                        required
                        disabled
                        value="0294251395"
                    />
                </div>
                <div>
                    <label>Email </label>
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        disabled
                        value="Agbajeolaiwola@gmail.com"
                    />
                </div>
                <div>
                    <label>Phone Number </label>
                    <br />

                    <input
                        placeholder="Tel"
                        className={styles.textInput}
                        required
                        disabled
                        value="08111062865"
                    />
                </div>
                <div>
                    <label>Gender </label>
                    <br />

                    <input
                        placeholder="Male"
                        className={styles.textInput}
                        required
                        disabled
                        value="Male"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepThree;
