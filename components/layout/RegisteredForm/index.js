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

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <StepFour
                        title={pageType}
                        action={() => {
                            setPage(page - 1);
                            setPageType('');
                        }}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        move={() => {
                            const userData = {
                                userId: formData.userId,
                                email: formData.emailData,
                                password: formData.password,
                                confirmPassword: formData.confPassword
                            };
                            // console.log(errorMessage);
                            dispatch(existingUserProfileData(userData));
                            // console.log(existingUserProfilee.data.message);
                            if (!errorMessage) {
                                setPage(page + 1);
                            } else if (
                                existingUserProfilee.data.message ==
                                'Profile setup Intialization completed'
                            ) {
                                setPage(page + 1);
                            }
                        }}
                        formData={formData}
                        setFormData={setFormData}
                        action={() => {
                            setPage(page - 1);
                        }}

                        //
                    />
                );
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
    return (
        <>
            <>{conditionalComponent()}</>
        </>
    );
};

export default ExistingMultiStep;
