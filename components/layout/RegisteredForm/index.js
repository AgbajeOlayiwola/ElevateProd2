import React, { useEffect, useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import StepFour from './StepFour';
import StepThree from './StepThree';
import styles from './styles.module.css';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { affiliateCountries } from '../../ReusableComponents/Data';
import Liveness from './liveness';
import VerifyEmail from './verifyemail/verifyEmail';

const ExistingMultiStep = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [pageType, setPageType] = useState('');
    const [country, setCountry] = useState();
    const [loads, setLoads] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        otp: [''],
        type: 'false',
        userId: '',
        emailData: '',
        password: '',
        confPassword: '',
        countryCode: '',
        flag: '',
        baseCurrency: '',
        inputLabelId: '',
        inputLabel: ''
    });

    useEffect(() => {
        // Get the current URL
        const currentUrl = new URL(window.location.href);

        // Get the "id" parameter from the URL
        const idParam = currentUrl.searchParams.get('id');

        if (idParam) {
            // Do something with the idParam
            console.log('ID parameter found:', idParam);

            const id = parseInt(idParam, 10);
            setPage(id);
        } else {
            console.log('No ID parameter found in the URL');
        }
    }, []);

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
    useEffect(() => {
        if (localStorage.getItem('loginWith')) {
            setPage(1);
        }
    }, []);
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <FirstStep
                        formData={formData}
                        setFormData={setFormData}
                        action={() => {
                            setPage(1);
                        }}
                    />
                );

            case 1:
                return (
                    <div className={styles.livenes}>
                        <Liveness
                            action={() => {
                                if (localStorage.getItem('loginWith')) {
                                    setPage(2);
                                }
                            }}
                        />
                    </div>
                );

            case 2:
                return (
                    <SecondStep
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={() => {
                            setPage(3);
                        }}
                        action={() => {
                            setPage(2);
                        }}
                    />
                );
            case 3:
                return (
                    <div className={styles.livenes}>
                        <VerifyEmail
                            nextStep={() => {
                                setPage(4);
                            }}
                        />
                    </div>
                );

            case 4:
                return (
                    <StepThree
                        action={() => {
                            router.push({
                                pathname: '/Onboarding/ExistingProfileSetup',
                                query: { id: 5 }
                            });
                        }}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        handleSubmitNew={handleSubmitNew}
                    />
                );
            case 5:
                return (
                    <StepFour
                        title={pageType}
                        action={() => {
                            setPage(4);
                            setPageType('');
                        }}
                        formData={formData}
                        setFormData={setFormData}
                        countryNames={country}
                    />
                );
        }
    };
    function handleSubmit() {
        // setLoads((prev) => !prev);
        setPage(5);
        setFormData({ ...formData, type: 'true' });

        router.push({
            pathname: '/Onboarding/ExistingProfileSetup',
            query: { id: 5 }
        });
    }
    function handleSubmitNew() {
        setPage(5);
        setFormData({ ...formData, type: 'false' });
        router.push({
            pathname: '/Onboarding/ExistingProfileSetup',
            query: { id: 5, pageType: 'New' }
        });
    }

    return (
        <>
            <>{conditionalComponent()}</>
        </>
    );
};

export default ExistingMultiStep;
