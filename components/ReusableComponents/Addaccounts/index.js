import React, { useState } from 'react';
import styles from './styles.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CloseBtnSvg from '../ClosebtnSvg';

const Addaccounts = ({ close }) => {
    const [type, setType] = useState('All');
    const [omniLite, setOmnilite] = useState('');
    const [ecoonline, setEcoonline] = useState('');
    const [card, setCard] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const componentSet = () => {
        switch (type) {
            case 'All':
                return (
                    <>
                        <div
                            className={styles.omniButton}
                            onClick={() => {
                                setType('Omnilite');
                            }}
                        >
                            Omnilite <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.ecoButton}
                            onClick={() => {
                                setType('Ecoonline');
                            }}
                        >
                            Eco Online <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.cardButton}
                            onClick={() => {
                                setType('Card');
                            }}
                        >
                            Card <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.acountButton}
                            onClick={() => {
                                setType('Accountnumber');
                            }}
                        >
                            Account Number <AiOutlineArrowRight />
                        </div>
                    </>
                );
            case 'Omnilite':
                return (
                    <>
                        <div className={styles.omniButton}>
                            Omnilite <AiOutlineArrowRight />
                        </div>
                    </>
                );
            case 'Card':
                return (
                    <>
                        <div className={styles.cardButton}>
                            Card <AiOutlineArrowRight />
                        </div>
                    </>
                );
            case 'Ecoonline':
                return (
                    <>
                        <div className={styles.ecoButton}>
                            Eco Online <AiOutlineArrowRight />
                        </div>
                    </>
                );
            case 'Accountnumber':
                return (
                    <>
                        <div className={styles.acountButton}>
                            Account Number <AiOutlineArrowRight />
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div
                            className={styles.omniButton}
                            onClick={() => {
                                setType('Omnilite');
                            }}
                        >
                            Omnilite <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.ecoButton}
                            onClick={() => {
                                setType('Ecoonline');
                            }}
                        >
                            Eco Online <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.cardButton}
                            onClick={() => {
                                setType('Card');
                            }}
                        >
                            Card <AiOutlineArrowRight />
                        </div>
                        <div
                            className={styles.acountButton}
                            onClick={() => {
                                setType('Accountnumber');
                            }}
                        >
                            Account Number <AiOutlineArrowRight />
                        </div>
                    </>
                );
        }
    };
    return (
        <div className={styles.modalCover}>
            <div className={styles.accounts}>
                <h2 className={styles.add}>Add Your account number</h2>{' '}
                <span onClick={close}>
                    <CloseBtnSvg />
                </span>
                {componentSet()}
            </div>
        </div>
    );
};

export default Addaccounts;
