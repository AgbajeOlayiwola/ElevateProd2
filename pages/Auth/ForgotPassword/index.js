import React, { useState, useEffect } from 'react';
import ForgotPassword from './email';
import styles from './styles.module.css';
import EmailSent from './emailsent';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
    forgotPasswordData,
    forgotPasswordResetData
} from '../../../redux/actions/actions';
import ResetPassword from './resetpassword';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const { query, push } = useRouter();
    const { forgotPassword, forgotPasswordErrorMessages } = useSelector(
        (state) => state.fogrotPasswordReducer
    );
    const { forgotPasswordReset, forgotPasswordResetErrorMessages } =
        useSelector((state) => state.forgotPasswordResetReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(query).length !== 0) {
            setPage(2);
        }
    }, [query]);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <ForgotPassword
                        onSubmit={handleSubmit}
                        forgotPasswordErrorMessages={errorMessage}
                    />
                );
            case 1:
                return <EmailSent />;
            case 2:
                return (
                    <ResetPassword
                        onSubmit={(e) => {
                            console.log(e);
                            console.log();
                            const data = {
                                token: query.token,
                                password: e.newPassword,
                                confirmPassword: e.confnewPassword
                            };
                            dispatch(forgotPasswordResetData(data));
                        }}
                    />
                );
            default:
                return <ForgotPassword />;
        }
    };
    function handleSubmit(e) {
        dispatch(forgotPasswordData(e));
    }
    useEffect(() => {
        if (forgotPassword !== '') {
            setPage(page + 1);
        } else if (forgotPasswordErrorMessages !== '') {
            setErrorMessage(forgotPasswordErrorMessages.response.data.message);
        }
    }, [forgotPassword, forgotPasswordErrorMessages]);
    useEffect(() => {
        if (forgotPasswordReset !== null) {
            push('./Auth/Login');
        } else if (forgotPasswordResetErrorMessages !== null) {
            setErrorMessage(forgotPasswordResetErrorMessages);
        }
    }, [forgotPasswordReset, forgotPasswordResetErrorMessages]);
    const handleClick = () => {
        setPage(page - 1);
    };
    return (
        <div className={styles.cov}>
            <div className={styles.covWrapper}>
                {conditionalComponent()}
                {page === 1 ? (
                    <div className={styles.last}>
                        <p>
                            Didn’t receive the email? Check your spam filter or{' '}
                            <span onClick={handleClick}>Resend Mail</span>
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ExistingMultiStep;
