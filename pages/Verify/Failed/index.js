import { Router } from 'next/router';
import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
const Failed = () => {
    const router = useRouter();
    const restart = () => {
        router.push('../../Onboarding/ProfileSetup');
    };
    return (
        <div className={styles.cover}>
            <div className={styles.coverInn}>
                <div className={styles.failSvg}>
                    <svg
                        width="125"
                        height="124"
                        viewBox="0 0 125 124"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M62.9981 0C50.7356 0 38.7486 3.63624 28.5527 10.4489C18.3569 17.2615 10.4102 26.9446 5.71754 38.2736C1.02491 49.6026 -0.202896 62.0688 2.18939 74.0956C4.58167 86.1224 10.4866 97.1698 19.1575 105.841C27.8283 114.511 38.8756 120.416 50.9025 122.809C62.9293 125.201 75.3954 123.973 86.7244 119.281C98.0534 114.588 107.737 106.641 114.549 96.4453C121.362 86.2495 124.998 74.2624 124.998 62C124.998 45.5566 118.466 29.7866 106.839 18.1594C95.2114 6.53213 79.4415 0 62.9981 0ZM55.2997 31C55.2997 28.9446 56.1162 26.9733 57.5696 25.5199C59.0231 24.0665 60.9943 23.25 63.0497 23.25C65.1052 23.25 67.0764 24.0665 68.5298 25.5199C69.9832 26.9733 70.7997 28.9446 70.7997 31V66.5983C70.7997 67.6161 70.5993 68.6238 70.2098 69.5641C69.8203 70.5044 69.2495 71.3587 68.5298 72.0784C67.8102 72.7981 66.9558 73.3689 66.0155 73.7584C65.0752 74.1479 64.0675 74.3483 63.0497 74.3483C62.032 74.3483 61.0242 74.1479 60.0839 73.7584C59.1437 73.3689 58.2893 72.7981 57.5696 72.0784C56.85 71.3587 56.2791 70.5044 55.8897 69.5641C55.5002 68.6238 55.2997 67.6161 55.2997 66.5983V31ZM62.9981 100.75C61.2404 100.75 59.5223 100.229 58.0609 99.2523C56.5995 98.2758 55.4605 96.8879 54.7879 95.2641C54.1152 93.6403 53.9393 91.8535 54.2822 90.1296C54.625 88.4058 55.4714 86.8223 56.7142 85.5795C57.9571 84.3367 59.5405 83.4903 61.2644 83.1474C62.9882 82.8045 64.775 82.9805 66.3988 83.6531C68.0227 84.3257 69.4106 85.4648 70.3871 86.9262C71.3635 88.3876 71.8847 90.1057 71.8847 91.8633C71.8847 94.2202 70.9485 96.4806 69.2819 98.1471C67.6153 99.8137 65.3549 100.75 62.9981 100.75Z"
                            fill="#FF0000"
                        />
                    </svg>
                </div>
                <p className={styles.oops}>Oops</p>
                <div className={styles.someDiv}>
                    <p className={styles.some}>
                        Something went wrong, please try again.
                    </p>
                </div>
                <button onClick={restart} className={styles.btn}>
                    Try again
                </button>
            </div>
        </div>
    );
};

export default Failed;
