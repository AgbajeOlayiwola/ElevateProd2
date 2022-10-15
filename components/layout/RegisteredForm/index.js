import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import Card from '../NotRegisteredForms/Card';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import StepThree from './StepThree';
import StepFour from './StepFour';
import Link from 'next/link';
import styles from './styles.module.css';
import StepTwoBVNAuthenticator from '../NotRegisteredForms/StepTwoBVNAuthenticator';
import { existingUserProfileData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);
    const [pageType, setPageType] = useState('');
    const dispatch = useDispatch();
    const { existingUserProfilee, errorMessage } = useSelector(
        (state) => state.existingUserProfileReducer
    );
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        emailData: '',
        password: '',
        confPassword: ''
    });
    // useEffect(() => {
    //     if (!errorMessage) {
    //         setPage(page + 1);
    //     } else if (
    //         existingUserProfilee.data.message ==
    //         'Profile setup Intialization completed'
    //     ) {
    //         setPage(page + 1);
    //     }
    // }, [errorMessage]);
    if (typeof window !== 'undefined') {
        let accounts = window.localStorage.getItem('account');
        var newAccounts = JSON.parse(accounts);
        // console.log(newAccounts.user.email);
    }
    // console.log(formData.emailData, newAccounts.user?.email);
    console.log(formData.emailData, newAccounts.email);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <FirstStep action={handleSubmit} />;
            case 1:
                return (
                    <SecondStep
                        errorMessage={errorMessage}
                        move={() => {
                            const userData = {
                                userId: formData.userId,
                                email:
                                    newAccounts.email === null ||
                                    newAccounts.email === undefined
                                        ? formData.emailData
                                        : newAccounts.user?.email,
                                password: formData.password,
                                confirmPassword: formData.confPassword
                            };
                            console.log(formData.userId);
                            dispatch(existingUserProfileData(userData));
                            setLoading((prev) => !prev);
                            // console.log(existingUserProfilee.data.message);
                        }}
                        formData={formData}
                        setFormData={setFormData}
                        action={() => {
                            setPage(page - 1);
                        }}
                        loading={loading}
                        setLoading={setLoading}
                    />
                );
            // case 2:
            //     return (
            //     <Liveness
            //     action={() => {
            //         setPage(page + 1);
            //     }}
            //     // action={handleSubmitt}
            // />
            //     );
            case 2:
                return (
                    <StepThree
                        action={() => {
                            setPage(page - 1);
                        }}
                        handleSubmit={handleSubmit}
                        handleSubmitNew={handleSubmitNew}
                    />
                );
            case 3:
                return (
                    <StepFour
                        title={pageType}
                        action={() => {
                            setPage(page - 1);
                            setPageType('');
                        }}
                    />
                );
            default:
                return <FirstStep />;
        }
    };
    function handleSubmit() {
        setPage(page + 1);
    }
    function handleSubmitNew() {
        setPage(page + 1);
        setPageType('New');
    }
    useEffect(() => {
        // console.log('new bvn:', bvnNin.message);
        if (existingUserProfilee.data) {
            if (
                existingUserProfilee.data.message ==
                'Profile setup Intialization completed'
            ) {
                setPage(page + 1);
            }
        }
    }, [existingUserProfilee]);
    return (
        <>
            <>{conditionalComponent()}</>
        </>
    );
};

export default ExistingMultiStep;
