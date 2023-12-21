import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBillerCategoriesMutation,
    useBillersMutation
} from '../../../redux/api/authApi';
import Loader from '../Loader';
import SelectBillerCategory from '../SelectBillerCategory';
import SelectBillerForms from '../SelectBillerForms';
import styles from './styles.module.css';

const BillPayment = ({
    action,
    firstTitle,
    buttonText,
    closeAction,
    airtimeAction,
    scheduleLater,
    dataAction,
    isLoading,
    bankAccounts,
    formData,
    setFormdata,
    backAction
}) => {
    const [billerTypes, setBillerTypes] = useState([]);
    const [billerPlans, setBillerPlans] = useState();
    const [billerDatails, setBillerDetails] = useState();
    const [loads, setLoads] = useState(false);
    const dispatch = useDispatch();

    const loadbillerTypeData = () => {
        if (firstTitle !== 'Bill Payment') {
        }
    };

    const [
        billerCategories,
        {
            data: billerCategoriesData,
            isLoading: billerCategoriesLoad,
            isSuccess: billerCategoriesSuccess,
            isError: billerCategoriesFalse,
            error: billerCategoriesErr,
            reset: billerCategoriesReset
        }
    ] = useBillerCategoriesMutation();
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
    useEffect(() => {
        billerCategories(null);
    }, []);
    const [clickedItem, setClickedItem] = useState(null);
    console.log(loadBillerForm);

    const loadBillerForm = (val) => {
        console.log(val);
        setBillerDetails(val?.data);
        console.log['bills'];
        setLoads(true);
    };
    const showErrorToastMessage = () => {
        toast.error(billerCategoriesErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (billerCategoriesErr) {
            showErrorToastMessage();
        }
    }, [billerCategoriesErr]);
    return (
        <div>
            <ToastContainer />
            {billerCategoriesLoad ? (
                <Loader />
            ) : loads ? (
                <SelectBillerForms
                    billerDatails={billerDatails}
                    closeAction={() => closeAction()}
                    backtoCategories={() => setLoads(false)}
                />
            ) : (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.billBody}>
                        {billerCategoriesData?.data?.billerCategoryInfoList.map(
                            (item, index) => {
                                return (
                                    <>
                                        <SelectBillerCategory
                                            item={item}
                                            loadBillerForm={loadBillerForm}
                                        />
                                    </>
                                );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default BillPayment;
