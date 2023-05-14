import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Overlay from '../Overlay';
import CloseButton from '../CloseButtonSvg';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';
import Loader from '../Loader';
import { loadAccountPrimary } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

const ReceivePaymentFirst = ({
    firstTitle,
    buttonText,
    closeAction,
    action,
    isLoading,
    overlay,
    type,
    typeAction,
    error
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [description, setDescription] = useState('');
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    // const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const myref = useRef();
    useEffect(() => {
        console.log(error);
        dispatch(loadAccountPrimary());
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
        // const fetchCountryApi =  () => {
        //     const countriesApi = await axios(
        //         'https://ellevate-app.herokuapp.com/countries'
        //     );
        //     const countriesData = await countriesApi.json();
        //     setAmount(countriesData);
        //     //console.log(countriesData);
        //     fetchCountryApi();
        // };
    }, []);
    useEffect(() => {
        console.log(accountPrimarys);
    }, [accountPrimarys]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    //console.log(amount);
    const banks = [
        {
            bankName: 'GTBank',
            bankCode: '*737*',
            bankID: '000'
        },
        {
            bankName: 'First Bank',
            bankCode: '*894*',
            bankID: '000'
        },
        {
            bankName: 'Zenith Bank',
            bankCode: '*966*',
            bankID: '000'
        },
        {
            bankName: 'UBA',
            bankCode: '*919*',
            bankID: '000'
        },
        {
            bankName: 'Stanbic Bank',
            bankCode: '*909*',
            bankID: '000'
        },
        {
            bankName: 'Sterling Bank',
            bankCode: '*822*',
            bankID: '000'
        },
        {
            bankName: 'Unity Bank',
            bankCode: '*7799*',
            bankID: '000'
        },
        {
            bankName: 'Keystone Bank',
            bankCode: '*7111*',
            bankID: '000'
        },
        {
            bankName: 'Fidelity Bank',
            bankCode: '*770*',
            bankID: '000'
        },
        {
            bankName: 'Ecobank',
            bankCode: '*326*',
            bankID: '000'
        },
        {
            bankName: 'Wema Bank',
            bankCode: '*945*',
            bankID: '000'
        },
        {
            bankName: 'Access Bank',
            bankCode: '*901*',
            bankID: '000'
        },
        {
            bankName: 'Access (Diamond )',
            bankCode: '*426*',
            bankID: '000'
        },
        {
            bankName: 'FCMB',
            bankCode: '*329*',
            bankID: '000'
        },
        {
            bankName: 'Heritage Bank',
            bankCode: '*745*',
            bankID: '000'
        },
        {
            bankName: 'Union Bank',
            bankCode: '*826*',
            bankID: '000'
        },
        {
            bankName: 'VFD MFB',
            bankCode: '*5037*',
            bankID: '000'
        },
        {
            bankName: 'Rubies (Highstreet) MFB',
            bankCode: '*7797*',
            bankID: '000'
        },
        {
            bankName: 'Globus bank',
            bankCode: '*989*',
            bankID: '000'
        },
        {
            bankName: 'Kuda Bank',
            bankCode: '*5593*',
            bankID: '000'
        }
    ];
    return (
        <Overlay overlay={overlay}>
            <div className={styles.firstDiv} ref={myref}>
                <div className={styles.firstBody}>
                    <div>
                        <h2>{firstTitle}</h2>
                        {/* <p className={styles.accept}>
                            (Accepts Card Payment without POS)
                        </p> */}
                        <form onSubmit={handleSubmit(action)}>
                            {/* <div className={styles.formGroup}>
                                <label>Account to Credit</label>
                                <select>
                                    <option>
                                        {' '}
                                        Source <span>- Marvelous N******</span>
                                    </option>
                                    <option>
                                        {' '}
                                        Source <span>- Troniclab</span>
                                    </option>
                                </select>
                            </div> */}
                            <div className={styles.formGroup}>
                                <label>Account Number</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={accountPrimarys?.accountNumber}
                                />
                                <p className={styles.error}>
                                    {errors?.amount?.message}
                                </p>

                                <label>Enter Amount</label>
                                <input
                                    {...register('amount', {
                                        required: 'Please enter Amount',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Amount can only be number '
                                        }
                                    })}
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                />
                                <p className={styles.error}>
                                    {errors?.amount?.message}
                                </p>
                            </div>
                            {firstTitle === 'Create USSD Payment Code' ? (
                                <div className={styles.formGroup}>
                                    <label>Bank</label>
                                    <select {...register('bank')}>
                                        <option>Select Bank</option>
                                        {banks?.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {item.bankName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            ) : null}
                            <div className={styles.formGroup}>
                                <label>Payment title</label>
                                <input
                                    {...register('accountName', {
                                        required: 'Please enter Paayment Name',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/i,
                                            message: 'Only Alphabelts allowed'
                                        }
                                    })}
                                    type="text"
                                    placeholder="Enter Payment Name"
                                />
                                <p className={styles.error}>
                                    {errors?.accountName?.message}
                                </p>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    {...register('description', {
                                        required: 'Please enter Description',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/i,
                                            message: 'Only Alphabelts allowed'
                                        }
                                    })}
                                    name="description"
                                    id=""
                                    placeholder="Enter note to be displayed to customer."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (e.target.value.length === 0) {
                                            setActiveBtn(false);
                                        } else if (e.target.value.length > 0) {
                                            setActiveBtn(true);
                                        }
                                    }}
                                ></textarea>
                                <p className={styles.error}>
                                    {errors?.description?.message}
                                </p>
                            </div>
                            {error ? (
                                <p className={styles.error}>{error}</p>
                            ) : null}
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text={buttonText}
                                    type="submit"
                                />
                            )}
                        </form>
                    </div>
                </div>
                <div>
                    {/* <img
                        src="/Assets/Images/Group 33664.png"
                        width="100%"
                        height="100%"
                    /> */}
                    <img
                        src="/Assets/Images/greenmoney.png"
                        alt=""
                        className={styles.greenImg}
                    />
                    <CloseButton
                        action={closeAction}
                        classes={styles.closebtn}
                        color="white"
                    />
                </div>
            </div>
        </Overlay>
    );
};

export default ReceivePaymentFirst;
