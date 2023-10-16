import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

import { useDispatch } from 'react-redux';
import { loadbillerType } from '../../../redux/actions/billerTypeAction';
import Loader from '../Loader';
import socialdata from '../Lotties/loading.json';
import ArrowRightSvg from '../ReusableSvgComponents/ArrowRightSvg';

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
    setFormdata,
    backAction
}) => {
    const [network, setNetwork] = useState();
    const [networkData, setNetworkData] = useState({});
    const [beneActive, setBeneActive] = useState();
    // const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState();
    const [billerId, setBillerId] = useState('');
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    const [airtimebeneficiaries, setAirtimeBeneficiaries] = useState([]);
    const [isLoadingg, setIsLoading] = useState(true);
    const [isLoadinggg, setIsLoadinggg] = useState(false);
    const [bene, setBene] = useState(false);
    const dispatch = useDispatch();

    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const loadbillerTypeData = () => {
        if (firstTitle !== 'Bill Payment') {
            dispatch(loadbillerType(firstTitle));
        }
        setBillerTypes([]);
        setBillerPlans();
    };

    return (
        <div>
            <>
                <h2 className={styles.firstTitle}>{firstTitle}</h2>
                <div className={styles.billBody}>
                    <div
                        className={styles.billSingle}
                        onClick={arrowAction}
                        key={index}
                    >
                        <p>bill.categoryCode</p>
                        <ArrowRightSvg />
                    </div>
                </div>
            </>

            {isLoading ? (
                <Loader />
            ) : (
                <button type="submit">Get Utility</button>
            )}
        </div>
    );
};

export default BillPayment;
