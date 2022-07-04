import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import Card from '../NotRegisteredForms/Card';
import Visbility from '../../ReusableComponents/Eyeysvg';
import styles from './styles.module.css';

const RegisteredForm = ({ handleShowSecondStep, isRegistered }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };
    const types = (type) => {
        setOutType(type);
    };
    const [outType, setOutType] = useState();
    return (
        <>
            <h1 className={styles.header}>Profile Setup</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <div>
                    <label>Email Address </label>
                    {errors.email?.message}
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                // eslint-disable-next-line
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                        disabled
                        value="Agbajeolaiwola@gmai.com"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <br />
                    <div className={styles.divs}>
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            required
                            type={outType ? 'password' : 'text'}
                            onChange={(e) => setCount(e.target.value.length)}
                        />
                        <Visbility typeSet={types} />
                    </div>
                </div>

                <div>
                    <label>Confirm Password</label>
                    <br />
                    <div className={styles.divs}>
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            required
                            type={outType ? 'password' : 'text'}
                            onChange={(e) => setCount(e.target.value.length)}
                        />

                        <Visbility typeSet={types} />
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisteredForm;
