import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAllSToreFrontMutation } from '../../../../redux/api/authApi';
import { setAllStars } from '../../../../redux/slices/allStoresSlice';
import AddNewSvg from '../../../ReusableComponents/AddNewSvg';
import Loader from '../../../ReusableComponents/Loader';
import StorTile from './StoreTile';
import styles from './styles.module.css';

const Stores = ({ nextStep, nextInaventory }) => {
    const dispatch = useDispatch();
    const router = useRouter();
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

    useEffect(() => {
        if (getAllSToreFrontSuccess) {
            dispatch(setAllStars(getAllSToreFrontData?.data));
        }
    }, [getAllSToreFrontSuccess]);
    useEffect(() => {
        getAllSToreFront(null);
    }, []);
    const checkSTore = () => {
        getAllSToreFront(null);
    };
    const cretaeStore = () => {
        router.push('/Admin/Storefront/CreateStore');
    };

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
            ) : getAllSToreFrontData?.data?.length <= 0 ? (
                <div className={styles.empty}>
                    <div>
                        <AddNewSvg />
                    </div>
                </div>
            ) : (
                <div className={styles.tableBody}>
                    {getAllSToreFrontData?.data?.map((store, index) => {
                        return (
                            <StorTile
                                store={store}
                                checkSTore={checkSTore}
                                nextStep={() => nextStep()}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Stores;
