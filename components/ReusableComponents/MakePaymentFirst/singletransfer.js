import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    loadbank,
    postBeneficiariesData
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Beneficiary from '../Beneficiary';
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';

const SingleTransfer = ({
    othersaction,
    firstTitle,
    buttonText,
    scheduleLater
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [bank, setBank] = useState([]);
    const dispatch = useDispatch();
    const { banks } = useSelector((state) => state.banksReducer);

    useEffect(() => {
        dispatch(loadbank('ENG'));
    }, []);
    useEffect(() => {
        if (banks !== null) {
            setBank(banks);
        }
    }, [banks]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    return (
        <div>
            <h2 className={styles.firstTitle}>{firstTitle}</h2>
            <div className={styles.beneficiary}>
                <div className={styles.beneficiaryHeader}>
                    <h2>Beneficiaries</h2>
                    <p>View all</p>
                </div>
                <div className={styles.beneficiaryBody}>
                    <div className={styles.beneficiarySingle}>
                        <BeneficiaryAvatarSvg />
                        <p className={styles.name}>Babalola</p>
                        <p className={styles.benebank}>Wema Bank</p>
                    </div>
                    <div className={styles.beneficiarySingle}>
                        <BeneficiaryAvatarSvg />
                        <p className={styles.name}>Babalola</p>
                        <p className={styles.benebank}>Wema Bank</p>
                    </div>
                    <div className={styles.beneficiarySingle}>
                        <BeneficiaryAvatarSvg />
                        <p className={styles.name}>Babalola</p>
                        <p className={styles.benebank}>Wema Bank</p>
                    </div>
                    <div className={styles.beneficiarySingle}>
                        <BeneficiaryAvatarSvg />
                        <p className={styles.name}>Babalola</p>
                        <p className={styles.benebank}>Wema Bank</p>
                    </div>
                    <div className={styles.beneficiarySingle}>
                        <BeneficiaryAvatarSvg />
                        <p className={styles.name}>Babalola</p>
                        <p className={styles.benebank}>Wema Bank</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(othersaction)}>
                <div className={styles.source}>
                    <h2>
                        Source <span>- Marvelous N******</span>
                    </h2>
                    <SourceSvg />
                </div>
                <div className={styles.narration}>
                    <label> Account Number</label>
                    <input
                        {...register('accountNumber', {
                            required: 'Please enter  Acount Number',
                            pattern: {
                                value: /^[0-9 ]/i,
                                message: 'Account Number must be a number'
                            }
                        })}
                        type="number"
                        placeholder="Enter account number here"
                    />
                    <p className={styles.error}>
                        {errors?.accountNumber?.message}
                    </p>
                </div>
                <div className={styles.narration}>
                    <label>Choose Bank</label>
                    <select
                        {...register('bankName', {
                            required: 'Choose a bank'
                        })}
                        name="bankName"
                    >
                        <option value="">Select Bank</option>
                        <option value="Ecobank">Ecobank</option>
                        {bank?.map((bank, index) => {
                            return (
                                <option value={bank.institutionId} key={index}>
                                    {bank.institutionName}
                                </option>
                            );
                        })}
                    </select>
                    {errors.bankName && (
                        <p className={styles.error}>
                            {errors?.bankName?.message}
                        </p>
                    )}
                </div>
                <div className={styles.narration}>
                    <label>Enter Amount</label>
                    <input
                        {...register('amount', {
                            required: 'Please enter Amount',
                            pattern: {
                                value: /^[0-9]/i,
                                message: 'Amount can only be number '
                            }
                        })}
                        type="number"
                        placeholder="5,000,000,000.00"
                        onChange={(e) => {
                            if (e?.target.value.length === 0) {
                                setActiveBtn(false);
                            } else if (e?.target.value.length > 0) {
                                setActiveBtn(true);
                            }
                        }}
                    />
                    <p className={styles.error}>{errors?.amount?.message}</p>
                </div>
                <div className={styles.narration}>
                    <label>
                        Transfer Narration <span>(optional)</span>
                    </label>
                    <input
                        {...register('narration', {
                            pattern: {
                                value: /^[A-Za-z ]+$/i,
                                message: 'Only Alphabelts allowed'
                            }
                        })}
                        type="text"
                        placeholder="Enter Narration"
                        name="narration"
                    />
                    <p className={styles.error}>{errors?.narration?.message}</p>
                </div>
                {/* <div className={styles.repeat}>
                    <input type="checkbox" />
                    <p>Do you want to set this as a repeat transaction?</p>
                </div> */}
                <div className={styles.saveBene}>
                    <label className={styles.beneCheck}>
                        <input type="checkbox" />
                        <span>
                            <i></i>
                        </span>
                    </label>
                    <p>Save Beneficiary</p>
                </div>

                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text={buttonText}
                    type="submit"
                />
                <p className={styles.schedule}>
                    Not paying now?{' '}
                    <span onClick={scheduleLater}>Schedule for Later</span>
                </p>
            </form>
        </div>
    );
};

export default SingleTransfer;
