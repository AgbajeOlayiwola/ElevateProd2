import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

const LoginWith = ({
    display,
    labelI,
    labelII,
    placeholderI,
    placeholderII,
    displayInput
}) => {
    console.log(displayInput);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = ({ data }) => {
        console.log(data);
        router.push('../Verify');
    };
    return (
        <div>
            {/* omnilite part  */}

            <div
                onSubmit={handleSubmit(onSubmit)}
                className={display ? styles.Log : styles.notLog}
            >
                {/* register your input into the hook by invoking the "register" function */}
                <div>
                    <label>{labelI}</label>
                    <br />
                    <input
                        placeholder={placeholderI}
                        className={styles.idInput}
                        {...register('Name')}
                    />
                </div>
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
            {/* ominlite part end  */}
        </div>
    );
};

export default LoginWith;
