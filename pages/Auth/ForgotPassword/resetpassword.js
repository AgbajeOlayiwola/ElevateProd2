import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { ButtonComp } from '../../../components';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';

const ResetPassword = ({ submit, forgotPasswordErrorMessages, loading }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [outTypes, setOutTypes] = useState();
    const types = (type) => {
        setOutTypes(type);
    };
    const type = (type) => {
        setOutType(type);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    return (
        <div className={styles.covWrapper}>
            <div className={styles.create}>
                <h2>Create New Password</h2>
                <p>
                    Your new password must be different from previous passwords
                    used.
                </p>
            </div>
            <form className={styles.formCre} onSubmit={handleSubmit(submit)}>
                {forgotPasswordErrorMessages ? (
                    <p className={styles.errors}>
                        {forgotPasswordErrorMessages}
                    </p>
                ) : null}
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <div className={styles.divs}>
                        <LockSvg />
                        <input
                            type={outTypes ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="Enter your Password"
                            {...register('newPassword', {
                                required: 'New Password is required'
                            })}
                        />
                        <Visbility typeSet={types} />
                    </div>
                    <p className={styles.errors}>
                        {errors.newPassword?.message}
                    </p>
                </div>
                <div>
                    <label htmlFor="confnewPassword">
                        Confirm New Password
                    </label>
                    <div className={styles.divs}>
                        <LockSvg />
                        <input
                            type={outType ? 'text' : 'password'}
                            name="confnewPassword"
                            placeholder="Confirm your Password"
                            {...register('confnewPassword', {
                                required: 'Confirm Password is required'
                            })}
                        />
                        <Visbility typeSet={type} />
                    </div>
                    <p className={styles.errors}>
                        {errors.confnewPassword?.message}
                    </p>
                </div>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    type="submit"
                    text="Create New Password"
                    loads={loading}
                />
            </form>
        </div>
    );
};

export default ResetPassword;
