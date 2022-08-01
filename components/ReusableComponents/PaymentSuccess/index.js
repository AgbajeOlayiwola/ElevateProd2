import React, { useState, useRef, useEffect } from 'react';
import Success from '../Success';
import styles from './styles.module.css';
import {
    BodyWrapper,
    RegistrationStatus,
    SuccessMainHeading
} from './styles.module';
import Link from 'next/link';
import ButtonComp from '../Button';
import Overlay from '../Overlay';

const PaymentSuccess = ({
    action,
    country,
    title,
    overlay,
    type,
    heading,
    body,
    paymentType,
    amount,
    number,
    beneName,
    isLoading
}) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.successcont} ref={myref}>
                {isLoading ? (
                    <div className={styles.PaymentSecondCont}>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    <>
                        {type === 'profile' ? (
                            <BodyWrapper>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Success />
                                </div>

                                <RegistrationStatus>
                                    <SuccessMainHeading>
                                        {heading}
                                    </SuccessMainHeading>

                                    <h6 className={styles.elevateSuccess}>
                                        {body}
                                    </h6>

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Close"
                                        type="button"
                                        onClick={action}
                                    />
                                </RegistrationStatus>
                            </BodyWrapper>
                        ) : (
                            <BodyWrapper>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Success />
                                </div>

                                <RegistrationStatus>
                                    <SuccessMainHeading>
                                        Transfer Successful
                                    </SuccessMainHeading>
                                    {title === 'Bill payment' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            Your recharge of{' '}
                                            <span>{amount} </span> for Airtime
                                            on June 12, 2022 by 12:02pm
                                        </h6>
                                    ) : title ===
                                      'Foreign Transfer Payments' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            <span>{amount} </span> will be
                                            transferred to{' '}
                                            <span>{beneName}</span> on June 12,
                                            2022 by 12:02pm
                                        </h6>
                                    ) : title === 'Bulk Payment' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            {amount} was transferred to 3
                                            Accounts on June 12, 2022 by 12:02pm
                                        </h6>
                                    ) : title === 'Single Transfer Payment' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            <span>₦{amount}</span> will be
                                            transferred to
                                            <span> {beneName}</span> on June 12,
                                            2022 by 12:02pm
                                        </h6>
                                    ) : null}

                                    {title === 'Foreign Transfer Payments' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            <span>Country: </span> {country}
                                        </h6>
                                    ) : title === 'Bill Payment' ? (
                                        <p>
                                            Recharge details have been shared to
                                            your email and your provided phone
                                            number.
                                        </p>
                                    ) : null}

                                    <div className={styles.reminder}>
                                        <p>Set Reminder</p>
                                    </div>
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Return to Payments"
                                        type="button"
                                        onClick={action}
                                    />
                                </RegistrationStatus>
                            </BodyWrapper>
                        )}{' '}
                    </>
                )}
            </div>
        </Overlay>
    );
};

export default PaymentSuccess;
