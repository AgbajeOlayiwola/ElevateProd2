import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visbility from '../Eyeysvg';
import styles from './styles.module.css';

const LoginWith = ({
    display,
    labelI,
    labelII,
    placeholderI,
    placeholderII,
    displayInput,
    bankdets,
    type
}) => {
    console.log(displayInput);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = ({ data }) => {
        router.push('../Verify');
    };

    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();

    return (
        <div className="loginWithClass">
            {/* omnilite part  */}

            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <label>{labelI}</label>
                <br />
                <input placeholder={placeholderI} className={styles.idInput} />
            </div>
            {/* bank details only */}
            <div className={bankdets ? styles.show : styles.noShow}>
                <label>Expiry Date</label>
                <br />
                <input
                    placeholder=""
                    className={styles.passwordInput}
                    type="month"
                />
            </div>
            <div className={styles.cvvCode}>
                <div className={bankdets ? styles.show : styles.noShow}>
                    <label>CVV</label>
                    <br />
                    <input
                        placeholder="CVV"
                        className={styles.passwordInput}
                        maxLength="3"
                        type="password"
                    />
                </div>
            </div>
            {/* end  */}
            {/* include validation with required or other standard HTML validation rules */}
            <div className={displayInput ? styles.noShow : styles.show}>
                <input
                    placeholder={placeholderII}
                    className={styles.passwordInput}
                    required
                    type={outType ? 'password' : 'text'}
                    onChange={(e) => setCount(e.target.value.length)}
                />

                <Visbility typeSet={types} />
            </div>
            {count <= 1 || count >= 8 ? null : (
                <p className={styles.error}>
                    Minimum Password length is 8 Characters
                </p>
            )}
        </div>
    );
};

export default LoginWith;
