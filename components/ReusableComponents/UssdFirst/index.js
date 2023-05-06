import React, { useState } from 'react';
import styles from './styles.module.css';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import Loader from '../Loader';

const UssdFirst = ({ overlay, isLoading, action, closeAction, share }) => {
    // This is the function we wrote earlier
    const [isCopied, setIsCopied] = useState(false);
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    // onClick handler function for the copy button
    const copy = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard('*326*000*refCode#')
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
                        <p onClick={copy}> {isCopied ? 'Copied!' : 'Copy'}</p>
                    </div>
                </div>

                <div className={styles.btnCopy} onClick={copy}>
                    {isCopied ? 'USSD Code Copied!' : 'Share USSD string'}
                </div>
                <h3>
                    Tap to create a{' '}
                    <span onClick={action}>USSD string for a transaction.</span>
                </h3>
            </div>
        </Popup>
    );
};

export default UssdFirst;
