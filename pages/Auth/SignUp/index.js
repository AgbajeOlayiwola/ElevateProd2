import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import { ButtonComp } from '../../../components';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();

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
                    height="227"
                    viewBox="0 0 2 227"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1 0V387" stroke="white" strokeDasharray="8 8" />
                </svg>
            </section>
            <section className={styles.sectionII}>
                <div>
                    <div>
                        <h1 className={styles.signup}>Sign up</h1>
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
                            {...register('Name')}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Email Address</label>
                        <br />
                        <input
                            placeholder="Enter Your Email"
                            className={styles.textInput}
                            required
                            {...register('Email', { required: true })}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Password</label>
                        <br />
                        <input
                            placeholder="Password"
                            className={styles.textInput}
                            {...register('password', { required: true })}
                        />
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label>Confirm Password</label>
                        <br />
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            required
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
                    <ButtonComp
                        width="100%"
                        height="52px"
                        text="Proceed"
                        type="submit"
                    />
                </form>

                <div>
                    <p className={styles.accout}>
                        Do you Have An Accout? <span>Sign up</span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Signup;
