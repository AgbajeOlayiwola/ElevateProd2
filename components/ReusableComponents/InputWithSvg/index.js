import React from 'react';
import styles from './styles.module.css';
const InputWithSvg = ({ label, type, placeholder, svg, name, onChange }) => {
    return (
        <div className={styles.inputDiv}>
            <label>{label}</label>
            <div className={styles.inputDivSvg}>
                {svg}
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default InputWithSvg;
