import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';
import Progressbar from '../../ReusableComponents/Progressbar';

const StepThree = () => {
    const account = localStorage.getItem('displayAccount');
    const accountDetails = JSON.parse(account);
    const [isRegistered, setIsRegistered] = useState(false);
    const [progress, setProgress] = useState('50%');
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
            <div className={styles.cardHeading}>
                <h3 className={styles.LeftHeading}>Complete your Profile</h3>
                <Progressbar
                    bgcolor="#6CCF00"
                    progressCount={progress}
                    height={14}
                    progWidth="27%"
                />
                {/* <Imag
                    src="/width"
                    alt="lineImage" /> */}
            </div>

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
            {/* <p>
                Contine with your personal account or open a new business
                account
            </p> */}
            <div className={styles.formInner}>
                <div>
                    <label>Email </label>
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        readOnly
                        value={accountDetails.email}
                    />
                </div>

                <div>
                    <label>Account Number </label>
                    <br />

                    <input
                        placeholder="Account Numberl"
                        className={styles.textInput}
                        required
                        readOnly
                        value={accountDetails.accountNumber}
                    />
                </div>
                <div>
                    <label>Full Name </label>
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        readOnly
                        value={accountDetails.fullName}
                    />
                </div>
                <div>
                    <label>Phone Number </label>
                    <br />

                    <input
                        placeholder="Tel"
                        className={styles.textInput}
                        required
                        readOnly
                        value={accountDetails.phoneNumber}
                    />
                </div>
                <div className={styles.genBtm} style={{ marginBottom: '0px' }}>
                    <p>Your Gender </p>
                    <br />

                    <div
                        className={styles.genders}
                        style={{ marginBottom: '0px' }}
                    >
                        <div className={styles.genderPart}>
                            <input
                                className={styles.radioInput}
                                required
                                disabled
                                //    {accountDetails.data.gender === "m" ?checked}
                                type="radio"
                                checked
                            />
                            <label>Male</label>
                        </div>
                        <div className={styles.genderPart}>
                            <input
                                className={styles.radioInput}
                                required
                                disabled
                                type="radio"
                            />
                            <label>Female</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepThree;
