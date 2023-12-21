import React, { useEffect, useState } from 'react';
import {
    useCreateTransactionPinMutation,
    useLogisticsDisableProviderMutation,
    useLogisticsEnableProviderMutation
} from '../../../../redux/api/authApi';
import Loader from '../../../ReusableComponents/Loader';
import styles from './styles.module.css';

const LogisticsTile = ({ data, isCommon }) => {
    const [checkStates, setCheckStates] = useState(false);
    const [
        logisticsEnableProvider,
        {
            data: logisticsEnableProviderData,
            isLoading: logisticsEnableProviderLoad,
            isSuccess: logisticsEnableProviderSuccess,
            isError: logisticsEnableProviderFalse,
            error: logisticsEnableProviderErr,
            reset: logisticsEnableProviderReset
        }
    ] = useLogisticsEnableProviderMutation();
    const [
        createTransactionPin,
        {
            data: createTransactionPinData,
            isLoading: createTransactionPinLoad,
            isSuccess: createTransactionPinSuccess,
            isError: createTransactionPinFalse,
            error: createTransactionPinErr,
            reset: createTransactionPinReset
        }
    ] = useCreateTransactionPinMutation();
    const [
        logisticsDisableProvider,
        {
            data: logisticsDisableProviderData,
            isLoading: logisticsDisableProviderLoad,
            isSuccess: logisticsDisableProviderSuccess,
            isError: logisticsDisableProviderFalse,
            error: logisticsDisableProviderErr,
            reset: logisticsDisableProviderReset
        }
    ] = useLogisticsDisableProviderMutation();

    const handleCheckChange = () => {
        logisticsnableProviders({ providerId: data?.id.toString() });
        setCheckStates((prev) => !prev);
    };
    console.log(data?.id.toString());
    const changeCHeck = () => {
        logisticsDisableProvider({ providerId: data?.id.toString() });
        setCheckStates((prev) => !prev);
    };
    useEffect(() => {
        if (logisticsDisableProviderSuccess) {
            setCheckStates(false);
        }
    }, [logisticsDisableProviderSuccess]);

    useEffect(() => {
        if (logisticsEnableProviderSuccess) {
            setCheckStates(true);
        }
    }, [logisticsEnableProviderSuccess]);

    return (
        <div className={styles.logistics}>
            <div className={styles.imgLabel}>
                <img src={data?.imageUrl} width={50} height={30} />
                <div className={styles.save}>
                    {logisticsEnableProviderLoad ||
                    logisticsDisableProviderLoad ? (
                        <Loader />
                    ) : (
                        <>
                            <div className={styles.saveBene}>
                                <label
                                    className={
                                        checkStates || isCommon === true
                                            ? styles.beneChecked
                                            : styles.beneCheck
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() => {
                                            if (checkStates) {
                                                changeCHeck();
                                            } else {
                                                handleCheckChange();
                                            }
                                        }}
                                        // checked={checkStates[index]}
                                    />
                                    <span>
                                        <i></i>
                                    </span>
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <h1 className={styles.prodName}>{data?.providerName}</h1>
            <p className={styles.prodDesc}>{data?.description}</p>
            <br />
            <hr />
            <br />
            <p className={styles.learn}>Learn More</p>
        </div>
    );
};

export default LogisticsTile;
