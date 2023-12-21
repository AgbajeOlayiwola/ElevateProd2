import React, { useState } from 'react';
import styles from './styles.module.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import CloseBtnSvg from '../ClosebtnSvg';
import AddOmnilite from './AddOmnilite';
import AddCard from './AddCard';
import AddEcoonline from './AddEcoonline';
import AddAccountNumber from './AddAccountNumber';

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
                        <AddOmnilite />
                    </>
                );
            case 'Card':
                return (
                    <>
                        <AddCard />
                    </>
                );
            case 'Ecoonline':
                return (
                    <>
                        <AddEcoonline />
                    </>
                );
            case 'Accountnumber':
                return (
                    <>
                        <AddAccountNumber />
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
                <span className={styles.leftCancel}>
                    <span onClick={close}>
                        <CloseBtnSvg />
                    </span>
                    <AiOutlineArrowLeft onClick={() => setType('All')} />
                </span>
                <h2 className={styles.add}>Add Your account number</h2>
                <br />
                {componentSet()}
            </div>
        </div>
    );
};

export default Addaccounts;
