import React, { useState } from 'react';
import styles from './styles.module.css';

// Number of input fields that make up SSN

const OtpInput = ({ otpFormData, setOtpFormData }) => {
    const numOfFields = 6;

    const [ssnValues, setValue] = useState(['']);
    const handleChange = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split('-');

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) <= 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                setValue((prevValue) => [...prevValue, value]);

                console.log(ssnValues);

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                } else {
                }
            }
        }
    };

    return (
        <div className={styles.otpInps}>
            <input
                type="password"
                name="ssn-1"
                maxLength={1}
                onChange={handleChange}
            />
            <input
                type="password"
                name="ssn-2"
                maxLength={1}
                onChange={handleChange}
            />
            <input
                type="password"
                name="ssn-3"
                maxLength={1}
                onChange={handleChange}
            />
            <input
                type="password"
                name="ssn-4"
                maxLength={1}
                onChange={handleChange}
            />
            <input
                type="password"
                name="ssn-5"
                maxLength={1}
                onChange={handleChange}
            />
            <input
                type="password"
                name="ssn-6"
                maxLength={1}
                onChange={handleChange}
            />
        </div>
    );
};

export default OtpInput;
