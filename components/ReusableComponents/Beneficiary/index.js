import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiariesData } from '../../../redux/actions/actions';
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';

const Beneficiary = ({ action }) => {
    const { getBeneficiaries } = useSelector(
        (state) => state.getBeneficiariesReducer
    );
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBeneficiariesData());
    }, []);
    useEffect(() => {
        if (getBeneficiaries !== null) {
            setBeneficiaries(getBeneficiaries);
        }
    }, [getBeneficiaries]);
    let beneficiaryName;
    return (
        <div className={styles.beneficiary}>
            <div className={styles.beneficiaryHeader}>
                <h2>Beneficiaries</h2>

                <div className={styles.beneficiarySearch}>
                    <img src="../Assets/Svgs/search.svg" alt="" />
                    <input
                        type="text"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        placeholder="Search Beneficiary"
                    />
                </div>
            </div>
            <div className={styles.beneficiaryBody}>
                {!beneficiaries.beneficiaries?.length ? (
                    <h2>You do not have any Beneficiaries at the Moment</h2>
                ) : (
                    beneficiaries.beneficiaries
                        ?.filter((item) => {
                            if (search === '') {
                                return item;
                            } else if (
                                item.beneficiaryName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                return item;
                            }
                        })
                        .map((beneficiaries, index) => {
                            {
                                beneficiaries
                                    ? (beneficiaryName =
                                          beneficiaries.beneficiaryName.split(
                                              ' '
                                          ))
                                    : null;
                            }
                            return (
                                <div
                                    key={index}
                                    className={styles.beneficiarySingle}
                                    onClick={action}
                                >
                                    <div className={styles.beneficiaryIcon}>
                                        <BeneficiaryAvatarSvg />
                                    </div>
                                    <div>
                                        <p className={styles.name}>
                                            {`${beneficiaryName[0]} ${beneficiaryName[1]}`}
                                        </p>
                                        <p className={styles.benebank}>
                                            {beneficiaries.bankName}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
};

export default Beneficiary;
