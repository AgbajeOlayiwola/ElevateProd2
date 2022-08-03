import styles from './styles.module.css';
const PaymentCard = ({ children, title, type }) => {
    return (
        <div className={styles.paymentTypeCont}>
            <h2 className={type == 'receive' ? styles.receive : styles.make}>
                {title}
            </h2>
            <div className={styles.PaymentSingle}>{children}</div>
        </div>
    );
};

export default PaymentCard;
