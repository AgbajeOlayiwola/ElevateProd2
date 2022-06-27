import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

const LoginWith = ({
    display,
    labelI,
    labelII,
    placeholderI,
    placeholderII,
    displayInput,
    bankdets
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

    return (
        <div className='loginWithClass'>
            {/* omnilite part  */}

            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <label>{labelI}</label>
                <br />
                <input
                    placeholder={placeholderI}
                    className={styles.idInput}
                    {...register('Email')}
                />
            </div>
            {/* bank details only */}
            <div className={styles.cvvCode}>
                <div className={bankdets ? styles.show : styles.noShow}>
                    <label>CVV</label>
                    <br />
                    <input
                        placeholder={'CVV'}
                        className={styles.passwordInput}
                        type="password"
                        {...register('password', {
                            required: true
                        })}
                    />
                </div>
                <div className={bankdets ? styles.show : styles.noShow}>
                    <label>Passcode</label>
                    <br />
                    <input
                        placeholder={'PASSCODE'}
                        className={styles.passwordInput}
                        type="password"
                        {...register('password', {
                            required: true
                        })}
                    />
                </div>
            </div>
            {/* end  */}
            {/* include validation with required or other standard HTML validation rules */}
            <div className={displayInput ? styles.noShow : styles.show}>
                <label>{labelII}</label>
                <br />
                <input
                    placeholder={placeholderII}
                    className={styles.passwordInput}
                    type="password"
                    {...register('password', {
                        required: true
                    })}
                />
            </div>
        </div>
    );
};

export default LoginWith;
