import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBillersMutation } from '../../../redux/api/authApi';
import Loader from '../Loader';
import SlectBiller from '../SelectBiller';
import styles from './styles.module.css';
const SelectBillerCategory = ({ item, load, loadBillerForm }) => {
    const [loads, setLoads] = useState(true);
    const [isLoading, setIsLoading] = useState();
    const [billerDatails, setBillerDetails] = useState();
    const [
        billers,
        {
            data: billersData,
            isLoading: billersLoad,
            isSuccess: billersSuccess,
            isError: billersFalse,
            error: billersErr,
            reset: billersReset
        }
    ] = useBillersMutation();
    const arrowAction = (val) => {
        billers({ category: val });
    };
    const loading = (val) => {
        setIsLoading(val);
    };
    const showErrorToastMessage = () => {
        toast.error('Error Loading Biller', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (billersErr) {
            showErrorToastMessage();
        }
    }, [billersErr]);
    return (
        <>
            <ToastContainer />
            <div className={styles.categor}>
                <h4
                    className={styles.cate}
                    onClick={() => arrowAction(item.categoryCode)}
                >
                    {item.categoryName}
                </h4>
                {isLoading ? (
                    <Loader />
                ) : (
                    <SlectBiller
                        loadBillerForm={loadBillerForm}
                        biller={billersData}
                        loads={billersLoad}
                        load={loading}
                    />
                )}
            </div>
        </>
    );
};

export default SelectBillerCategory;
