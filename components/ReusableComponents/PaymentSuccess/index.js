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
    body
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
                            <SuccessMainHeading>{heading}</SuccessMainHeading>

                            <h6 className={styles.elevateSuccess}>{body}</h6>

                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
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

                            <h6 className={styles.elevateSuccess}>
                                <span>N5,000,000.00 </span> will be transferred
                                to
                                <span> Babatunde James </span>
                                on <span> June 12, 2022 by 12:02pm</span>
                            </h6>

                            {title === 'Foreign Transfer Payments' ? (
                                <h6 className={styles.elevateSuccess}>
                                    <span>Country: </span> {country}
                                </h6>
                            ) : title === 'Bill Payment' ? (
                                <p>
                                    Recharge details have been shared to your
                                    email and your provided phone number.
                                </p>
                            ) : null}

                            <div className={styles.reminder}>
                                <p>Set Reminder</p>
                            </div>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Return to Payments"
                                type="button"
                                onClick={action}
                            />
                        </RegistrationStatus>
                    </BodyWrapper>
                )}
            </div>
        </Overlay>
    );
};

export default PaymentSuccess;
