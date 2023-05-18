import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    ecobankOnlineData,
    accountNumberData
} from '../../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import { encrypt } from '../../../redux/helper/hash';
import Visbility from '../Eyeysvg';

const Ecoonline = () => {
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { ecobankOnline, errorMessage } = useSelector(
        (state) => state.ecobankOnlineReducer
    );
    const { accountNumber, errorMessages } = useSelector(
        (state) => state.accountNumberReducer
    );
    const types = (type) => {
        setOutType(type);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onlineSubmit = (data) => {
        setLoading(true);
        const postData = {
            username: data.username,
            password: encrypt(data.password)
        };
        dispatch(ecobankOnlineData(postData));
    };

    const onlineTest = () => {
        //console.log(ecobankOnline);
        //console.log(errorMessage);
        if (errorMessage !== '') {
            setError(errorMessage);
            setLoading(false);
        } else if (ecobankOnline.message === 'SUCCESS') {
            const accountDetails = {
                accountNo: ecobankOnline.data[0].accountNumber
            };
            dispatch(accountNumberData(accountDetails));
        }
    };
    const accountTest = () => {
        //console.log(accountNumber);
        if (accountNumber.message === 'SUCCESS') {
            window.localStorage.setItem(
                'account',
                JSON.stringify(accountNumber)
            );
            router.push('/Onboarding/ExistingProfileSetup');
        } else if (errorMessages) {
            setError(errorMessages);
            setLoading(false);
        }
    };
    useEffect(() => {
        onlineTest();
    }, [ecobankOnline, errorMessage]);
    useEffect(() => {
        accountTest();
    }, [accountNumber, errorMessages]);
    return (
        <form onSubmit={handleSubmit(onlineSubmit)}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.cover}>
                <div>
                    <label>Enter your Ecobank Online Username</label>
                    <input
                        placeholder="Ecobank Online Username"
                        type="text"
                        className={styles.idInput}
                        {...register('username', {
                            required: 'Ecobank Online Username is Required'
                        })}
                        name="username"
                    />
                </div>
                <p className={styles.error}>{errors?.username?.message}</p>
                <div>
                    <label>Enter Your Ecobank Online Password</label>
                    <div className={styles.passwordEye}>
                        <input
                            placeholder="Ecobank Online Password"
                            className={styles.idInput}
                            autoComplete="false"
                            {...register('password', {
                                required: 'Ecobank Online Password is Required'
                            })}
                            name="password"
                            type={outType ? 'text' : 'password'}
                        />
                        <Visbility typeSet={types} input="input" />
                    </div>
                </div>
                <p className={styles.error}>{errors?.password?.message}</p>
            </div>
            <div className={styles.btn}>
                {/* <Link href="/Onboarding/ExistingProfileSetup"> */}
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

                {/* </Link> */}
            </div>
        </form>
    );
};

export default Ecoonline;
