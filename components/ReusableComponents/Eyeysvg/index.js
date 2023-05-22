import React, { useEffect, useState } from 'react';
import Signup from '../../../pages/Auth/SignUp';
import styles from './styles.module.css';
import Overlay from '../Overlay';
import { useForm } from 'react-hook-form';
import ButtonComp from '../Button';
import StorePopup from '../StorePopup';
import { useDispatch, useSelector } from 'react-redux';
import { verifyTransactionPinGet } from '../../../redux/actions/actions';
import OutsideClick from '../OutsideClick';
const Visbility = ({ typeSet, color, input }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(true);
    const [visible, setVisible] = useState(false);
    const [showTransId, setShowtransId] = useState(false);
    const visibilityToggle = () => {
        setVisible(true);
        setType((prev) => !prev);
        typeSet(type);
    };
    const visibilityToggleoff = () => {
        if (input === 'input') {
            setVisible((prev) => !prev);
            setType((prev) => !prev);
            typeSet(type);
        } else {
            setShowtransId(true);
        }
    };
    const numOfFields = 6;
    const [tansactiopnPinResponse, setTransactionPinResponse] = useState('');
    const [activeBtn, setActiveBtn] = useState(true);
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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { verifyTransactionPinSuccess, verifyTransactionPinErrorMessage } =
        useSelector((state) => state.verifyTransactionPinReducer);
    const submitPin = (e) => {
        e.preventDefault();
        console.log('check');
        const data = {
            pin: ssnValues.join('')
        };
        dispatch(verifyTransactionPinGet(data));

        console.log(verifyTransactionPinErrorMessage);
    };
    useEffect(() => {
        console.log(verifyTransactionPinErrorMessage);
        if (verifyTransactionPinSuccess) {
            setVisible(true);
            setType(false);
            typeSet(type);
            setShowtransId(false);
        } else {
            setTransactionPinResponse(verifyTransactionPinErrorMessage);
        }
    }, [verifyTransactionPinErrorMessage, verifyTransactionPinSuccess]);

    return (
        <div className={styles.relativity}>
            <span
                className="material-symbols-outlined"
                id={color !== 'green' ? styles.notGreen : styles.green}
                style={{
                    zIndex: '10',
                    fontWeight: '300',
                    fontSize: '21px',
                    color: '#C6C6C6',
                    cursor: 'pointer'
                }}
                onClick={visible ? visibilityToggleoff : visibilityToggle}
            >
                {visible ? 'visibility' : 'visibility_off'}
            </span>
            {showTransId ? (
                <OutsideClick
                    onClickOutside={() => {
                        setShowtransId(false);
                    }}
                >
                    <form className={styles.transaId}>
                        {verifyTransactionPinErrorMessage ? (
                            <p className={styles.error}>
                                {tansactiopnPinResponse?.data?.message}
                            </p>
                        ) : null}
                        <p className={styles.transactPin}>
                            Enter Transaction Pin
                        </p>
                        <div className={styles.otpInps}>
                            <input
                                type="password"
                                name="ssn-1"
                                {...register('ssn-1')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                            <input
                                type="password"
                                name="ssn-2"
                                {...register('ssn-2')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                            <input
                                type="password"
                                name="ssn-3"
                                {...register('ssn-3')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                            <input
                                type="password"
                                name="ssn-4"
                                {...register('ssn-4')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                            <input
                                type="password"
                                name="ssn-5"
                                {...register('ssn-5')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                            <input
                                type="password"
                                name="ssn-6"
                                {...register('ssn-6')}
                                maxLength={1}
                                onInput={handleChange}
                            />
                        </div>
                        <div onClick={submitPin}>
                            <ButtonComp
                                // onClick={submitPin}
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Confirm"
                                type="submit"
                                // err={isLoading}
                            />
                        </div>
                    </form>
                </OutsideClick>
            ) : null}
        </div>
    );
};
export default Visbility;
