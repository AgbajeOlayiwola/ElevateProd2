import React from 'react';
import styles from './styles.module.css';

const WrappedInput = ({ label, link, svg, onChange, name, value }) => {
    return (
        <div className={styles.input}>
            <label>{label}</label>
            <div className={styles.inputWrap}>
                {svg}
                <p>{link}</p>
                <input
                    value={value}
                    name={name}
                    onChange={onChange}
                    className={styles.inputWithLogo}
                    type="text"
                    placeholder="Name"
                />
            </div>
        </div>
    );
};

export default WrappedInput;
