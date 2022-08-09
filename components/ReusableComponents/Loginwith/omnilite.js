import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    omniliteData,
    accountNumberData
} from '../../../redux/actions/actions';
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
    const { accountNumber, errorMessages } = useSelector(
        (state) => state.accountNumberReducer
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
        dispatch(omniliteData(postData));
    };

    const OmniliteTest = () => {
        console.log(omnilite);
        console.log(errorMessage);
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
            // const accountDetails = {
            //     accountNo: omnilite.data.accounts[0].accountNumber
            // };
            // dispatch(accountNumberData(accountDetails));
        }
    };

    // const accountTest = () => {
    //     console.log(accountNumber);
    //     if (accountNumber.message === 'SUCCESS') {
    //         window.localStorage.setItem(
    //             'account',
    //             JSON.stringify(accountNumber)
    //         );
    //         router.push('/Onboarding/ExistingProfileSetup');
    //     } else if (errorMessages) {
    //         setError(errorMessages);
    //         setLoading(false);
    //     }
    // };
    useEffect(() => {
        OmniliteTest();
    }, [omnilite, errorMessage]);
    // useEffect(() => {
    //     accountTest();
    // }, [accountNumber, errorMessages]);
    const types = (type) => {
        setOutType(type);
    };
    return (
        <form onSubmit={handleSubmit(omniliteSubmit)}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.cover}>
                <div>
                    <label>Enter Your Omnilite Username</label>
                    <br />
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
                    <br />
                    <div className={styles.passwordEye}>
                        <input
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

export default Omnilite;
