import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useGetAllSToreFrontMutation,
    useGetStoreFrontMutation,
    useMakeEnableMutation
} from '../../../../redux/api/authApi';
import { setStoreSlice } from '../../../../redux/slices/storeSlice';
import Loader from '../../../ReusableComponents/Loader';
import styles from './styles.module.css';

const Stores = ({ nextStep, nextInaventory }) => {
    const [checkStates, setCheckStates] = useState({});
    const dispatch = useDispatch();
    const addInventory = () => {
        nextInaventory();
    };
    const [
        getAllSToreFront,
        {
            data: getAllSToreFrontData,
            isLoading: getAllSToreFrontLoad,
            isSuccess: getAllSToreFrontSuccess,
            isError: getAllSToreFrontFalse,
            error: getAllSToreFrontErr,
            reset: getAllSToreFrontReset
        }
    ] = useGetAllSToreFrontMutation();
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
        if (makeEnableSuccess) {
            getAllSToreFront(null);
        }
    }, [makeEnableSuccess]);

    useEffect(() => {
        getAllSToreFront(null);
    }, []);
    const showToastMessage = () => {
        toast.error('This storefront is currntly disabled', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };

    const handleCheckChange = (index) => {
        setCheckStates((prevCheckStates) => ({
            ...prevCheckStates,
            [index]: !prevCheckStates[index] // Toggle the check state for the specific item
        }));
    };

    const router = useRouter();
    const isNotEnabled = () => {
        showToastMessage();
    };
    const cretaeStore = () => {
        router.push('/Admin/Storefront/CreateStore');
    };
    const view = () => {};
    useEffect(() => {
        if (getStoreFrontSuccess) {
            dispatch(setStoreSlice(getStoreFrontData?.data));
            nextStep();
        }
    }, [getStoreFrontSuccess]);

    return (
        <div className={styles.storeBody}>
            <ToastContainer />
            <div className={styles.dtoreBodyDiv}>
                <div className={styles.storeFront}>
                    <h1>Storefront</h1>
                    <p>
                        {getAllSToreFrontLoad ? (
                            <Loader />
                        ) : (
                            `You have ${getAllSToreFrontData?.data?.length} storefronts.`
                        )}
                    </p>
                </div>
                <div className={styles.storeButton}>
                    <button onClick={addInventory}>Add an inventory</button>
                    <button
                        onClick={() => {
                            cretaeStore();
                        }}
                    >
                        Create Storefront
                    </button>
                </div>
            </div>
            {getAllSToreFrontLoad ? (
                <Loader />
            ) : getAllSToreFrontData?.data?.length < 0 ? (
                <div className>
                    <div>
                        <AddNewSvg />
                    </div>
                </div>
            ) : (
                <div className={styles.tableBody}>
                    {getAllSToreFrontData?.data?.map((store, index) => {
                        return (
                            <div className={styles.indexImage} key={index}>
                                <div className={styles.save}>
                                    <div
                                        className={styles.saveBene}
                                        onClick={() => {
                                            makeEnable({
                                                storeFrontId: store?.id
                                            });
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
                                                onChange={() =>
                                                    handleCheckChange(index)
                                                }
                                                checked={checkStates[index]}
                                            />
                                            <span>
                                                <i></i>
                                            </span>
                                        </label>
                                    </div>
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
                                </div>
                                <div className={styles.store}>
                                    {/* <div>
                                    <h1>{store?.orders}</h1>
                                    <p>{store?.storeFrontLink}</p>
                                </div>
                                <div>
                                    <h1>{store?.orders}</h1>
                                    <p>{store?.storeFrontLink}</p>
                                </div> */}
                                </div>
                                <div className={styles.onClick}>
                                    <p onClick={view}>Click to view</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Stores;
