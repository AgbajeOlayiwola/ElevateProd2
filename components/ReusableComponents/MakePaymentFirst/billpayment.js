import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    loadbillerCategory,
    loadbillerType,
    loadbillerPlan,
    postAirtimeNetwork,
    getAirtimeBeneficiariesData
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightSvg from '../ReusableSvgComponents/ArrowRightSvg';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';
import Loader from '../Loader';
import ArrowBackSvg from '../ArrowBackSvg';
import Lottie from 'react-lottie';
import socialdata from '../Lotties/loading.json';

const BillPayment = ({
    action,
    firstTitle,
    buttonText,
    arrowAction,
    airtimeAction,
    scheduleLater,
    dataAction,
    isLoading,
    bankAccounts,
    formData,
    setFormdata
}) => {
    const [network, setNetwork] = useState('MTN Nigeria');
    const [networkData, setNetworkData] = useState({});
    const [beneActive, setBeneActive] = useState();
    // const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState();
    const [billerId, setBillerId] = useState('');
    const [airtimebeneficiaries, setAirtimeBeneficiaries] = useState([]);
    const [isLoadingg, setIsLoading] = useState(true);

    const [isLoadinggg, setIsLoadinggg] = useState(false);
    const dispatch = useDispatch();
    const { billerCategory } = useSelector(
        (state) => state.billerCategoryReducer
    );
    const { airtimeNetwork } = useSelector(
        (state) => state.airtimeNetworkReducer
    );
    const { billerType } = useSelector((state) => state.billerTypeReducer);
    const { billerPlan } = useSelector((state) => state.billerPlanReducer);
    const { getAirtimeBeneficiaries } = useSelector(
        (state) => state.getAirtimeBeneficiariesReducer
    );
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        dispatch(loadbillerCategory('ENG'));
        dispatch(getAirtimeBeneficiariesData());
    }, []);
    useEffect(() => {
        airtimeNetworkData.networks?.map((networks) => {
            if (networks.name === 'MTN Nigeria') {
                localStorage.setItem('Airtime', JSON.stringify(networks));
            }
        });
        //console.log(airtimeNetworkData);
    }, [airtimeNetworkData]);
    useEffect(() => {
        if (getAirtimeBeneficiaries !== null) {
            setAirtimeBeneficiaries(getAirtimeBeneficiaries);
        }
    }, [getAirtimeBeneficiaries]);
    useEffect(() => {
        if (billerCategory !== null) {
            setIsLoading(false);
            setBillerCategories(billerCategory);
        }
    }, [billerCategory]);
    useEffect(() => {}, [billerType]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    //console.log(billerCategories);
    const loadbillerTypeData = () => {
        if (firstTitle !== 'Bill Payment') {
            dispatch(loadbillerType(firstTitle));
        }
        // setBillerId(e.target.value);
        setBillerTypes([]);
        setBillerPlans();
        if (firstTitle === 'AIRTIME') {
            dispatch(postAirtimeNetwork());
        } else {
            loadbillerType(firstTitle);
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
    //console.log(billerTypes);
    useEffect(() => {
        if (airtimeNetwork !== null) {
            setAirtimeNetworkData(airtimeNetwork);
        }
    }, [airtimeNetwork]);
    useEffect(() => {
        if (billerPlan !== null) {
            localStorage.setItem('Airtime', JSON.stringify(billerPlan));
            setBillerPlans(billerPlan);
            setIsLoadinggg(false);
        }
    }, [billerPlan]);
    return (
        <div>
            {firstTitle === 'Bill Payment' ? (
                <>
                    {/* <div className={styles.backIcon}>
                        <ArrowBackSvg color="#102572" action={backAction} />
                    </div> */}
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
                        {isLoadingg ? (
                            <Lottie
                                options={socialOptions}
                                height={200}
                                width={200}
                            />
                        ) : (
                            billerCategories.billerCategoryInfoList?.map(
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
                            )
                        )}
                    </div>
                </>
            ) : firstTitle === 'AIRTIME' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit(airtimeAction)}>
                            {airtimebeneficiaries.phoneNumberBeneficiaries?.map(
                                (account, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.beneficiarySingle}
                                            onClick={() => {
                                                setBeneActive(account);
                                                setNetwork(
                                                    account.mobileNetwork
                                                );
                                                {
                                                    airtimeNetworkData.networks?.filter(
                                                        (e) => {
                                                            if (
                                                                e.name ===
                                                                account.mobileNetwork
                                                            ) {
                                                                localStorage.setItem(
                                                                    'Airtime',
                                                                    JSON.stringify(
                                                                        e
                                                                    )
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            }}
                                        >
                                            <div
                                                className={
                                                    styles.beneficiaryIcon
                                                }
                                            >
                                                <BeneficiaryAvatarSvg />
                                            </div>
                                            <div>
                                                <p className={styles.name}>
                                                    {account.phoneNumber}
                                                </p>
                                                <p className={styles.benebank}>
                                                    {account.mobileNetwork}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                            <div className={styles.narration}>
                                <label>Source Account</label>
                                <select
                                    name=""
                                    id=""
                                    {...register('sourceAccount')}
                                    onInput={(event) => {
                                        setFormdata({
                                            ...formData,
                                            accountNum: event.target.value
                                        });
                                    }}
                                >
                                    <option>Select Account To Use</option>
                                    {bankAccounts?.map((accounts, index) => {
                                        return (
                                            <option
                                                value={accounts.accountNumber}
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
                                                        <div
                                                            className={
                                                                styles.networkContent
                                                            }
                                                        >
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
                                    <label>Phone Number</label>{' '}
                                    {beneActive ? (
                                        <input
                                            {...register('phoneNumberBene')}
                                            type="number"
                                            value={beneActive.phoneNumber}
                                        />
                                    ) : !beneActive ? (
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
                                    ) : null}
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
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <button type="submit">Get Airtime</button>
                                )}
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
            ) : firstTitle !== 'Bill Payment' ? (
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
                                    onInput={(event) => {
                                        setFormdata({
                                            ...formData,
                                            accountNum: event.target.value
                                        });
                                    }}
                                    // value={formData.accountNum}
                                >
                                    <option value="">
                                        Select Account To Use
                                    </option>
                                    {bankAccounts?.map((accounts, index) => {
                                        return (
                                            <option
                                                value={accounts.accountNumber}
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
                                        required: 'Biller Type  is required'
                                    })}
                                    onChange={(e) => {
                                        setIsLoadinggg(true);
                                        dispatch(
                                            loadbillerPlan(e.target.value)
                                        );
                                        setBillerPlans();
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
                            {isLoadinggg ? (
                                <Lottie
                                    options={socialOptions}
                                    height={200}
                                    width={200}
                                />
                            ) : billerPlans ? (
                                <>
                                    <div className={styles.narration}>
                                        <label>
                                            {
                                                billerPlans.billFormData[0]
                                                    .fieldTitle
                                            }
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={
                                                billerPlans.billFormData[0]
                                                    .fieldTitle
                                            }
                                            name="paymentDescription"
                                            {...register('paymentDescription', {
                                                required:
                                                    'Payment Description is required'
                                            })}
                                        />
                                    </div>
                                    <div className={styles.narration}>
                                        <label>Select Package</label>
                                        <select
                                            name="desiredPackage"
                                            id=""
                                            {...register('desiredPackage', {
                                                required:
                                                    'Desired Package is required'
                                            })}
                                            onChange={(e) => {
                                                billerPlans.billerProductInfo?.map(
                                                    (item) => {
                                                        if (
                                                            item.productName ===
                                                            e.target.value
                                                        ) {
                                                            localStorage.setItem(
                                                                'DesiredPackage',
                                                                JSON.stringify(
                                                                    item
                                                                )
                                                            );
                                                        }
                                                    }
                                                );
                                            }}
                                        >
                                            <option value="">
                                                Select Desired Pacakge
                                            </option>
                                            {billerPlans.billerProductInfo?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            value={
                                                                item.productName
                                                            }
                                                            key={index}
                                                        >
                                                            {item.productName}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </>
                            ) : null}

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

                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <button type="submit">Get Utility</button>
                                )}
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
