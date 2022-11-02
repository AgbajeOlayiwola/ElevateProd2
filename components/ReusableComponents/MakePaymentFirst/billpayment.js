import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    loadbillerCategory,
    loadbillerType,
    loadbillerPlan,
    postAirtimeNetwork
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightSvg from '../ReusableSvgComponents/ArrowRightSvg';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';

const BillPayment = ({
    action,
    firstTitle,
    buttonText,
    arrowAction,
    airtimeAction,
    scheduleLater,
    dataAction,
    bankAccounts
}) => {
    const [network, setNetwork] = useState('MTN Nigeria');
    const [networkData, setNetworkData] = useState({});
    // const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState([]);
    const [billerId, setBillerId] = useState('');

    const dispatch = useDispatch();
    const { billerCategory } = useSelector(
        (state) => state.billerCategoryReducer
    );
    const { airtimeNetwork } = useSelector(
        (state) => state.airtimeNetworkReducer
    );
    const { billerType } = useSelector((state) => state.billerTypeReducer);
    const { billerPlan } = useSelector((state) => state.billerPlanReducer);
    useEffect(() => {
        dispatch(loadbillerCategory('ENG'));
    }, []);
    useEffect(() => {
        if (billerCategory !== null) {
            setBillerCategories(billerCategory);
        }
    }, [billerCategory]);
    useEffect(() => {}, [billerType]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    console.log(billerCategories);
    const loadbillerTypeData = () => {
        if (firstTitle !== 'Bill Payment') {
            if (firstTitle === 'Cable Tv') {
                dispatch(loadbillerType('CABLETV'));
            } else {
                dispatch(loadbillerType(firstTitle));
            }
        }
        // setBillerId(e.target.value);
        setBillerTypes([]);
        setBillerPlans([]);
        if (firstTitle === 'AIRTIME') {
            dispatch(postAirtimeNetwork());
        } else if (firstTitle === 'UTILITY') {
            loadbillerType('UTILITY');
        }
    };
    useEffect(() => {
        loadbillerTypeData();
    }, [firstTitle]);
    useEffect(() => {
        if (billerType !== null) {
            setBillerTypes(billerType);
        }
    }, [billerType]);
    useEffect(() => {
        if (airtimeNetwork !== null) {
            setAirtimeNetworkData(airtimeNetwork);
        }
    }, [airtimeNetwork]);
    useEffect(() => {
        if (billerPlan !== null) {
            localStorage.setItem('Airtime', JSON.stringify(billerPlan));
        }
    }, [billerPlan]);
    return (
        <div>
            {firstTitle === 'Bill Payment' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>

                    {/* <div className={styles.beneficiary}>
                        <div className={styles.beneficiaryHeader}>
                            <h2>Recent</h2>
                            <p>View all</p>
                        </div>
                        <div className={styles.beneficiaryBody}>
                            <h2>No Recent Transactions</h2>
                            <div className={styles.beneficiarySingle}>
                                <div>
                                    <img
                                        src="../../Assets/Svgs/IkejaLogo.svg"
                                        alt=""
                                    />
                                </div>
                                <p className={styles.name}>Ikeja Electric</p>
                            </div>
                            <div className={styles.beneficiarySingle}>
                                <div>
                                    <img
                                        src="../../Assets/Svgs/gotv.svg"
                                        alt=""
                                    />
                                </div>
                                <p className={styles.name}>GOtv Subscriti...</p>
                            </div>
                            <div className={styles.beneficiarySingle}>
                                <BeneficiaryAvatarSvg />
                                <p className={styles.name}>Ikeja Electric</p>
                            </div>
                            <div className={styles.beneficiarySingle}>
                                <BeneficiaryAvatarSvg />
                                <p className={styles.name}>Ikeja Electric</p>
                            </div>
                            <div className={styles.beneficiarySingle}>
                                <BeneficiaryAvatarSvg />
                                <p className={styles.name}>Ikeja Electric</p>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.billBody}>
                        {billerCategories.billerCategoryInfoList?.map(
                            (bill, index) => {
                                return (
                                    <div
                                        className={styles.billSingle}
                                        onClick={arrowAction}
                                        key={index}
                                    >
                                        <p>{bill.categoryCode}</p>
                                        <ArrowRightSvg />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </>
            ) : firstTitle === 'AIRTIME' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit(airtimeAction)}>
                            <div className={styles.narration}>
                                <label>Source Account</label>
                                <select
                                    name=""
                                    id=""
                                    {...register('sourceAccount')}
                                >
                                    {bankAccounts?.map((accounts, index) => {
                                        return (
                                            <option
                                                value={accounts.accountId}
                                                key={index}
                                            >
                                                {accounts.accountNumber}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={styles.networkCarrier}>
                                <h2>Network</h2>
                                <div className={styles.networkBody}>
                                    {airtimeNetworkData.networks?.map(
                                        (networks, index) => {
                                            if (
                                                networks.name === 'MTN Nigeria'
                                            ) {
                                                localStorage.setItem(
                                                    'Airtime',
                                                    JSON.stringify(networks)
                                                );
                                            }
                                            if (
                                                networks.name === 'SOCHIENGMTN'
                                            ) {
                                                return null;
                                            } else {
                                                return (
                                                    <div
                                                        className={
                                                            network ===
                                                            networks.name
                                                                ? styles.networkActive
                                                                : styles.networkSingle
                                                        }
                                                        onClick={() => {
                                                            setNetwork(
                                                                networks.name
                                                            );
                                                            localStorage.setItem(
                                                                'Airtime',
                                                                JSON.stringify(
                                                                    networks
                                                                )
                                                            );
                                                        }}
                                                        key={index}
                                                    >
                                                        <div>
                                                            {networks.name ===
                                                            'MTN Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/mtn.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'Airtel Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/airtel.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'GLO Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/glo.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'Etisalat Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/9mobile.svg"
                                                                    alt=""
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                    )}
                                </div>
                            </div>
                            <div className={styles.networkForm}>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="0801 234 5678"
                                        name="phoneNumber"
                                        {...register('phoneNumber', {
                                            required:
                                                'Phone Number is required',
                                            minLength: {
                                                value: 11,
                                                message: 'Min length is 11'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'Max length is 11'
                                            },
                                            pattern: {
                                                value: /^[0-9]/i,
                                                message:
                                                    'Phone Number can only be number '
                                            }
                                        })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        name="amount"
                                        {...register('amount', {
                                            required: 'Amount  is required',

                                            pattern: {
                                                value: /^[0-9]/i,
                                                message:
                                                    'Amount can only be number '
                                            }
                                        })}
                                    />
                                </div>
                                <button type="submit">Get Airtime</button>
                            </div>
                            {/* <p className={styles.schedule}>
                                Not paying now?{' '}
                                <span onClick={scheduleLater}>
                                    Schedule for Later
                                </span>
                            </p> */}
                        </form>
                    </div>
                </>
            ) : firstTitle === 'Data' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit(dataAction)}>
                            <div className={styles.source}>
                                <h2>
                                    Source <span>- Marvelous N******</span>
                                </h2>
                                <SourceSvg />
                            </div>
                            <div className={styles.networkCarrier}>
                                <h2>Network</h2>
                                <div className={styles.networkBody}>
                                    <div
                                        className={
                                            network === 'mtn'
                                                ? styles.networkActive
                                                : styles.networkSingle
                                        }
                                        onClick={() => {
                                            setNetwork('mtn');
                                        }}
                                    >
                                        <div>
                                            <img
                                                src="../../Assets/Svgs/mtn.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            network === 'airtel'
                                                ? styles.networkActive
                                                : styles.networkSingle
                                        }
                                        onClick={() => {
                                            setNetwork('airtel');
                                        }}
                                    >
                                        <div>
                                            <img
                                                src="../../Assets/Svgs/airtel.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            network === 'glo'
                                                ? styles.networkActive
                                                : styles.networkSingle
                                        }
                                        onClick={() => {
                                            setNetwork('glo');
                                        }}
                                    >
                                        <div>
                                            <img
                                                src="../../Assets/Svgs/glo.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            network === '9mobile'
                                                ? styles.networkActive
                                                : styles.networkSingle
                                        }
                                        onClick={() => {
                                            setNetwork('9mobile');
                                        }}
                                    >
                                        <div>
                                            <img
                                                src="../../Assets/Svgs/9mobile.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.networkForm}>
                                <div className={styles.formGroup}>
                                    <label>Choose Plan</label>
                                    <select name="" id="">
                                        <option value="">Select Plan</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="0801 234 5678"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Amount</label>
                                    <input type="text" placeholder="0.00" />
                                </div>
                                <button>Get Data</button>{' '}
                            </div>
                            {/* <p className={styles.schedule}>
                                Not paying now?{' '}
                                <span onClick={scheduleLater}>
                                    Schedule for Later
                                </span>
                            </p> */}
                        </form>
                    </div>
                </>
            ) : firstTitle === 'UTILITY' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit(airtimeAction)}>
                            <div className={styles.narration}>
                                <label>Source Account</label>
                                <select
                                    name=""
                                    id=""
                                    {...register('sourceAccount')}
                                >
                                    {bankAccounts?.map((accounts, index) => {
                                        return (
                                            <option
                                                value={accounts.accountId}
                                                key={index}
                                            >
                                                {accounts.accountNumber}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={styles.narration}>
                                <label>Biller Type</label>
                                <select
                                    name=""
                                    id=""
                                    {...register('billerTypes', {
                                        required: 'Amount  is required'
                                    })}
                                    onChange={(e) => {
                                        dispatch(
                                            loadbillerPlan(e.target.value)
                                        );
                                    }}
                                >
                                    <option value="">Select biller Type</option>
                                    {billerTypes.billerInfoList?.map(
                                        (accounts, index) => {
                                            return (
                                                <option
                                                    value={accounts.billerCode}
                                                    key={index}
                                                >
                                                    {accounts.billerName}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                            {/* <div className={styles.networkCarrier}>
                                <h2>Network</h2>
                                <div className={styles.networkBody}>
                                    {airtimeNetworkData.networks?.map(
                                        (networks, index) => {
                                            if (
                                                networks.name === 'SOCHIENGMTN'
                                            ) {
                                                return null;
                                            } else {
                                                return (
                                                    <div
                                                        className={
                                                            network ===
                                                            networks.name
                                                                ? styles.networkActive
                                                                : styles.networkSingle
                                                        }
                                                        onClick={() => {
                                                            setNetwork(
                                                                networks.name
                                                            );
                                                            localStorage.setItem(
                                                                'Airtime',
                                                                JSON.stringify(
                                                                    networks
                                                                )
                                                            );
                                                        }}
                                                        key={index}
                                                    >
                                                        <div>
                                                            {networks.name ===
                                                            'MTN Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/mtn.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'Airtel Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/airtel.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'GLO Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/glo.svg"
                                                                    alt=""
                                                                />
                                                            ) : networks.name ===
                                                              'Etisalat Nigeria' ? (
                                                                <img
                                                                    src="../../Assets/Svgs/9mobile.svg"
                                                                    alt=""
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                    )}
                                </div>
                            </div> */}

                            <div className={styles.networkForm}>
                                <div className={styles.formGroup}>
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        name="amount"
                                        {...register('amount', {
                                            required: 'Amount  is required',

                                            pattern: {
                                                value: /^[0-9]/i,
                                                message:
                                                    'Amount can only be number '
                                            }
                                        })}
                                    />
                                </div>
                                {/* <div className={styles.formGroup}>
                                    <label>Payment Description</label>
                                    <input
                                        type="text"
                                        placeholder="Enter payment Description"
                                        name="paymentDescription"
                                        {...register('paymentDescription', {
                                            required:
                                                'Payment Description is required'
                                        })}
                                    />
                                </div> */}

                                <button type="submit">Get Utility</button>
                            </div>
                            {/* <p className={styles.schedule}>
                                Not paying now?{' '}
                                <span onClick={scheduleLater}>
                                    Schedule for Later
                                </span>
                            </p> */}
                        </form>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default BillPayment;
