import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';
import Progressbar from '../../ReusableComponents/Progressbar';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountsData } from '../../../redux/actions/actions';

const StepThree = ({
    action,
    handleSubmit,
    handleSubmitNew,
    countryNames,
    mainAccount
}) => {
    const dispatch = useDispatch();
    const [profileInfo, setProfileInfo] = useState([]);
    const account = localStorage.getItem('account');

    const accountDetails = JSON.parse(account);
    console.log(accountDetails);

    useEffect(() => {
        const account = localStorage.getItem('account');
        const accountDetails = JSON.parse(account);
        if (accountDetails?.profile !== undefined) {
            setProfileInfo(accountDetails?.profile);
        } else if (accountDetails?.user !== undefined) {
            setProfileInfo(accountDetails?.user.profile);
        } else {
            setProfileInfo(accountDetails);
        }
    }, []);

    const [isRegistered, setIsRegistered] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (countryNames) {
            setActive(true);
        }
    }, [countryNames]);

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

    const { bankAccounts, errorMessage } = useSelector(
        (state) => state.bankAccountsReducer
    );
    useEffect(() => {
        dispatch(bankAccountsData());
    }, []);

    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Input your BVN and open a Business Account in 3 minutes." />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.secondStepForm}>
                    <p className={styles.email}>
                        An Email has been sent to your email account,Please
                        check your inbox and verify your email before
                        continuing.
                    </p>
                    <div className={styles.cardHeading}>
                        <ArrowBackSvg action={action} color="#102572" />
                        <div>
                            <h3 className={styles.LeftHeading}>
                                Complete your Profile
                            </h3>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <div className={styles.formInner}>
                            {/* {accountDetails.email === null ? null : (
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
                            )} */}
                            <div>
                                <label>Account Number </label>
                                <input
                                    placeholder="Fetching Account Number ...."
                                    className={styles.textInput}
                                    required
                                    readOnly
                                    value={bankAccounts[0]?.accountNumber}
                                />
                            </div>
                            <div>
                                <label>Full Name </label>
                                <input
                                    placeholder="Full Name"
                                    className={styles.textInput}
                                    required
                                    readOnly
                                    value={`${profileInfo?.lastName}  ${profileInfo?.firstName}`}
                                />
                            </div>
                            <div>
                                <label>Phone Number </label>
                                <div className={styles.phone}>
                                    <div className={styles.phoneHeader}>
                                        <span>
                                            <img
                                                src={countryNames?.flags.svg}
                                                alt=""
                                            />
                                        </span>
                                        <p>{countryNames?.baseCurrency}</p>
                                    </div>
                                    <div className={styles.phoneDetails}>
                                        {/* <p>{countryNames?.countryCode}</p> */}
                                        <input
                                            type="number"
                                            placeholder="812 345 6789"
                                            value={profileInfo?.phoneNumber}
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
                        <button
                            disabled={active ? false : true}
                            className={active ? null : styles.disabled}
                            onClick={handleSubmitNew}
                        >
                            Click to use this Account
                        </button>
                        <p onClick={handleSubmit} className={styles.open}>
                            Click to open a <span>New Business Account</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StepThree;
