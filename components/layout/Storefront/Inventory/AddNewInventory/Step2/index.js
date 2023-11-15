import Image from 'next/image';
import React, { useState } from 'react';
import { useCreateeInventoryMutation } from '../../../../../../redux/api/authApi';
import InputFile from '../../../../../ReusableComponents/InputFile';
import PlusSvg from '../../../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import styles from './styles.module.css';
const Step2 = () => {
    const [assignLog, setAssignLog] = useState(true);
    const saveANdContinue = () => {
        alert('Done');
    };
    const addNew = () => {
        setAssignLog((prev) => !prev);
    };
    const [
        createeInventory,
        {
            data: createeInventoryData,
            isLoading: createeInventoryLoad,
            isSuccess: createeInventorySuccess,
            isError: createeInventoryFalse,
            error: createeInventoryErr,
            reset: createeInventoryReset
        }
    ] = useCreateeInventoryMutation();
    return (
        <div className={styles.second}>
            {assignLog ? (
                <div className={styles.assignFe}>
                    <div className={styles.assign}>
                        <p>Assign logistics</p>
                        <div onClick={() => addNew()}>Add new logistics</div>
                        <p>
                            This helps you set delivery prices based on location
                        </p>
                    </div>
                </div>
            ) : (
                <div className={styles.companys}>
                    <div className={styles.fass}>
                        <input type="checkbox" />
                        <Image
                            src="/Assets/Images/Rectangle12487.png"
                            height={28}
                            width={28}
                            alt="gigm"
                        />
                        <p>GIGM</p>
                    </div>
                    <div className={styles.fass}>
                        <input type="checkbox" />
                        <Image
                            src="/Assets/Images/Rectangle12487.png"
                            height={28}
                            width={28}
                            alt="gigm"
                        />
                        <p>GIGM</p>
                    </div>
                    <div className={styles.fass}>
                        <input type="checkbox" />
                        <Image
                            src="/Assets/Images/Rectangle12487.png"
                            height={28}
                            width={28}
                            alt="gigm"
                        />
                        <p>GIGM</p>
                    </div>
                    <div className={styles.fass}>
                        <input type="checkbox" />
                        <Image
                            src="/Assets/Images/Rectangle12487.png"
                            height={28}
                            width={28}
                            alt="gigm"
                        />
                        <p>GIGM</p>
                    </div>
                    <div className={styles.fass}>
                        <input type="checkbox" />
                        <Image
                            src="/Assets/Images/Rectangle12487.png"
                            height={28}
                            width={28}
                            alt="gigm"
                        />
                        <p>GIGM</p>
                    </div>
                </div>
            )}
            <br />
            <div className={styles.images}>
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer="'"
                    uploadLabel="Add image"
                    logoBanner="banner"
                />
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                />
            </div>
            <div className={styles.images}>
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                />
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                />
            </div>
            <br />
            <p className={styles.faReturn}>FAQ</p>
            <div className={styles.fas}>
                <input type="checkbox" />
                <p>
                    Use already added storefront <span>FAQs</span>
                </p>
            </div>
            <p className={styles.faReturn}>Return Policy</p>
            <div className={styles.fas}>
                <input type="checkbox" />
                <p>
                    Use already added storefront Return Policy{' '}
                    <span>Return Policy</span>
                </p>
            </div>
            <div className={styles.saveAnd}>
                <button onClick={saveANdContinue}>Save and continue</button>
            </div>
        </div>
    );
};

export default Step2;
