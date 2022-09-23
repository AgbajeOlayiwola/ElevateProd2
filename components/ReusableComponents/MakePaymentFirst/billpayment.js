import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { loadbillerCategory } from '../../../redux/actions/actions';
import { loadbillerType } from '../../../redux/actions/actions';
import { loadbillerPlan } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';
import ArrowRightSvg from '../ReusableSvgComponents/ArrowRightSvg';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';

const BillPayment = ({
    action,
    firstTitle,
    buttonText,
    arrowAction,
    airtimeAction,
    scheduleLater,
    dataAction
}) => {
    const [network, setNetwork] = useState('mtn');
    const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState([]);
    const [billerId, setBillerId] = useState('');

    const dispatch = useDispatch();
    const { billerCategory } = useSelector(
        (state) => state.billerCategoryReducer
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
    const loadbillerTypeData = (e) => {
        dispatch(loadbillerType('ENG', e.target.value));
        setBillerId(e.target.value);
        setBillerTypes([]);
        setBillerPlans([]);
    };
    useEffect(() => {
        if (billerType !== null) {
            setBillerTypes(billerType);
        }
    }, [billerType]);
    const loadPlans = (e) => {
        dispatch(loadbillerPlan(e.target.value));
    };
    useEffect(() => {}, [billerId]);
    useEffect(() => {
        if (billerPlan !== null) {
            setBillerPlans(billerPlan.billerProductInfo);
        }
    }, [billerPlan]);
    const bills = [
        'Airtime',
        'Data',
        'Cable TV',
        'Government Levies',
        'Airtime and Data'
    ];
    return (
        <div>
            {firstTitle === 'Bill Payment' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>

                    <div className={styles.beneficiary}>
                        <div className={styles.beneficiaryHeader}>
                            <h2>Recent</h2>
                            <p>View all</p>
                        </div>
                        <div className={styles.beneficiaryBody}>
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
                            {/* <div className={styles.beneficiarySingle}>
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
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.billBody}>
                        {bills.map((bill, index) => {
                            return (
                                <div
                                    className={styles.billSingle}
                                    onClick={arrowAction}
                                    key={index}
                                >
                                    <p>{bill}</p>
                                    <ArrowRightSvg />
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : firstTitle === 'Airtime' ? (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit(airtimeAction)}>
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
                                <button>Get Airtime</button>{' '}
                            </div>
                            <p className={styles.schedule}>
                                Not paying now?{' '}
                                <span onClick={scheduleLater}>
                                    Schedule for Later
                                </span>
                            </p>
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
                            <p className={styles.schedule}>
                                Not paying now?{' '}
                                <span onClick={scheduleLater}>
                                    Schedule for Later
                                </span>
                            </p>
                        </form>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default BillPayment;
