import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';
import Progressbar from '../../ReusableComponents/Progressbar';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';

const StepThree = ({ action, handleSubmit, handleSubmitNew }) => {
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
    let countryName = '';
    let countryNames;

    if (typeof window !== 'undefined') {
        countryName = window.localStorage.getItem('country');
        console.log(window.localStorage.getItem('country'));
        if (countryName === null) {
            countryNames = window.localStorage.getItem('country');
        } else {
            countryNames = JSON.parse(countryName);
        }
    }
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Input your BVN and open a Business Account in 3 minutes." />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.secondStepForm}>
                    <div className={styles.cardHeading}>
                        <ArrowBackSvg action={action} />
                        <div>
                            <h3 className={styles.LeftHeading}>
                                Complete your Profile
                            </h3>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <div className={styles.formInner}>
                            {accountDetails.email === null ? null : (
                                <div>
                                    <label>Email </label>

                                    <input
                                        placeholder="Enter Your Email"
                                        className={styles.textInput}
                                        required
                                        readOnly
                                        value={accountDetails.email}
                                    />
                                </div>
                            )}

                            <div>
                                <label>Account Number </label>

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
                                <div className={styles.phone}>
                                    <div className={styles.phoneHeader}>
                                        <span>
                                            <img
                                                src={countryNames.flags.svg}
                                                alt=""
                                            />
                                        </span>
                                        <p>{countryNames.baseCurrency}</p>
                                    </div>
                                    <div className={styles.phoneDetails}>
                                        {/* <p>{countryNames.countryCode}</p> */}
                                        <input
                                            type="number"
                                            placeholder="812 345 6789"
                                            value={accountDetails.phoneNumber}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles.genBtm}
                                style={{ marginBottom: '0px' }}
                            >
                                <label> Gender </label>

                                <select name="" id="">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleSubmitNew}>
                            Contine with this Personal account
                        </button>
                        <p onClick={handleSubmit} className={styles.open}>
                            Click to open a <span>New Busiess Account</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StepThree;
