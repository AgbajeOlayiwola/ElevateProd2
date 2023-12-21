import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { businessCategoriesData } from '../../../redux/actions/businessCategoriesAction';

const BusinessCategory = () => {
    const dispatch = useDispatch();
    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState('');
    const [business, setBusiness] = useState('');
    const { businessCategories, errorDatas } = useSelector(
        (state) => state.businessCategoriesReducer
    );
    useEffect(() => {
        dispatch(businessCategoriesData());
    }, []);
    useEffect(() => {
        if (businessCategories !== null) {
            setBusinessCategory(businessCategories);
        }
    }, [businessCategories]);
    useEffect(() => {
        Object.keys(businessCategory)?.filter((item) => {
            if (item === business) {
                setBusinessType(businessCategory[item]);
            }
        });
    }, [business]);
    return (
        <>
            <div className={styles.inps}>
                <label>Select Your Business Category </label>

                <br />

                <select
                    onChange={(e) => {
                        setBusiness(e.target.value);
                    }}
                >
                    <option>Search Your Business Category</option>
                    {Object.keys(businessCategory)?.map((business, index) => {
                        return (
                            <option value={business} key={index}>
                                {business}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles.inps}>
                <label>Select Your Business Type </label>

                <br />

                <select>
                    <option>Select Your Business Type</option>
                    {businessType ? (
                        businessType?.map((business, index) => {
                            return (
                                <option value={business} key={index}>
                                    {business}
                                </option>
                            );
                        })
                    ) : (
                        <option value="">
                            Choose a business Category First
                        </option>
                    )}
                </select>
            </div>
        </>
    );
};

export default BusinessCategory;
