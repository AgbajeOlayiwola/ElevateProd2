import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiariesData } from '../../../redux/actions/actions';

const Beneficiary = () => {
    const { getBeneficiaries } = useSelector(
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
        <div className={styles.beneficiary}>
            <div className={styles.beneficiaryHeader}>
                <h2>Beneficiaries</h2>
                <p>View all</p>
            </div>
            <div className={styles.beneficiaryBody}>
                {!beneficiaries.beneficiaries?.length ? (
                    <h2>You do not have any Beneficiaries at the Moment</h2>
                ) : (
                    beneficiaries.beneficiaries?.map((beneficiaries, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.beneficiarySingle}
                            >
                                <BeneficiaryAvatarSvg />
                                <p className={styles.name}>
                                    {beneficiaries.beneficiaryName}
                                </p>
                                <p className={styles.benebank}>
                                    {beneficiaries.bankName}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Beneficiary;
