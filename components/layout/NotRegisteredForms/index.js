import React, { useState, useEffect } from 'react';
import Card from './Card/index';
import ButtonComp from '../../ReusableComponents/Button';
import RegisteredForm from './RegisteredForm';
import StepTwoBVNAuthenticator from './StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from './StepThreeCompleteProfile1';
import styles from './styles.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { Router, useRouter } from 'next/router';
import Loader from '../../ReusableComponents/Loader';
import Liveness from './Liveness';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import HomeSvg from '../../ReusableComponents/HomeSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { Scrollbars } from 'react-custom-scrollbars';
import withAuth from '../../HOC/withAuth';
import { loadCountry } from '../../../redux/actions/getCountriesAction';
import { runVerifyOtp } from '../../../redux/actions/verifyBvnOtp';
import { createBusProfileSetup } from '../../../redux/actions/businessProfileSetupAction';
import { createProfileSetup } from '../../../redux/actions/profileSetupAction';
import { affiliateCountries } from '../../ReusableComponents/Data';
import OnboardingProfileSetupSide from '../../ReusableComponents/OnboardingProfileSetupSide';
const ProfileSetups = ({ comingFrom }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [page, setPage] = useState(0);

    useEffect(() => {
        // Get the current URL
        const currentUrl = new URL(window.location.href);

        // Get the "id" parameter from the URL
        const idParam = currentUrl.searchParams.get('id');

        if (idParam) {
            // Do something with the idParam
            console.log('ID parameter found:', idParam);

            // You can also convert the ID to a number if needed
            const id = parseInt(idParam, 10);
            setPage(id);

            // Perform additional actions based on the ID
            // For example, fetch data from an API using the ID
            // or update the component state based on the ID
        } else {
            console.log('No ID parameter found in the URL');
        }
    }, []);

    const [formData, setFormData] = useState({
        type: false,
        countryCode: '',
        flag: '',
        baseCurrency: '',
        inputLabelId: '',
        inputLabel: ''
    });
    const [loads, setLoads] = useState(false);

    useEffect(() => {
        const affiliate = localStorage.getItem('affiliateCode');
        const countryData = affiliateCountries.filter(
            (country) => country.affiliateCode === affiliate
        );
        console.log(countryData);

        // Use forEach to update state for each countryData item
        countryData.forEach((country, index) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                inputLabel: country?.label,
                inputLabelId: country?.labelId,
                countryCode: country?.countryCode,
                flag: country?.flags?.svg,
                baseCurrency: country?.baseCurrency
            }));
        });
    }, []);

    const types = (type) => {
        setOutType(type);
    };
    const [errorM, setErrorM] = useState('');
    const [errorI, setErrorI] = useState('');

    const [affiliateLoading, setAffiliateLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const [otpError, setOtpError] = useState('');

    useEffect(() => {
        if (comingFrom === 'dashboard') {
            setPage(3);
        }
    }, [comingFrom]);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <RegisteredForm
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={() => setPage(1)}
                    />
                );
            case 3:
                return (
                    <StepThreeCompleteProfile1
                        type={formData.type}
                        formData={formData}
                        setFormData={setFormData}
                        action={() => {
                            alert('Hello');
                        }}
                        loading={loading}
                        setLoading={setLoading}
                    />
                );
            default:
                return (
                    <RegisteredForm
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
        }
    };
    // useEffect(() => {
    //     // //console.log(errorMessages, otpErrorMessages);
    // }, []);

    function regsiteredBus() {
        //  //console.log(formData.tinNumber);
        setLoads((prev) => !prev);
        const businessProfileData = {
            bvnNumber: formData.bvNumber,
            phoneNumber: formData.phoneNumber,
            countryCode: formData.countryCode,
            dateOfBirth: formData.dateOfBirth,
            taxNumber: formData.tinNumber,
            registerationNumber: formData.rcnumber
        };
        // setLoading((prev) => !prev);

        dispatch(createBusProfileSetup(businessProfileData));
    }

    let text;
    useEffect(() => {
        if (comingFrom !== 'dashboard') {
            {
                page === 0
                    ? (text =
                          'Input your BVN and open a Business Account in 3 minutes.')
                    : page === 3
                    ? (text = 'Checkout Priceless opportunities, Be ahead!')
                    : null;
            }
        }
    }, []);

    return (
        <>
            {page === 1 ? (
                <Liveness
                    nextStep={() => setPage(2)}
                    type={formData.type}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : page === 2 ? (
                <StepTwoBVNAuthenticator
                    formData={formData}
                    setFormData={setFormData}
                    otpError={otpError}
                />
            ) : (
                <div
                    className={
                        comingFrom === 'dashboard' ? null : styles.sections
                    }
                >
                    {comingFrom === 'dashboard' ? null : (
                        <section className={styles.sectionI}>
                            <OnboardingProfileSetupSide text={text} />
                        </section>
                    )}
                    <section
                        className={
                            comingFrom === 'dashboard'
                                ? styles.dashProfileSetupSectionII
                                : styles.sectionII
                        }
                    >
                        {page === 0 ? <></> : <></>}
                        {conditionalComponent()}
                    </section>
                </div>
            )}
        </>
    );
};

export default ProfileSetups;
