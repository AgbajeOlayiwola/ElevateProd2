import React from 'react';
import styles from './styles.module.css';

const Loading = () => {
    return (
        <div className={styles.cover}>
            <div className={styles.covInn}>
                <div className={styles.load}>
                    <svg
                        width="59"
                        height="15"
                        viewBox="0 0 59 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.svg}
                    >
                        <circle cx="7.5" cy="7.25684" r="7" fill="#6CCF00" />
                        <circle cx="29.5" cy="7.25684" r="7" fill="#6CCF00" />
                        <circle cx="51.5" cy="7.25684" r="7" fill="#6CCF00" />
                    </svg>
                </div>
                <p className={styles.kindly}>
                    An Email Containing the Verification Link Has Benn Sent To
                    Your Mail
                    {/* Kindly wait while the system fetches your account number,
                    this will take a moment. */}
                </p>
            </div>
        </div>
    );
};

export default Loading;
