import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ForgotPassword from './email';
import EmailSent from './emailsent';
import styles from './styles.module.css';

import ResetPassword from './resetpassword';

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
                return <ResetPassword />;

            case 2:
                return <EmailSent />;
            default:
                return <ForgotPassword />;
        }
    };

    return (
        <div className={styles.cov}>
            <div className={styles.covWrapper}>
                {conditionalComponent()}
                {page === 1 ? (
                    <div className={styles.last}>
                        <p>
                            Didn’t receive the email? Check your spam filter or{' '}
                            {/* <span onClick={handleClick}>Resend Mail</span> */}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ExistingMultiStep;
