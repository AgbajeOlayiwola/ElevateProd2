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
    loadCountry
} from '../../../redux/actions/actions';
import { Router, useRouter } from 'next/router';
import Loader from '../../ReusableComponents/Loader';
const ProfileSetups = () => {
    const dispatch = useDispatch();
    const { countries } = useSelector((state) => state.countryReducer);
    const router = useRouter();
    // Router.reload();
    // router.replace(router.asPath);

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        type: 'UNREGISTERED BUSINESS',
        rcnumber: '',
        tinNumber: '',
        bvNumber: '',
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
    const countryName = localStorage.getItem('country');
    const countryNames = JSON.parse(countryName);
    useEffect(() => {
        dispatch(loadCountry());
    }, []);
    useEffect(() => {
        if (countries !== null) {
            countries.filter((item) => {
                if (item.name === countryNames.name) {
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
        bvnNinPend
    } = useSelector((state) => state.profileSetup);

    const { Loading, otp, otpErrorMessage } = useSelector((state) => state.otp);
    const [error, setError] = useState([]);
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <RegisteredForm
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 1:
                return (
                    <StepTwoBVNAuthenticator
                        formData={formData}
                        setFormData={setFormData}
                        // setPage={page+1}
                        page={page}
                        action={() => {
                            const otpData = {
                                phoneNumber:
                                    formData.countryCode + formData.phoneNumber,
                                otp: '123456'
                            };
                            dispatch(verifyOtp(otpData));
                            if (otpErrorMessage) {
                                console.log('otpError');
                            } else if (!otpErrorMessage) {
                                setPage(page + 1);
                            }
                        }}
                    />
                );
            case 2:
                return (
                    <StepThreeCompleteProfile1
                        formData={formData}
                        setFormData={setFormData}
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
    //     console.log(errorMessages, otpErrorMessages);
    // }, []);
    const [errorM, setErrorM] = useState('');
    const [errorI, setErrorI] = useState('');
    const [errorII, setErrorII] = useState('');
    const [errorIII, setErrorIII] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit() {
        // console.log('firstAPi');

        const profileData = {
            type: formData.type,
            registrationNumber: formData.rcnumber,
            tin: formData.tinNumber,
            bvn: formData.bvNumber,
            phoneNumber: formData.countryCode + formData.phoneNumber,
            countryCode: formData.countryCode,
            dob: formData.dateOfBirth,
            signatoryCount: 1
        };
        setLoading((prev) => !prev);

        dispatch(createProfileSetup(profileData));
        // console.log('lol');
    }

    useEffect(() => {
        console.log('new bvn:', bvnError);
        if (
            errorMessages === null &&
            bvnError === ' ' &&
            bvnErrorI === ' ' &&
            bvnNinPend === null
        ) {
            setPage(page + 1);
        } else {
            console.log('moved');
            setErrorM(errorMessages);
            setErrorI(bvnError);
            setErrorII(bvnErrorI);
            setErrorIII(bvnNinPend);
        }
    }, [errorMessages, bvnError, bvnErrorI, bvnNinPend]);
    // useEffect(() => {
    //     if (bvnError && bvnErrorI) {
    //         setPage(page - 1);
    //         setErrorM(bvnError);
    //         setErrorI(bvnErrorI);
    //     } else if (!otpErrorMessage && !bvnError && !bvnErrorI) {
    //         setPage(page + 1);
    //     }
    // }, [otpErrorMessage, bvnError, bvnErrorI]);

    return (
        <Card>
            {page === 0 ? (
                <>
                    <p className={styles.error}>{errorM}</p> <br />
                    <p className={styles.error}>{errorI}</p> <br />
                    <p className={styles.error}>{errorII}</p> <br />
                    <p className={styles.error}>{errorIII}</p> <br />
                    {/*<p className={styles.error}>{errorIII}</p> <br /> */}
                </>
            ) : (
                <></>
            )}
            <div className={styles.error}>{error}</div>
            {conditionalComponent()}

            {page === 2 || page == 1 ? null : (
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    onClick={handleSubmit}
                    type="submit"
                    text={'Next'}
                />
            )}
        </Card>
    );
};

export default ProfileSetups;
