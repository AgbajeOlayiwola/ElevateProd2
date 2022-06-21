import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import { ButtonComp } from '../../../components';

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(watch('example')); // watch input value by passing the name of it

    return (
        <div className={styles.cover}>
            <section className={styles.sectionI}>
                <h2 className={styles.bvn}>
                    Input your BVN and open a Business Account in
                    <span> 3 minutes.</span>
                </h2>
                <svg
                    width="2"
                    height="342"
                    viewBox="0 0 2 342"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1 0V387" stroke="white" stroke-dasharray="8 8" />
                </svg>
            </section>
            <section className={styles.sectionII}>
                <div>
                    <div>
                        <h1 className={styles.signup}>Sign Up</h1>
                    </div>
                </div>
                {/* /* "handleSubmit" will validate your inputs before invoking
                "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div>
                        <label>Preffered Name</label>
                        <br />
                        <input
                            placeholder="Enter Your Name"
                            className={styles.textInput}
                            defaultValue="test"
                            {...register('example')}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Email Address</label>
                        <br />
                        <input
                            placeholder="Enter Your Email"
                            className={styles.textInput}
                            {...register('exampleRequired', { required: true })}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Password</label>
                        <br />
                        <input
                            placeholder="Password"
                            className={styles.textInput}
                            {...register('exampleRequired', { required: true })}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Confirm Password</label>
                        <br />
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            {...register('exampleRequired', { required: true })}
                        />
                    </div>
                    <div>
                        <input type="radio" className={styles.termcondition} />
                        <label>
                            I agree with Ellevate App
                            <span> Terms and Conditions</span>
                        </label>
                    </div>
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && (
                        <span>This field is required</span>
                    )}
                </form>
                <ButtonComp link="../Success" />
            </section>
        </div>
    );
};

export default Signup;
