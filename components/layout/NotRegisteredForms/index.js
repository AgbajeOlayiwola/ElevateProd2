import React, { useState, useEffect } from 'react';
import Card from './Card/index';
import ButtonComp from '../../ReusableComponents/Button';
import RegisteredForm from './RegisteredForm';
import StepTwoBVNAuthenticator from './StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from './StepThreeCompleteProfile1';
import styles from './styles.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProfileSetup,
    verifyOtp,
    loadCountry,
    createBusProfileSetup,
    CompProfile,
    runVerifyOtp
} from '../../../redux/actions/actions';
import { Router, useRouter } from 'next/router';
import Loader from '../../ReusableComponents/Loader';
import Liveness from './Liveness';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import HomeSvg from '../../ReusableComponents/HomeSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { Scrollbars } from 'react-custom-scrollbars';
import withAuth from '../../HOC/withAuth';
const ProfileSetups = () => {
    const dispatch = useDispatch();
    const { countries } = useSelector((state) => state.countryReducer);

    const router = useRouter();
    // Router.reload();
    // router.replace(router.asPath);

    //console.log('register page', cookie);

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        type: false,
        rcnumber: '',
        otp: '',
        tinNumber: '',
        bvNumber: '',
        ninNumber: '',
        phoneNumber: '',
        countryCode: '',
        flag: '',
        baseCurrency: '',
        dateOfBirth: '',
        bvnOtp: '',
        gender: '',
        bussinessName: '',
        bussinessName: '',
        businessType: '',
        streetName: '',
        localGoverment: 'lga',
        city: '',
        state: '',
        custCategory: 'Individual',
        referralCode: '',
        signatory: 1
    });
    const [loads, setLoads] = useState(false);
    useEffect(() => {
        dispatch(loadCountry());
    }, []);
    useEffect(() => {
        if (countries !== null) {
            //console.log(countries);
            countries.filter((item) => {
                if (item.name === 'Nigeria') {
                    setFormData({
                        ...formData,
                        countryCode: item.countryCode,
                        flag: item.flags.svg,
                        baseCurrency: item.baseCurrency
                    });
                }
            });
        }
    }, [countries]);
    const [activeBtn, setActiveBtn] = useState(true);
    const {
        isLoading,
        profile,
        errorMessages,
        bvnError,
        bvnErrorI,
        bvnErrorII,
        bvnErrorIII,
        bvnNin
    } = useSelector((state) => state.profileSetup);
    const types = (type) => {
        setOutType(type);
    };
    const [errorM, setErrorM] = useState('');
    const [errorI, setErrorI] = useState('');
    const [errorII, setErrorII] = useState('');
    const [errorIII, setErrorIII] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const { otpActData, otpErrorMessage } = useSelector(
        (state) => state.otpReducer
    );
    //console.log(formData.emailData, newAccounts.user?.email);
    //console.log(formData.emailData, newAccounts.email);

    const handleOtp = () => {
        const otpData = {
            phoneNumber: formData.countryCode + formData.phoneNumber,
            otp: formData.otp
        };
        dispatch(runVerifyOtp(otpData));
    };
    const [otpError, setOtpError] = useState('');
    useEffect(() => {
        if (otpErrorMessage) {
            setOtpError(otpErrorMessage.response.data.message);
        } else if (otpActData) {
            // console.log('otpErrorI');
            setPage(page + 1);
        }
    }, [otpErrorMessage, otpActData]);

    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <RegisteredForm
                        errorM={errorM}
                        errorI={errorI}
                        formData={formData}
                        bvnError={bvnError}
                        setFormData={setFormData}
                        action={handleSubmit}
                        actionI={regsiteredBus}
                        loading={loading}
                        setLoading={setLoading}
                        loads={loads}
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
    //     //console.log(errorMessages, otpErrorMessages);
    // }, []);

    function regsiteredBus() {
        console.log(formData.tinNumber);
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

    function handleSubmit() {
        setLoads((prev) => !prev);
        const profileData = {
            bvnNumber: formData.bvNumber,
            phoneNumber: formData.phoneNumber,
            countryCode: formData.countryCode,
            dateOfBirth: formData.dateOfBirth
        };
        setLoading(true);
        setErrorM('');
        setErrorI('');
        dispatch(createProfileSetup(profileData));
        //console.log('lol');
    }

    useEffect(() => {
        //console.log('new bvn:', bvnNin.message);
        if (
            bvnNin === 'verification successful' ||
            errorMessages === 'you have already setup your profile'
        ) {
            setPage(page + 1);
        } else {
            //console.log('move');
            setErrorM(errorMessages);
            setErrorI(bvnError);
            setLoading(false);
        }
    }, [bvnNin, errorMessages]);

    // const handleSubmitt = () => {
    //     setPage(page + 1);
    // };
    //console.log(errorM, errorI);

    // useEffect(() => {
    //     if (bvnError && bvnErrorI) {
    //         setPage(page - 1);
    //         setErrorM(bvnError);
    //         setErrorI(bvnErrorI);
    //     } else if (!otpErrorMessage && !bvnError && !bvnErrorI) {
    //         setPage(page + 1);
    //     }
    // }, [otpErrorMessage, bvnError, bvnErrorI]);
    let text;
    {
        page === 0
            ? (text =
                  'Input your BVN and open a Business Account in 3 minutes.')
            : page === 3
            ? (text = 'Checkout Priceless opportunities, Be ahead!')
            : null;
    }
    return (
        <>
            {page === 1 ? (
                <StepTwoBVNAuthenticator
                    formData={formData}
                    setFormData={setFormData}
                    // setPage={page+1}
                    page={page}
                    action={handleOtp}
                    otpError={otpError}
                />
            ) : page === 2 ? (
                <Liveness
                    action={() => {
                        setPage(page + 1);
                    }}
                    cookie={cookie}
                    loading={loading}
                    setLoading={setLoading}
                />
            ) : (
                <div className={styles.sections}>
                    <section className={styles.sectionI}>
                        <ProfileSetupSide text={text} />
                    </section>
                    <section className={styles.sectionII}>
                        {page === 0 ? (
                            // <>
                            //     <p className={styles.error}>{errorI}</p> <br />
                            // </>
                            <></>
                        ) : (
                            <></>
                        )}
                        {/* {error ? <div className={styles.error}>{error}</div> : null} */}
                        {conditionalComponent()}
                    </section>
                </div>
            )}
        </>
    );
};

export default withAuth(ProfileSetups);
