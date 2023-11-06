import React, { useState } from 'react';
import AnalyticsHome from '../../../components/layout/Analytics/AnalyticsHome';
import GeneralAnalytics from '../../../components/layout/Analytics/GeneralAnalytics';
import PaymentAnalytics from '../../../components/layout/Analytics/PaymentAnalytics';
import StoreFrontAnalytics from '../../../components/layout/Analytics/StoreFrontAnalytics';
import styles from './styles.module.css';

const Analytics = () => {
    const [page, setPage] = useState(0);
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <AnalyticsHome nextPage={() => setPage(1)} />;
            case 1:
                return (
                    <GeneralAnalytics
                        nextPage={() => setPage(2)}
                        nextStore={() => setPage(3)}
                    />
                );
            case 2:
                return (
                    <PaymentAnalytics
                        nextPage={() => setPage(1)}
                        prevPage={() => setPage(1)}
                    />
                );
            case 3:
                return (
                    <StoreFrontAnalytics
                        nextPage={() => setPage(1)}
                        prevPage={() => setPage(1)}
                    />
                );
        }
    };
    return (
        <div className={styles.covert}>
            <div>{conditionalComponent()}</div>
        </div>
    );
};

export default Analytics;
