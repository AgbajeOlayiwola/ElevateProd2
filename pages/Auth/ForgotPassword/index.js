import React, { useState } from 'react';
import ForgotPassword from './email';
import styles from './styles.module.css';
import EmailSent from './emailsent';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <ForgotPassword onSubmit={handleSubmit} />;
            case 1:
                return <EmailSent />;
            default:
                return <ForgotPassword />;
        }
    };
    function handleSubmit() {
        setPage(page + 1);
    }
    function handleClick() {
        setPage(page - 1);
        console.log('back');
    }
    return (
        <div className={styles.cov}>
            <div className={styles.covWrapper}>
                {conditionalComponent()}
                {page === 1 ? (
                    <div className={styles.last}>
                        <p>
                            Didn’t receive the email? Check your spam filter or
                            <span onClick={handleClick}>
                                {' '}
                                Try another email address
                            </span>
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ExistingMultiStep;
