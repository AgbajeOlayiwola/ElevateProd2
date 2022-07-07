import React, { useState } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ButtonComp from '../../ReusableComponents/Button';

const StepFour = () => {
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
    const [activeBtn, setActiveBtn] = useState(true);

    return (
        <div>
            <h1 className={styles.header}>Complete Your Profile</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.bord}>
                        <div className={styles.inps}>
                            <label>
                                Enter RC Number/Business Registration Number{' '}
                            </label>

                            <br />

                            <input
                                placeholder="Enter RC Number"
                                className={styles.textInput}
                                required
                                {...register('email', {
                                    required: 'Rc Number is Required'
                                    // pattern: {
                                    //     // eslint-disable-next-line
                                    //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    //     message: 'Invalid email address'
                                    // }
                                })}
                            />
                        </div>
                        <div className={styles.inps}>
                            <label>
                                Enter TIN <i>(optional)</i>{' '}
                            </label>
                            <br />

                            <input
                                placeholder="Enter Tin"
                                className={styles.textInput}
                                required
                                {...register('tin', {
                                    required: 'Tin is Required'
                                    // pattern: {
                                    //     // eslint-disable-next-line
                                    //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    //     message: 'Invalid email address'
                                    // }
                                })}
                            />
                        </div>

                        <div className={styles.inps}>
                            <label>Select Your Business Type </label>
                            {errors.email?.message}
                            <br />

                            <select>
                                <option>Search Your Business Type</option>
                            </select>
                        </div>
                        <div className={styles.inps}>
                            <label>Enter Your Business Address </label>
                            {errors.email?.message}
                            <br />

                            <input
                                placeholder="Enter Your Business Address"
                                className={styles.textInput}
                                required
                                {...register('email', {
                                    required: 'Business Address is Required',
                                    pattern: {
                                        // eslint-disable-next-line
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                        </div>
                        <div className={styles.inps}>
                            <label>Select Your Local Government </label>
                            {errors.email?.message}
                            <br />

                            <select>
                                <option>Select Your Local Goernment</option>
                            </select>
                        </div>
                        <div className={styles.inps}>
                            <label>Select Your State </label>
                            {errors.email?.message}
                            <br />

                            <select>
                                <option>Search Your State</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.inps}>
                        <label>
                            Enter Referal Code <i>(optional)</i>{' '}
                        </label>
                        {errors.email?.message}
                        <br />

                        <input
                            placeholder="Enter Referal Code"
                            className={styles.textInput}
                            required
                            {...register('email', {
                                required: 'Business Address is Required',
                                pattern: {
                                    // eslint-disable-next-line
                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <Link href="/Succes">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Successs"
                            type="button"
                            // onClick={handleShowSuccessStep}
                            // onClick={handleShowFourthStep}
                        />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default StepFour;
