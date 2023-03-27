import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { omniliteDataa } from '../../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import Visbility from '../Eyeysvg';
// import { encrypt } from '../../../redux/helper/hash';

const Omnilite = () => {
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { isLoading, omnilite, errorMessage } = useSelector(
        (state) => state.omniliteReducer
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const omniliteSubmit = (data) => {
        if (error) {
            setError('');
        }
        setLoading(true);
        const postData = {
            username: data.username,
            password: data.password
        };
        dispatch(omniliteDataa(postData));
    };

    const OmniliteTest = () => {
        //console.logomnilite);
        //console.logerrorMessage);
        if (errorMessage) {
            setError(errorMessage);
            setLoading(false);
        } else if (omnilite.message === 'Success') {
            const data = {
                email: omnilite.data.userInfo.email,
                accountNumber: omnilite.data.meta.accountNumber,
                fullName: omnilite.data.meta.fullName,
                phoneNumber: omnilite.data.meta.phoneNumber
            };
            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem(
                'account',
                JSON.stringify(omnilite.data.meta)
            );
            router.push('/Onboarding/ExistingProfileSetup');
        }
    };

    useEffect(() => {
        OmniliteTest();
    }, [omnilite, errorMessage]);
    const types = (type) => {
        setOutType(type);
    };
    return (
        <form onSubmit={handleSubmit(omniliteSubmit)}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.cover}>
                <div>
                    <label>Enter Your Omnilite Username</label>
                    <input
                        placeholder="Omnilite Username"
                        type="text"
                        className={styles.idInput}
                        {...register('username', {
                            required: 'Username is Required'
                        })}
                        name="username"
                    />
                </div>
                <p className={styles.error}>{errors?.username?.message}</p>
                <div>
                    <label>Enter Your Omnilite Password</label>
                    <div className={styles.passwordEye}>
                        <input
                            autoComplete="false"
                            placeholder="Omnilite Password"
                            className={styles.idInput}
                            {...register('password', {
                                required: 'Password is Required'
                            })}
                            name="password"
                            type={outType ? 'text' : 'password'}
                        />
                        <Visbility typeSet={types} />
                    </div>
                </div>
                <p className={styles.error}>{errors?.password?.message}</p>
            </div>
            {/* <div className={styles.btn}>
                {loading ? (
                    <Loader />
                ) : (
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Login"
                        type="submit"
                    />
                )}
            </div> */}
        </form>
    );
};

export default Omnilite;
