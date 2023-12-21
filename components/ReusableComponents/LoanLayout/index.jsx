import React from 'react';
import ArrowBackSvg from '../ArrowBackSvg';
import styles from './styles.module.css';

const LoanLayout = ({ action, title, children, backward, comingFrom }) => {
    return (
        <div className={styles.loanLayout}>
            {comingFrom === 'loan' ? null : (
                <div className={styles.loanLayoutHead} onClick={backward}>
                    <ArrowBackSvg color="#005B82" action={action} />
                    <h2>{title}</h2>
                </div>
            )}
            <div className={styles.loanLayoutBody}>{children}</div>
        </div>
    );
};

export default LoanLayout;
