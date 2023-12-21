import { useRouter } from 'next/router';
import React from 'react';
import styles from './styles.module.css';
import Succesvg from './succesvg';
const CreateStoreSuccess = () => {
    const router = useRouter();
    const gotToStorfront = () => {
        router.push('/Admin/Storefront');
    };
    return (
        <div className={styles.createStoreSuccess}>
            <div className={styles.successSvg}>
                <Succesvg />
                <h1>Storefront created successfully.</h1>
                <p>
                    You can successfully created your storefront. You can now
                    proceed to customise it.
                </p>
                <button onClick={gotToStorfront}>Continue to storefront</button>
            </div>
        </div>
    );
};

export default CreateStoreSuccess;
