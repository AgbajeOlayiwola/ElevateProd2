import React, { useState } from 'react';
import InputFile from '../../../ReusableComponents/InputFile';
import PlusSvg from '../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import CreateStoreSuccess from '../CreateStoreSuccess';
import styles from './styles.module.css';
const CreateStore2 = ({ nextPage }) => {
    const [succes, setSucces] = useState(false);
    const saveandcontinue = (e) => {
        e.preventDefault();
        setSucces(true);
        // nextPage();
    };
    return (
        <>
            {succes ? (
                <CreateStoreSuccess />
            ) : (
                <div className={styles.createStore}>
                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store logo"
                        disclaimer="Only images are allowed, max of 1mb."
                        uploadLabel="Click to add a logo"
                        logoBanner="logo"
                    />
                    <br />
                    <br />
                    <hr className={styles.hr} />
                    <br />
                    <br />
                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store banner"
                        disclaimer="Use a banner of 364px by 160px for maximum resolution"
                        uploadLabel="Click to add a banner"
                        logoBanner="banner"
                    />
                    <div className={styles.saveAnd}>
                        <button onClick={saveandcontinue}>
                            Save and continue
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateStore2;
