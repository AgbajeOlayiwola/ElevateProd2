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
import Image from 'next/image';
import Overlay from '../../components/ReusableComponents/Overlay';
import SchedulePayment from '../../components/ReusableComponents/Schedulepayment';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import SingleTrans from '../../components/ReusableComponents/SingleTransSvg';
import BulkTransfer2 from '../../components/ReusableComponents/BulkTransfSvg/bulktrans';
import BillTransfer from '../../components/ReusableComponents/BillTransSvg';
import FxTrans from '../../components/ReusableComponents/FxtransSvg';
import Paylink2 from '../../components/ReusableComponents/PaylinkSvg/paylink';
import Ussd from '../../components/ReusableComponents/UssdSvg';
import MposSvg2 from '../../components/ReusableComponents/mPOSSvg/Mpos';
import EcobankQRSvg from '../../components/ReusableComponents/EcobankQRSvg';
import axios from 'axios';

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
    const [outType, setOutType] = useState();
    const [balance] = useState('22,049.94');
    const [paymentDetail, setPaymentDetail] = useState({});

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
        text-align: center;

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
                icon: <BillTransfer />,
                text: 'Bills Payment'
            },
            {
                icon: <SingleTrans />,
                text: 'Single Transfer'
            },
            {
                icon: <BulkTransfer2 />,
                text: 'Bulk Transfer'
            },

            {
                icon: <FxTrans />,
                text: 'FX Transfer '
            }
        ],
        receive: [
            {
                icon: <EcobankQRSvg />,
                text: 'Ecobank QR Only'
            },
            {
                icon: <MposSvg2 />,
                text: 'Phone POS'
            },
            {
                icon: <Ussd />,
                text: 'USSD only'
            },
            {
                icon: <Paylink2 />,
                text: 'Paylink'
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
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
                                firstTitle="Create USSD Payment Code"
                                buttonText="Share USSD code"
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
                                overlay={overlay}
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
                                overlay={overlay}
                                firstTitle="Create Ecobank QR Code"
                                buttonText="Share Ecobank QR Codes"
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
                                overlay={overlay}
                                title=" Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Share Ecobank QR Code"
                                type=" Ecobank QR Codes"
                            />
                        );
                }
            case 'phone pos':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Use Mobile POS"
                                buttonText="Activate NFC Scanner"
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
                                overlay={overlay}
                                title="Confirm mPOS Payment Details"
                                action={() => {
                                    setCount(count + 1);
                                }}
                                buttonText="Activate NFC Scanner"
                            />
                        );
                    case 2:
                        return (
                            <Overlay overlay={overlay}>
                                <div className={styles.NFCScanner}>
                                    <h2>
                                        Complete Transaction on Mobile Phone
                                    </h2>
                                    <p>
                                        Note that this will be completed on your
                                        mobile phone which is serving as your
                                        POS.
                                    </p>
                                    <button onClick={buttonHandleClose}>
                                        Activate NFC Scanner
                                    </button>
                                </div>
                            </Overlay>
                            // <SchedulePayment />
                        );
                }

            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Single Transfer Payment"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    setPaymentDetail(data);
                                    // try {
                                    //     const token =
                                    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoib0lCeVVGMXMiLCJ0b2tlblR5cGUiOiJBQ0NFU1MifSwiaWF0IjoxNjU4NzMzNDUwLCJleHAiOjE2NTg4MTk4NTB9.m5m_Hv2XL_Lk_4NjlUhTIxrZM2I4NVVOxS6MMk4yZH8';
                                    //     const authAxios = axios.create({
                                    //         baseURL:
                                    //             'https://ellevate-app.herokuapp.com',
                                    //         headers: {
                                    //             Authorization: `Bearer ${token}`
                                    //         }
                                    //     });
                                    //     const response = await authAxios.post(
                                    //         '/transfer/inter-bank-transfer',
                                    //         JSON.stringify(data)
                                    //     );
                                    // } catch (error) {
                                    //     console.log(error.message);
                                    // }
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                overlay={overlay}
                                amount={paymentDetail.amount}
                                sender={paymentDetail.accountName}
                                recieverName={paymentDetail.beneficiaries}
                                recieverBank={paymentDetail.bankName}
                                transferaction={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
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
                                overlay={overlay}
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
    const types = (type) => {
        setOutType(type);
    };
    return (
        <DashLayout>
            <div className={styles.greencard}>
                <div className={styles.greencardDetails}>
                    <div>
                        <Image
                            src="/Assets/Images/clock.png"
                            width="100%"
                            height="100%"
                        />
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
                            <p>Phone POS</p>
                            <h4>{mPOS}</h4>
                        </ChartContent>
                    </div>
                </div>
                <div className={styles.whiteboard}>
                    <div className={styles.balance}>
                        <div>
                            <div className={styles.visibility}>
                                <p className={styles.thousand}>
                                    {outType ? '*******' : '₦' + balance}
                                </p>
                                <Visbility color="green" typeSet={types} />
                            </div>
                            <p className={styles.avail}>Available Balance</p>
                        </div>
                        <div className="">
                            <Image
                                src="/Assets/Images/bagmoney.png "
                                width="100%"
                                height="100%"
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
                            key={index}
                            type="receive"
                            handleFormChange={handleFormChange}
                        />
                    ))}
                </PaymentCard>
                <PaymentCard title="Make Payments" type="make">
                    {paymentData.make.map((payType, index) => (
                        <PaymentSingleBody
                            data={payType}
                            key={index}
                            type="make"
                            handleFormChange={handleFormChange}
                        />
                    ))}
                </PaymentCard>
            </div>

            <PaymentTable title="Payment History" />

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
