import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashLayout from '../../components/layout/Dashboard';
import MakePaymentFirst from '../../components/ReusableComponents/MakePaymentFirst';
import MakePaymentSecond from '../../components/ReusableComponents/MakePaymentSecond';
import PaymentTable from '../../components/ReusableComponents/PayementTable';
import PaymentSuccess from '../../components/ReusableComponents/PaymentSuccess';
import ReceivePaymentFirst from '../../components/ReusableComponents/ReceivePaymentFirst';
import ReceivePaymentSecond from '../../components/ReusableComponents/ReceivePaymentSecond';
import styles from './styles.module.css';
import styled from 'styled-components';

const Payment = () => {
    // const payment = useSelector((state) => state.payment1);
    // console.log(payment);

    const [formType, setFormType] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [count, setCount] = useState(0);
    const [qr, setqr] = useState('10%');
    const [paylink, setPaylink] = useState('35%');
    const [ussd, setUssd] = useState('25%');
    const [mPOS, setMpos] = useState('30%');

    const ChartDiv = styled.div`
        width: ${(props) => props.width};
        background-color: ${(props) => props.bg};
        border-radius: 8px 8px 8px 8px;
        height: 100%;
        margin-left: -14px;
        z-index: ${(props) => props.zIndex};
    `;
    const ChartContent = styled.div`
        width: ${(props) => props.width};
        margin-left: -14px;

        p {
            color: ${(props) => props.color};
            font-size: 14px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            line-height: 16px;
        }

        h4 {
            font-size: 14px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            line-height: 16px;
            color: #3e3e3e;
        }
    `;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [count]);

    const paymentData = {
        make: [
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
                text: 'FX Transfer '
            }
        ],
        receive: [
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
            }
        ]
    };

    const handleFormChange = (formTitle) => {
        setFormType(formTitle);
        setOverlay(true);
    };
    const handleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
    };

    const buttonHandleClose = () => {
        if (formType === 'mpos') {
            setCount(count + 1);
        } else {
            setOverlay(false);
            setFormType('');
            setCount(0);
        }
    };

    const renderForm = () => {
        switch (formType) {
            case 'paylink':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                firstTitle="Create Payment Link"
                                buttonText="Generate Paylink"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                title="Payment Link Generated"
                                action={buttonHandleClose}
                                buttonText="Share Paylink"
                                type="Paylinks"
                            />
                        );
                }

            case 'ussd only':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                firstTitle="Create USSD Payment Code"
                                buttonText="Generate Paylink"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                title=" USSD "
                                action={buttonHandleClose}
                                buttonText="Share USSD Code"
                                type="USSD Code"
                            />
                        );
                }
            case 'ecobank qr only':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                firstTitle="Create Ecobank QR Code"
                                buttonText="Generate Paylink"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                title="Create Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Share Paylink"
                                type=" Ecobank QR Codes"
                            />
                        );
                }
            case 'mpos':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                firstTitle="Use Mobile POS"
                                buttonText="Generate Paylink"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                title="Confirm mPOS Payment Details"
                                action={buttonHandleClose}
                                buttonText="Activate NFC Scanner"
                            />
                        );
                    case 2:
                        return (
                            <div className={styles.NFCScanner}>
                                <h2>Complete Transaction on Mobile Phone</h2>
                                <p>
                                    Note that this will be completed on your
                                    mobile phone which is serving as your POS.
                                </p>
                                <button>Activate NFC Scanner</button>
                            </div>
                        );
                }

            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                firstTitle="Single Transfer Payment"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                transferaction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Single Transfer Payment"
                            />
                        );
                }

            case 'bulk transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                firstTitle="Bulk Payments"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                transferaction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Bulk Payment"
                            />
                        );
                }

            case 'bills payment':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                firstTitle="Bill Payment"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                transferaction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Bill Payment"
                            />
                        );
                }

            case 'fx transfer ':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                firstTitle="Foreign Transfer Payments"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                transferaction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                country="Nigeria"
                                title="Foreign Transfer Payments"
                            />
                        );
                }

            default:
        }
    };

    return (
        <DashLayout overlay={overlay}>
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
                    <div className={styles.chart}>
                        <ChartDiv width={qr} bg="#3CE312" zIndex="4"></ChartDiv>
                        <ChartDiv
                            width={paylink}
                            bg="#69940D"
                            zIndex="3"
                        ></ChartDiv>
                        <ChartDiv
                            width={ussd}
                            bg="#6CCF00"
                            zIndex="2"
                        ></ChartDiv>
                        <ChartDiv
                            width={mPOS}
                            bg="#C4D344"
                            zIndex="1"
                        ></ChartDiv>
                    </div>
                    <div className={styles.chartdetails}>
                        <ChartContent width={qr} color="#3CE312">
                            <p>QR</p>
                            <h4>{qr}</h4>
                        </ChartContent>
                        <ChartContent width={paylink} color="#69940D">
                            <p>Paylink</p>
                            <h4>{paylink}</h4>
                        </ChartContent>
                        <ChartContent width={ussd} color="#6CCF00">
                            <p>USSD</p>
                            <h4>{ussd}</h4>
                        </ChartContent>
                        <ChartContent width={mPOS} color="#C4D344">
                            <p>mPOS</p>
                            <h4>{mPOS}</h4>
                        </ChartContent>
                    </div>
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
                    {paymentData.receive.map((payType, index) => (
                        <PaymentSingleBody
                            data={payType}
                            index={index}
                            type="receive"
                            handleFormChange={handleFormChange}
                        />
                    ))}
                </PaymentCard>
                <PaymentCard title="Make Payments" type="make">
                    {paymentData.make.map((payType, index) => (
                        <PaymentSingleBody
                            data={payType}
                            index={index}
                            type="make"
                            handleFormChange={handleFormChange}
                        />
                    ))}
                </PaymentCard>
            </div>

            <PaymentTable title="All Transactions" />

            {renderForm()}
        </DashLayout>
    );
};

const PaymentSingleBody = ({
    data: { icon, text },
    index,
    type,
    handleFormChange
}) => {
    return (
        <div
            className={styles.paymentSingleBody}
            key={index}
            onClick={() => handleFormChange(text.toLowerCase())}
        >
            <div>
                <div className={styles.paymentSingleImg}>
                    <img src={icon} alt="logo" />
                </div>
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
    );
};

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

export default Payment;
