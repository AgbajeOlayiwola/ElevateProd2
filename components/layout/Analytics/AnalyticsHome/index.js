import React from 'react';
import EmptyAnalytics from '../../../ReusableComponents/EmptyAnalyticsSvg';
import styles from './styles.module.css';

const AnalyticsHome = ({ nextPage }) => {
    const goHome = () => {
        nextPage();
    };
    return (
        <div>
            <div className={styles.analytics}>
                <h1>Analytics</h1>
                <p>
                    See a list of logistics integration enabled for your
                    storefront deliveries
                </p>
            </div>
            <div className={styles.emptyDiv}>
                <div className={styles.empty}>
                    <EmptyAnalytics />
                    <p>
                        You have no analytics yet. Your data will appear here
                        once you start using the App frequently.
                    </p>
                    <button onClick={goHome}>Go to home</button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHome;
