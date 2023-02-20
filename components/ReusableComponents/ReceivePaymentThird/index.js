import React, { useState, useEffect } from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';
import MoreSvg from '../MoreSvg';
import EditSvg from '../editSvg';

const ReceivePaymentThird = ({
    title,
    action,
    buttonText,
    type,
    overlay,
    closeAction,
    link,
    track,
    amount
}) => {
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol'
        });
        const formattedAmount = formatter.format(amount);
        setNewAmount(formattedAmount);
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Overlay overlay={overlay}>
                <div className={styles.secondBody}>
                    <div className={styles.closeCont}>
                        <CloseButton
                            color="#A5A5A5"
                            classes={styles.closeBtn}
                            action={closeAction}
                        />
                    </div>
                    <div className={styles.secondCont}>
                        <h2>{title}</h2>
                        <p className={styles.intro}>Today - 22/04/2022</p>

                        {/* <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div> */}
                        <div className={styles.deadlines}>
                            <div className={styles.nameDate}>
                                <p>Ayomide James</p>
                                <p>ellevate.com/essg/esd4...</p>
                            </div>
                            <div className={styles.acceptedOrCancelled}>
                                <div className={styles.redOrGreen}></div>
                                <div>
                                    <p className={styles.cancel}>Cancel</p>
                                </div>
                                <div>
                                    <EditSvg />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Overlay>
        </div>
    );
};

export default ReceivePaymentThird;
