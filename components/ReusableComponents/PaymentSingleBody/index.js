import styles from './styles.module.css';
const PaymentSingleBody = ({
    data: { icon, text },
    index,
    type,
    handleFormChange
}) => {
    return (
        <>
            {text === 'FX Transfer' ? (
                <div
                    className={styles.paymentSingleBodyGrey}
                    key={index}
                    // onClick={() => handleFormChange(text.toLowerCase())}
                >
                    <div>
                        <div className={styles.paymentSingleImg}>{icon}</div>
                        <div className={styles.paymentSingleText}>
                            <p
                                className={
                                    type == 'receive'
                                        ? styles.receivePara
                                        : styles.makePara
                                }
                            >
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={styles.paymentSingleBody}
                    key={index}
                    onClick={() => handleFormChange(text.toLowerCase())}
                >
                    <div>
                        <div className={styles.paymentSingleImg}>{icon}</div>
                        <div className={styles.paymentSingleText}>
                            <p
                                className={
                                    type == 'receive'
                                        ? styles.receivePara
                                        : styles.makePara
                                }
                            >
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentSingleBody;
