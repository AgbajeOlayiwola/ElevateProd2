import React, { useState } from 'react';
import styles from './styles.module.css';

const SwitchButton = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);

    const switchRegistrationStatus = () => {
        setIsRegistered((prev) => !prev);
        setBgcolor((prevState) => !prevState);
    };
    return (
        <div className={styles.ButtonWrapper}>
            <span
                className={styles.ToggleNo}
                onClick={switchRegistrationStatus}
                style={
                    bgcolor
                        ? { background: '#f8f8f8' }
                        : { background: '#6ccf00' }
                }
            >
                <p
                    className={styles.ToggleNoText}
                    style={
                        bgcolor ? { color: '#a5a5a5' } : { color: '#ffffff' }
                    }
                >
                    No
                </p>
            </span>
            <span
                className={styles.ToggleYes}
                onClick={switchRegistrationStatus}
                style={
                    bgcolor
                        ? { background: '#6ccf00' }
                        : { background: '#f8f8f8' }
                }
            >
                <p
                    className={styles.ToggleYesText}
                    style={
                        bgcolor ? { color: '#ffffff' } : { color: '#a5a5a5' }
                    }
                >
                    Yes
                </p>
            </span>
        </div>
    );
};

export default SwitchButton;
