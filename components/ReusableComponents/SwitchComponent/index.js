import React, { useState } from 'react';
import styles from './styles.module.css';
const SwitchComponent = () => {
    const [swithc, setSwitch] = useState(false);
    const change = () => {
        setSwitch((prev) => !prev);
    };
    return (
        <div>
            {' '}
            <label className={swithc ? styles.beneChecked : styles.beneCheck}>
                <input type="checkbox" onClick={change} />
                <span>
                    <i></i>
                </span>
            </label>
        </div>
    );
};

export default SwitchComponent;
