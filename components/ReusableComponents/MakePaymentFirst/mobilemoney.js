import React from 'react';
import styles from './styles.module.css';

import { useDispatch } from 'react-redux';
import socialdata from '../Lotties/loading.json';
const MobileMoney = ({ firstTitle }) => {
    const dispatch = useDispatch();

    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            <div>
                <div className={styles.mainDv}>
                    <div className={styles.billSingle}>
                        <h2> Mobile Money</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MobileMoney;
