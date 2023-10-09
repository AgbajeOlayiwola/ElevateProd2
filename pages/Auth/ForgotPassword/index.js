import React, { useState, useEffect } from 'react';
import ForgotPassword from './email';
import styles from './styles.module.css';
import EmailSent from './emailsent';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ResetPassword from './resetpassword';
import { forgotPasswordResetData } from '../../../redux/actions/forgotPasswordResetAction';
import { forgotPasswordData } from '../../../redux/actions/forgotPasswordAction';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { query, push } = useRouter();
    const dispatch = useDispatch();

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <ForgotPassword
                        onMove={() => setPage(1)}
                        forgotPasswordErrorMessages={errorMessage}
                        loading={loading}
                    />
                );
            case 1:
                return <EmailSent />;
            case 2:
                return (
                    <ResetPassword
                        forgotPasswordErrorMessages={errorMessage}
                        loading={loading}
                        submit={(e) => {
                            const data = {
                                token: query.token,
                                password: e.newPassword,
                                confirmPassword: e.confnewPassword
                            };
                            dispatch(forgotPasswordResetData(data));
                            setLoading(true);
                        }}
                    />
                );
            default:
                return <ForgotPassword />;
        }
    };

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
