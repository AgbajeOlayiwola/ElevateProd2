import React, { useState } from 'react';
import styles from './styles.module.css';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import Loader from '../Loader';

const UssdFirst = ({ overlay, isLoading, action, closeAction }) => {
    return (
        <Popup overlay={overlay} action={closeAction}>
            <div className={styles.ussdFirstContainer}>
                <h2>USSD</h2>
                <p>Share USSD string to receive money.</p>
                <div className={styles.ussdFirstString}>
                    <div>
                        <div className={styles.ussdFirstCode}>
                            <p>*326*</p>
                            <h3>000*refCode#</h3>
                        </div>
                        <p>Copy</p>
                    </div>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ButtonComp
                        active="active"
                        text="Share USSD string"
                        type="submit"
                    />
                )}
                <h3>
                    Tap to create a{' '}
                    <span onClick={action}>USSD string for a transaction.</span>
                </h3>
            </div>
        </Popup>
    );
};

export default UssdFirst;
