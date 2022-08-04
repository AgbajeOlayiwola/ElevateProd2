import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
import ForgotPassword from './email';
import styles from './styles.module.css';
import EmailSent from './emailsent';
import Card from '../../../components/layout/NotRegisteredForms/Card/index';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);
    const [activeBtn, setActiveBtn] = useState(true);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <ForgotPassword />;
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
            <Card>
                {conditionalComponent()}
                {page === 1 ? null : (
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        onClick={handleSubmit}
                        type="submit"
                        text="Reset"
                    />
                )}
                {page === 1 ? (
                    <div className={styles.last}>
                        <p>
                            Did not receive the email? Check your spam filter or{' '}
                            <span onClick={handleClick}>
                                try another email address
                            </span>
                        </p>
                    </div>
                ) : null}
            </Card>
        </div>
    );
};

export default ExistingMultiStep;
