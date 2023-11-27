import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import CheckSvg from './checkSvg';
import styles from './styles.module.css';
const RegisterationDetails = ({ returnToPrev }) => {
    return (
        <>
            <p className={styles.backtoPRev} onClick={returnToPrev}>
                {' '}
                <IoMdArrowBack /> Registration details
            </p>
            <div className={styles.regDets}>
                <div className={styles.details}>
                    <h2 className={styles.dets}> Details</h2>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <hr />
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <hr />
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <hr />
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                    <div className={styles.detailsInfo}>
                        <p>Business name</p>
                        <p>Bestprice Ventures</p>
                    </div>
                </div>
                <div>
                    <h2 className={styles.actRequest}>
                        Active request progress
                    </h2>
                    <div className={styles.chckd}>
                        <div>
                            <CheckSvg />
                        </div>
                        <div>
                            <p className={styles.pend}>Request Sent</p>
                            <p className={styles.date}>Jun. 25 2021</p>
                        </div>
                    </div>
                    <hr className={styles.hr} />
                    <div className={styles.chckd}>
                        <div>
                            <CheckSvg />
                        </div>
                        <div>
                            <p className={styles.pend}>Request Sent</p>
                            <p>Jun. 25 2021</p>
                        </div>
                    </div>
                    <hr className={styles.hr} />
                    <div className={styles.chckd}>
                        <div>
                            <CheckSvg />
                        </div>
                        <div>
                            <p className={styles.pend}>Request Sent</p>
                            <p>Jun. 25 2021</p>
                        </div>
                    </div>
                    <hr className={styles.hr} />
                    <div className={styles.chckd}>
                        <div>
                            <CheckSvg />
                        </div>
                        <div>
                            <p className={styles.pend}>Request Sent</p>
                            <p>Jun. 25 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterationDetails;
