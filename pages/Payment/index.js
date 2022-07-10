import React from 'react';
import { useSelector } from 'react-redux';
import DashLayout from '../../components/layout/Dashboard';
import PaymentTable from '../../components/ReusableComponents/PayementTable';
import PaymentType from '../../components/ReusableComponents/PaymentType';
import ReceivePaymentFirst from '../../components/ReusableComponents/ReceivePayment';
import styles from './styles.module.css';

const Payment = () => {
    const payment = useSelector((state) => state.payment1);
    console.log(payment);

    const paymentData = [
        {
            icon: '',
            text: ''
        }
    ];

    return (
        <DashLayout>
            <div className={styles.greencard}>
                <div className={styles.greencardDetails}>
                    <div>
                        <img src="../Assets/Images/clock.png" alt="Clock" />
                    </div>
                    <div>
                        <h3>Introducing Scheduled Payments</h3>
                        <p>
                            You can now schedule your transfer for a later time
                            or date by selecting
                            <span> ‘Schedule for later’ </span> when you make
                            payments.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.cov}>
                <div className={styles.whiteboard}>
                    <p className={styles.percentage}>
                        <span>73%</span>payment transactions completed
                        successfully today.
                    </p>
                </div>
                <div className={styles.whiteboard}>
                    <div className={styles.balance}>
                        <div>
                            <p className={styles.thousand}> #22,049.94</p>
                            <p className={styles.avail}>Available Balance</p>
                        </div>
                        <div className="">
                            <img
                                src="../Assets/Images/bagmoney.png"
                                alt="Money"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cov}>
                <PaymentType
                    paymentType="Recieve Payments"
                    color="#69940D"
                    link1="../../Assets/Svgs/Vector.svg"
                    text1="Paylink"
                    link2="../../Assets/Svgs/naira.svg"
                    text2="USSD only"
                    link3="../../Assets/Svgs/Frame.svg"
                    text3="Ecobank QR Only"
                    link4="../../Assets/Svgs/Frame(1).svg"
                    text4="mPOS"
                    textColor="#005B82"
                />
                <PaymentType
                    paymentType="Make Payment"
                    color="#102572"
                    link1="../../Assets/Svgs/Vector(1).svg"
                    text1="Single Transfer"
                    link2="../../Assets/Svgs/Group 444.svg"
                    text2="Bulk Transfer"
                    link3="../../Assets/Svgs/Group 452.svg"
                    text3="Bills Payment"
                    link4="../../Assets/Svgs/Vector(2).svg"
                    text4="FX Transfer"
                    textColor="#2F2F2F"
                />
            </div>
            <PaymentTable title="All Transactions" />

            <ReceivePaymentFirst
                firstTitle="Create Payment Link"
                buttonText="Generate Paylink"
            />
            <ReceivePaymentFirst firstTitle="Create USSD Payment Code" />
            <ReceivePaymentFirst firstTitle="Create Ecobank QR Code" />
            <ReceivePaymentFirst firstTitle="Use Mobile POS" />
        </DashLayout>
    );
};

export default Payment;
