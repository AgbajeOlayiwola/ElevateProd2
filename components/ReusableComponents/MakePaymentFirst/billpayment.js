import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { useDispatch } from 'react-redux';
import { useBillerCategoriesMutation } from '../../../redux/api/authApi';
import Loader from '../Loader';
import SelectBillerCategory from '../SelectBillerCategory';

const BillPayment = ({
    action,
    firstTitle,
    buttonText,

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

    useEffect(() => {
        billerCategories(null);
    }, []);
    const [clickedItem, setClickedItem] = useState(null);
    console.log(billerCategoriesData);

    return (
        <div>
            {billerCategoriesLoad ? (
                <Loader />
            ) : (
                <>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.billBody}>
                        {billerCategoriesData?.data?.billerCategoryInfoList.map(
                            (item, index) => {
                                return (
                                    <>
                                        <SelectBillerCategory item={item} />
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
