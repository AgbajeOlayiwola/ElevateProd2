import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiariesData } from '../../../redux/actions/actions';

const Beneficiary = () => {
    const { getBeneficiaries, errorMessagegetBeneficiaries } = useSelector(
        (state) => state.getBeneficiariesReducer
    );
    const [beneficiaries, setBeneficiaries] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBeneficiariesData());
    }, []);
    useEffect(() => {
        if (getBeneficiaries !== null) {
            setBeneficiaries(getBeneficiaries);
        }
    }, [getBeneficiaries]);
    return (
        <div className={styles.beneficiaryWrapper}>
            <input type="text" placeholder="Search Beneficiary" />
            <div className={styles.beneficiaryContainer}>
                {beneficiaries?.map((bene, index) => {
                    return (
                        <div className={styles.beneficiarySingle} key={index}>
                            <div className={styles.beneficiaryGrey}>
                                <p> {bene.name.split('', 1)}</p>
                            </div>
                            <h4>{bene.name}</h4>
                            <p>{bene.bankName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Beneficiary;
