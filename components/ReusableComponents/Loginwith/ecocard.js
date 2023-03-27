import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { cardLoginData } from '../../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import { encrypt, decrypt } from '../../../redux/helper/hash';

const Ecocard = () => {
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [bankdets, setBankDets] = useState(false);
    const [number, setNumber] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { isLoading, cardLogin, errorMessage } = useSelector(
        (state) => state.cardLoginReducer
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const cardSubmit = (data) => {
        if (error) {
            setError('');
        }
        setLoading(true);
        let temp = data.expiryDate.split('/');
        let newTemp = temp[1] + temp[0];
        //console.logencrypt(data.cardNumber));
        //console.logencrypt(data.cvv));
        //console.lognewTemp);
        const postData = {
            pan: encrypt(data.cardNumber),
            affiliateCode: 'ENG',
            expiry: newTemp,
            cvv: encrypt(data.cvv)
        };
        // const postData = {
        //     pan: 'Xm1nMTtjwMYDH9twUj2+5qJP1Zdt2FBj',
        //     affiliateCode: 'ENG',
        //     expiry: '2504',
        //     cvv: 'zbM3LuiyTI0='
        // };
        //console.logdata);

        dispatch(cardLoginData(postData));
    };

    const CardTest = () => {
        //console.logcardLogin);
        //console.logerrorMessage);
        if (errorMessage) {
            setError(errorMessage);
            setLoading(false);
        } else if (cardLogin.statusCode === 200) {
            const data = {
                email: cardLogin.data.email,
                accountNumber: cardLogin.data.accountNumber,
                fullName: cardLogin.data.fullName,
                phoneNumber: cardLogin.data.phoneNumber
            };
            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem(
                'account',
                JSON.stringify(cardLogin.data)
            );
            router.push('/Onboarding/ExistingProfileSetup');
            //console.logcardLogin);
        }
    };

    useEffect(() => {
        CardTest();
    }, [cardLogin, errorMessage]);
    return (
        <form onSubmit={handleSubmit(cardSubmit)}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.cover}>
                <div>
                    <label>Ecobank Card number</label>
                    <input
                        placeholder="Ecobank Card number"
                        className={styles.idInput}
                        type="number"
                        {...register('cardNumber', {
                            required: 'Card Number is Required'
                        })}
                        name="cardNumber"
                    />
                </div>
                <p className={styles.error}>{errors?.cardNumber?.message}</p>
                <div className={styles.expCvv}>
                    <div className={styles.exp}>
                        <div className={styles.shows}>
                            <label>Expiry Date</label>
                            <input
                                placeholder="MM/YY"
                                className={styles.passwordInput}
                                autoComplete="false"
                                type="text"
                                {...register('expiryDate', {
                                    required: 'Expiry Date is Required'
                                })}
                                name="expiryDate"
                                onChange={(e) => {
                                    if (e.target.value.length === 2) {
                                        e.target.value += '/';
                                    }
                                    // setExpiryDate(e.target.value);
                                }}
                                maxLength="5"
                            />
                        </div>
                        <p className={styles.error}>
                            {errors?.expiryDate?.message}
                        </p>
                    </div>
                    <div className={styles.cvvCode}>
                        <div className={styles.shows}>
                            <label>CVV</label>
                            <input
                                placeholder="CVV"
                                className={styles.passwordInput}
                                autoComplete="false"
                                maxLength="3"
                                type="password"
                                {...register('cvv', {
                                    required: 'CVV is Required'
                                })}
                                name="cvv"
                            />
                            <p className={styles.error}>
                                {errors?.cvv?.message}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
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
            </div>
        </form>
    );
};

export default Ecocard;
