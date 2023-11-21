import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    useGetStoreFrontMutation,
    useMakeEnableMutation
} from '../../../../../redux/api/authApi';
import Loader from '../../../../ReusableComponents/Loader';
import styles from '../styles.module.css';

const StorTile = ({ store, checkSTore }) => {
    const [checkStates, setCheckStates] = useState(store?.isEnabled);
    const router = useRouter();
    const [
        getStoreFront,
        {
            data: getStoreFrontData,
            isLoading: getStoreFrontLoad,
            isSuccess: getStoreFrontSuccess,
            isError: getStoreFrontFalse,
            error: getStoreFrontErr,
            reset: getStoreFrontReset
        }
    ] = useGetStoreFrontMutation();
    const [
        makeEnable,
        {
            data: makeEnableData,
            isLoading: makeEnableLoad,
            isSuccess: makeEnableSuccess,
            isError: makeEnableFalse,
            error: makeEnableErr,
            reset: makeEnableReset
        }
    ] = useMakeEnableMutation();
    useEffect(() => {
        if (getStoreFrontSuccess) {
            dispatch(setStoreSlice(getStoreFrontData?.data));
            nextStep();
        }
    }, [getStoreFrontSuccess]);
    const enable = useCallback(
        (val) => {
            makeEnable({
                storeFrontId: val
            });
        },
        [makeEnable]
    );
    useEffect(() => {
        if (makeEnableSuccess) {
            checkSTore();
        }
    }, [makeEnableSuccess]);

    const showToastMessage = () => {
        toast.error('This storefront is currntly disabled', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };

    const handleCheckChange = (index) => {
        setCheckStates(
            (prevCheckStates) => !prevCheckStates // Toggle the check state for the specific item
        );
    };

    const isNotEnabled = () => {
        showToastMessage();
    };
    const cretaeStore = () => {
        router.push('/Admin/Storefront/CreateStore');
    };
    return (
        <div>
            <div className={styles.indexImage}>
                <div className={styles.save}>
                    {makeEnableLoad ? (
                        <Loader />
                    ) : (
                        <div
                            className={styles.saveBene}
                            onClick={() => {
                                enable(store?.id);
                            }}
                        >
                            <label
                                className={
                                    store?.isEnabled === true
                                        ? styles.beneChecked
                                        : styles.beneCheck
                                }
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckChange()}
                                    checked={checkStates}
                                />
                                <span>
                                    <i></i>
                                </span>
                            </label>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => {
                        if (store?.isEnabled === true) {
                            getStoreFront({
                                storeFrontId: store?.id
                            });
                        } else {
                            isNotEnabled();
                        }
                    }}
                >
                    <Image
                        src={`data:image/png;base64,${store?.logo}`}
                        width={48}
                        height={48}
                        alt="image"
                    />
                    {getStoreFrontLoad ? (
                        <Loader />
                    ) : (
                        <p
                            className={styles.storeName}
                            onClick={() => {
                                if (store?.isEnabled === true) {
                                    getStoreFront({
                                        storeFrontId: store?.id
                                    });
                                } else {
                                    isNotEnabled();
                                }
                            }}
                        >
                            {store?.storeFrontName}
                        </p>
                    )}
                </div>
                <div className={styles.store}></div>
                <div className={styles.onClick}>
                    {getStoreFrontLoad ? (
                        <Loader />
                    ) : (
                        <p
                            className={styles.storeName}
                            onClick={() => {
                                if (store?.isEnabled === true) {
                                    getStoreFront({
                                        storeFrontId: store?.id
                                    });
                                } else {
                                    isNotEnabled();
                                }
                            }}
                        >
                            Click to view
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StorTile;
