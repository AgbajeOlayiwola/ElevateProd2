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
    const [activeBtn, setActiveBtn] = useState(true);
    // alert(statusbar);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.successcont}>
                {statusbar === 'success' ? (
                    <div>
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
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text="Close"
                                    type="button"
                                    onClick={action}
                                />
                            </RegistrationStatus>
                        </BodyWrapper>
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