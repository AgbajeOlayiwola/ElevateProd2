import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import {
    BodyWrapper,
    RegistrationStatus,
    SuccessMainHeading
} from './styles.module';
import Link from 'next/link';
import ButtonComp from '../Button';
import Overlay from '../Overlay';
import ErrorSvg from '../ReusableSvgComponents/ErrorSvg';
import SuccessCheckSvg from '../ReusableSvgComponents/SuccessCheckSvg';

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
    isLoading,
    statusbar,
    error,
    repeatAction
}) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <Overlay overlay={overlay}>
            <div ref={myref} className={styles.successcont}>
                {statusbar === 'success' ? (
                    <div>
                        {type === 'profile' ? (
                            <BodyWrapper>
                                <div className={styles.successCheck}>
                                    <div>
                                        <SuccessCheckSvg />
                                    </div>
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
                                <div className={styles.successCheck}>
                                    <div>
                                        <SuccessCheckSvg />
                                    </div>
                                </div>

                                <RegistrationStatus>
                                    <SuccessMainHeading>
                                        Transfer Successful
                                    </SuccessMainHeading>
                                    {title === 'Bill payment' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            Your recharge of
                                            <span>{amount} </span> for Airtime
                                            on June 12, 2022 by 12:02pm
                                        </h6>
                                    ) : title ===
                                      'Foreign Transfer Payments' ? (
                                        <h6 className={styles.elevateSuccess}>
                                            <span>{amount} </span> will be
                                            transferred to
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

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Return to Payments"
                                        type="button"
                                        onClick={action}
                                    />
                                    <p className={styles.repeat}>
                                        Set this transaction as{' '}
                                        <span onClick={repeatAction}>
                                            Repeat
                                        </span>
                                    </p>
                                </RegistrationStatus>
                            </BodyWrapper>
                        )}
                    </div>
                ) : statusbar === 'error' ? (
                    <div className={styles.errorCont}>
                        <div>
                            <ErrorSvg />
                        </div>
                        <h2>Oops.</h2>
                        <p>{error}</p>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Try again"
                            type="button"
                            onClick={action}
                        />
                    </div>
                ) : null}
            </div>
        </Overlay>
    );
};

export default PaymentSuccess;
