import React, { useRef, useEffect, useState } from 'react';
import Popup from '../../layout/Popup';
import BeneUserSvg from '../ReusableSvgComponents/BeneUserSvg';
import ThreeDotsSvg from '../ThreeDotSvg';
import styles from './styles.module.css';
import { FaTrash } from 'react-icons/fa';

const ManageBene = ({ overlay, title, action, btnAction }) => {
    const [transfer, setTransfer] = useState(true);
    const [bills, setBills] = useState(false);
    const [others, setOthers] = useState(false);
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    const bene = {
        transfer: [
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            }
        ],
        bills: [
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            }
        ],
        others: [
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            },
            {
                name: 'Ayomide James',
                account: '1234567890   .   Wema Bank Plc'
            }
        ]
    };
    return (
        <Popup overlay={overlay} title={title} action={action}>
            <div ref={myref}>
                <div className={styles.manageBeneHeader}>
                    <div
                        className={
                            transfer ? styles.active : styles.profileButton
                        }
                        onClick={() => {
                            setTransfer(true);
                            setOthers(false);
                            setBills(false);
                        }}
                    >
                        <p>Transfer</p>
                    </div>
                    <div
                        className={bills ? styles.active : styles.profileButton}
                        onClick={() => {
                            setTransfer(false);
                            setOthers(false);
                            setBills(true);
                        }}
                    >
                        <p>Bills</p>
                    </div>
                    <div
                        className={
                            others ? styles.active : styles.profileButton
                        }
                        onClick={() => {
                            setTransfer(false);
                            setOthers(true);
                            setBills(false);
                        }}
                    >
                        <p>Others</p>
                    </div>
                </div>
                <div className={styles.manageBeneBody}>
                    <div className={styles.searchCont}>
                        <img src="../Assets/Svgs/search.svg" alt="" />
                        <input type="text" placeholder="Search by Date" />
                    </div>
                    {transfer ? (
                        <div>
                            {bene.transfer.map((item, index) => {
                                return (
                                    <ManageBeneSingle
                                        key={index}
                                        beneAccount={item.account}
                                        beneName={item.name}
                                        icon={item.icon}
                                        index={index}
                                        action={() => {
                                            setText(item.text);
                                            setOverlay(true);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : null}
                    {bills ? (
                        <div>
                            {bene.bills.map((item, index) => {
                                return (
                                    <ManageBeneSingle
                                        key={index}
                                        beneAccount={item.account}
                                        beneName={item.name}
                                        icon={item.icon}
                                        index={index}
                                        action={() => {
                                            setText(item.text);
                                            setOverlay(true);
                                        }}
                                    />
                                );
                            })}
                            {/* action={showForm} */}
                            {/* <ManageBeneSingle
                                        beneAccount="Enablaccountsable Biometrics"
                                        beneName={item.name}
                                        icon={<BiometricsSvg />}
                                    /> */}
                        </div>
                    ) : null}
                    {others ? (
                        <div>
                            {bene.others.map((item, index) => {
                                return (
                                    <ManageBeneSingle
                                        key={index}
                                        beneAccount={item.account}
                                        beneName={item.name}
                                        icon={item.icon}
                                        index={index}
                                        action={() => {
                                            setText(item.text);
                                            setOverlay(true);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : null}
                </div>
                <button onClick={btnAction}>+ Add New</button>
            </div>
        </Popup>
    );
};

const ManageBeneSingle = ({ beneAccount, beneName, index, deleteAction }) => {
    return (
        <div className={styles.manageBeneSingle} key={index}>
            <div className={styles.manageBeneDetails}>
                <BeneUserSvg />
                <div>
                    <h3>{beneName}</h3>
                    <p>{beneAccount}</p>
                </div>
            </div>
            <FaTrash onClick={deleteAction} className={styles.trash} />
        </div>
    );
};
export default ManageBeneSingle;
