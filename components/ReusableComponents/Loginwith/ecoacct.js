import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { accountNumberData } from '../../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import Modal from 'react-modal';

const Ecoacct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { accountNumber, errorMessages } = useSelector(
        (state) => state.accountNumberReducer
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const eccoacctSubmit = (data) => {
        setLoading(true);
        const postData = {
            accountNo: data.accountNumber
        };
        dispatch(accountNumberData(postData));
    };
    const acctTest = () => {
        //console.logerrorMessages);
        if (errorMessages === 'Account already exists with the phone') {
            router.push('/Auth/Login');
        } else if (errorMessages) {
            setError(errorMessages);
            setLoading(false);
        } else if (accountNumber.message === 'SUCCESS') {
            router.push('/Onboarding/ExistingProfileSetup');
            const data = {
                email: accountNumber.data.email,
                accountNumber: accountNumber.data.accountNumber,
                fullName: accountNumber.data.fullName,
                phoneNumber: accountNumber.data.phoneNumber
            };

            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            // window.localStorage.removeItem('userId');
            if (accountNumber.data.email === null) {
                accountNumber.data = {
                    ...accountNumber.data,
                    email: 'topeakinfe@gmail.com'
                };
            }

            window.localStorage.setItem(
                'account',
                JSON.stringify(accountNumber.data)
            );
        }
    };
    useEffect(() => {
        acctTest();
    }, [accountNumber, errorMessages]);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <form onSubmit={handleSubmit(eccoacctSubmit)}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.cover}>
                <div>
                    <label>Enter Your Ecobank Account Number</label>
                    <br />
                    <input
                        placeholder="123*******62"
                        type="text"
                        className={styles.idInput}
                        {...register('accountNumber', {
                            required: 'Account Number is Required'
                        })}
                        name="accountNumber"
                    />
                </div>
                <p className={styles.error}>{errors?.accountNumber?.message}</p>
            </div>
            <div className={styles.btn}>
                {/* <Link href="/Onboarding/ExistingProfileSetup"> */}

                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Login"
                    type="submit"
                    loads={loading}
                    err={errorMessages}
                />
            </div>
        </form>
    );
};

export default Ecoacct;
