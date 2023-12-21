import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';
import Progressbar from '../../ReusableComponents/Progressbar';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountsData } from '../../../redux/actions/bankAccountsDetailsAction';
import { useGetAccountNoMutation } from '../../../redux/api/authApi';

const StepThree = ({
    action,
    handleSubmit,
    handleSubmitNew,
    countryNames,
    formData,
    setFormData
}) => {
    const dispatch = useDispatch();
    const [profileInfo, setProfileInfo] = useState([]);
    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
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
    const { moreAccountNumberDetails } = useSelector((store) => store);
    console.log(moreAccountNumberDetails);
    const [
        getAccountNo,
        {
            data: getAccountNoData,
            isLoading: getAccountNoLoad,
            isSuccess: getAccountNoSuccess,
            isError: getAccountNoFalse,
            error: getAccountNoErr,
            reset: getAccountNoReset
        }
    ] = useGetAccountNoMutation();

    useEffect(() => {
        getAccountNo(null);
    }, []);

    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Input your BVN and open a Business Account in 3 minutes." />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.secondStepForm}>
                    {/* <p className={styles.email}>
                        An Email has been sent to your email account,Please
                        check your inbox and verify your email before
                        continuing.
                    </p> */}
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
                            <div>
                                <label>Account Number </label>
                                <input
                                    placeholder="Fetching Account Number ...."
                                    className={styles.textInput}
                                    value={
                                        moreAccountNumberDetails?.accounts
                                            ?.accountNumber
                                    }
                                    required
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Full Name </label>
                                <input
                                    placeholder="Full Name"
                                    className={styles.textInput}
                                    value={
                                        moreAccountNumberDetails?.accounts
                                            ?.accountName
                                    }
                                    required
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Phone Number </label>
                                <div className={styles.phone}>
                                    <div className={styles.phoneHeader}>
                                        <span>
                                            <img src={formData?.flag} alt="" />
                                        </span>
                                        <p>{formData?.baseCurrency}</p>
                                    </div>
                                    <div className={styles.phoneDetails}>
                                        <p> +{formData?.countryCode}</p>
                                        {/* <p>{countryNames?.countryCode}</p> */}
                                        <input
                                            type="number"
                                            value={moreAccountNumberDetails?.accounts?.mobileNos.replace(
                                                '234',
                                                ''
                                            )}
                                            placeholder="812 345 6789"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div
                                className={styles.genBtm}
                                style={{ marginBottom: '0px' }}
                            >
                                <label> Gender </label>
                                <select name="" id="" readOnly>
                                    <option value="Male">
                                        {moreAccountNumberDetails?.accounts
                                            ?.gender === 'M'
                                            ? 'Male'
                                            : moreAccountNumberDetails?.accounts
                                                  ?.gender === 'F'
                                            ? 'Female'
                                            : null}
                                    </option>
                                </select>
                            </div> */}
                        </div>
                        <button disabled={false} onClick={handleSubmitNew}>
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
