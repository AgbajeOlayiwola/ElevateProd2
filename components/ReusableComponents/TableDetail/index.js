import React, { useEffect, useState } from 'react';
import MoreAction from '../MoreAction';
import styles from './styles.module.css';

const TableDetail = ({
    direction,
    Beneficiary,
    Type,
    Amount,
    Bank,
    Dates,
    Status,
    keys,
    accountNumber,
    network,
    title,
    disputes,
    accountId,
    date,
    narration,
    senderBank,
    sender
}) => {
    let newBeneficiary;
    if (Beneficiary === null) {
        newBeneficiary = 'Self';
    } else if (Beneficiary === undefined) {
        newBeneficiary = 'Self';
    } else {
        newBeneficiary = Beneficiary?.split(' ');
    }

    const current = new Date(Dates).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const time = new Date(Dates).toLocaleTimeString('en-US');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // console.log(width);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    return (
        <>
            {width > 950 ? (
                <div>
                    <div className={styles.TableDetailBody} key={keys}>
                        <p className={styles.bene}>
                            {/* {title} */}
                            {newBeneficiary === ''
                                ? ''
                                : newBeneficiary[1] === undefined
                                ? newBeneficiary[0]
                                : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                        </p>
                        <p className={styles.transfer}>{Type}</p>
                        <p className={styles.amount}>{Amount}</p>
                        {/* <p className={styles.bank}>
                    {Bank === null ? network : `${Bank} - ${accountNumber}`}
                </p> */}
                        <p className={styles.date}>{`${current} ${time}`}</p>
                        <p
                            className={
                                Status === 'PENDING'
                                    ? styles.pending
                                    : Status === 'SUCCESS'
                                    ? styles.success
                                    : styles.status
                            }
                        >
                            {Status}
                        </p>
                        <div className={styles.more}>
                            <MoreAction
                                isaccountId={accountId}
                                senders={sender}
                                sendBank={senderBank}
                                narr={narration}
                                dates={Dates}
                                isDirection={direction}
                                accountId={accountId}
                                disputes={disputes}
                                transactionAmount={Amount}
                                transactionStatus={Status}
                                transactionTitle={Type}
                                bene={Beneficiary}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.mobilleMovement}>
                        <div>
                            <p className={styles.bene}>
                                {/* {title} */}
                                {newBeneficiary === ''
                                    ? ''
                                    : newBeneficiary[1] === undefined
                                    ? newBeneficiary[0]
                                    : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                            </p>
                            <p className={styles.transfer}>{Type}</p>
                        </div>
                        <div className={styles.statusAmmountMobile}>
                            <div>
                                <p className={styles.amount}>{Amount}</p>
                                <p
                                    className={
                                        Status === 'PENDING'
                                            ? styles.pending
                                            : Status === 'SUCCESS'
                                            ? styles.success
                                            : styles.status
                                    }
                                >
                                    {Status}
                                </p>
                            </div>
                            <div className={styles.more}>
                                <MoreAction
                                    isaccountId={accountId}
                                    senders={sender}
                                    sendBank={senderBank}
                                    narr={narration}
                                    dates={Dates}
                                    isDirection={direction}
                                    accountId={accountId}
                                    disputes={disputes}
                                    transactionAmount={Amount}
                                    transactionStatus={Status}
                                    transactionTitle={Type}
                                    bene={Beneficiary}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className={styles.paymentMobileHr} />
                </>
            )}
        </>
    );
};

export default TableDetail;
