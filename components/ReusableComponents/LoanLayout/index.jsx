import React from 'react';
import styles from './styles.module.css';
import ArrowBackSvg from '../ArrowBackSvg';

const LoanLayout = ({ action, title, children }) => {
    return (
        <div className={styles.loanLayout}>
            <div className={styles.loanLayoutHead}>
                <ArrowBackSvg color="#005B82" action={action} />
                <h2>{title}</h2>
            </div>
            <div className={styles.loanLayoutBody}>{children}</div>
        </div>
    );
};

export default LoanLayout;
