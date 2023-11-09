import { useRef, useState } from 'react';
import styles from './styles.module.css';

const OtpInput = ({ onOtpChange, otpfields, pin }) => {
    const otpLength = otpfields;
    const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
    const otpInputs = useRef([]);

    const handleInputChange = (inputIndex, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[inputIndex] = value;
        setOtpValues(newOtpValues);

        // Concatenate the values to form the OTP string
        const myOtp = newOtpValues.join('');

        // Call the callback function to pass the OTP value to the parent component
        onOtpChange(myOtp);

        if (value && inputIndex < otpLength - 1) {
            const nextInput = otpInputs.current[inputIndex + 1];
            if (nextInput) {
                nextInput.focus(); // Move cursor to the next input if it exists
            }
        }
    };

    const handleInputKeyPress = (event, inputIndex) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            handleInputChange(inputIndex, '');

            if (inputIndex > 0) {
                const prevInput = otpInputs.current[inputIndex - 1];
                if (prevInput) {
                    prevInput.focus(); // Move cursor to the previous input
                }
            }
        }
    };

    return pin ? (
        <div className={styles.pinInputs}>
            {otpValues.map((value, index) => (
                <input
                    key={index}
                    type="password"
                    className={styles.otpinput}
                    maxLength={1}
                    value={value}
                    onInput={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleInputKeyPress(e, index)}
                    ref={(input) => input && (otpInputs.current[index] = input)}
                />
            ))}
        </div>
    ) : (
        <div className={styles.divInputs}>
            {otpValues.map((value, index) => (
                <input
                    key={index}
                    type="password"
                    className={styles.otpinput}
                    maxLength={1}
                    value={value}
                    onInput={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleInputKeyPress(e, index)}
                    ref={(input) => input && (otpInputs.current[index] = input)}
                />
            ))}
        </div>
    );
};

export default OtpInput;
