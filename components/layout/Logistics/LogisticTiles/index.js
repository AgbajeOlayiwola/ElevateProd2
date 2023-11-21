import React, { useEffect, useState } from 'react';
import {
    useCreateTransactionPinMutation,
    useLogisticsnableProvidersMutation
} from '../../../../redux/api/authApi';
import { useDisableLogisticMutation } from '../../../../redux/api/logisticsApi';
import Loader from '../../../ReusableComponents/Loader';
import styles from './styles.module.css';

const LogisticsTile = ({ data }) => {
    const [checkStates, setCheckStates] = useState(false);
    const [
        logisticsnableProviders,
        {
            data: enableLogisticData,
            isLoading: enableLogisticLoad,
            isSuccess: enableLogisticSuccess,
            isError: enableLogisticFalse,
            error: enableLogisticErr,
            reset: enableLogisticReset
        }
    ] = useLogisticsnableProvidersMutation();
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
        disableLogistic,
        {
            data: disableLogisticData,
            isLoading: disableLogisticLoad,
            isSuccess: disableLogisticSuccess,
            isError: disableLogisticFalse,
            error: disableLogisticErr,
            reset: disableLogisticReset
        }
    ] = useDisableLogisticMutation();

    const handleCheckChange = () => {
        logisticsnableProviders({ providerId: data?.id.toString() });
        setCheckStates((prev) => !prev);
    };
    console.log(data?.id.toString());
    const changeCHeck = () => {
        disableLogistic({ providerId: data?.id.toString() });
        setCheckStates((prev) => !prev);
    };
    useEffect(() => {
        if (disableLogisticSuccess) {
            setCheckStates(false);
        }
    }, [disableLogisticSuccess]);

    useEffect(() => {
        if (enableLogisticSuccess) {
            setCheckStates(true);
        }
    }, [enableLogisticSuccess]);

    return (
        <div className={styles.logistics}>
            <div className={styles.imgLabel}>
                <img src={data?.imageUrl} width={50} height={30} />
                <div className={styles.save}>
                    {enableLogisticLoad || disableLogisticLoad ? (
                        <Loader />
                    ) : (
                        <>
                            <div className={styles.saveBene}>
                                <label
                                    className={
                                        checkStates === true
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
