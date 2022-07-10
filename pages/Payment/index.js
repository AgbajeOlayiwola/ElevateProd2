import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DashLayout from '../../components/layout/Dashboard';
import PaymentTable from '../../components/ReusableComponents/PayementTable';
import PaymentType from '../../components/ReusableComponents/PaymentType';
import ReceivePaymentFirst from '../../components/ReusableComponents/ReceivePayment';
import styles from './styles.module.css';

const Payment = () => {
    const payment = useSelector((state) => state.payment1);
    console.log(payment);

    const [formType, setFormType] = useState('paylink')

    const makeData = [
        {
            icon: '../../Assets/Svgs/Vector(1).svg',
            text: 'Single Transfer'
        },
        {
            icon: '../../Assets/Svgs/Group 444.svg',
            text: 'Bulk Transfer'
        },
        {
            icon: '../../Assets/Svgs/Group 452.svg',
            text: 'Bills Payment'
        },
        {
            icon: '../../Assets/Svgs/Vector(2).svg',
            text: 'FX Transfer'
        },
    ];

    const receiveData = [
        {
            icon: '../../Assets/Svgs/Vector.svg',
            text: 'Paylink'
        },
        {
            icon: '../../Assets/Svgs/naira.svg',
            text: 'USSD only'
        },
        {
            icon: '../../Assets/Svgs/Frame.svg',
            text: 'Ecobank QR Only'
        },
        {
            icon: '../../Assets/Svgs/Frame(1).svg',
            text: 'mPOS'
        },
    ];

    const handleFormChange = formTitle => setFormType(formTitle)

    const renderForm = () => {
        switch (formType) {
            case 'paylink':
                return <OverlayPage>
                    <ReceivePaymentFirst firstTitle="Create Payment Link" buttonText="Generate Paylink" />
                </OverlayPage>
            case 'ussd only':
                return <OverlayPage>
                    <ReceivePaymentFirst firstTitle="Create USSD Payment Code" />
                </OverlayPage>
            case 'ecobank qr only':
                return <OverlayPage>
                    <ReceivePaymentFirst firstTitle="Create Ecobank QR Code" />
                </OverlayPage>
            case 'mpos':
                return <OverlayPage>
                    <ReceivePaymentFirst firstTitle="Use Mobile POS" />
                </OverlayPage>
            case 'single':
                break;
            case 'bulk':
                break;
            case 'bills':
                break;
            case 'fx':
                break;
            default:
        }
    }

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
                <PaymentCard title="Receive Payments" type="receive">
                    {
                        receiveData.map((payType, index) => <PaymentSingleBody 
                            data={payType} 
                            index={index} 
                            type="receive" 
                            handleFormChange={handleFormChange}
                        />)
                    }
                </PaymentCard>
                <PaymentCard title="Make Payments" type="make">
                    {
                        makeData.map((payType, index) => <PaymentSingleBody 
                            data={payType} 
                            index={index} 
                            type="make" 
                            handleFormChange={handleFormChange}
                        />)
                    }
                </PaymentCard>
            </div>

            <PaymentTable title="All Transactions" />

            { renderForm() }
        </DashLayout>
    );
};

const PaymentSingleBody = ({ data: { icon, text }, index, type, handleFormChange }) => {
    return (
        <div className={styles.paymentSingleBody} key={index} onClick={() => handleFormChange(text.toLowerCase())}>
            <div>
                <div className={styles.paymentSingleImg}>
                    <img src={icon} alt="logo" />
                </div>
                <div className={styles.paymentSingleText}>
                    <p className={type == 'receive' ? styles.receivePara : styles.makePara }>{text}</p>
                </div>
            </div>
        </div>
    )
}

const PaymentCard = ({ children, title, type }) => {
    return (
        <div className={styles.paymentTypeCont}>
            <h2 className={type == 'receive' ? styles.receive : styles.make }>{ title }</h2>
            <div className={styles.PaymentSingle}>
                { children }
            </div>
        </div>
    )
}

const OverlayPage = ({ children }) => {
    return (
        <div className='styles.overlayContainer'>
            { children }
        </div>
    )
}

export default Payment;
