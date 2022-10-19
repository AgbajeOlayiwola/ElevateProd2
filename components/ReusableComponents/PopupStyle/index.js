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
    actionYes,
    actionNo,
    text,
    overlay,
    heading,
    body,
    statusbar,
    error,
    type
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
                        <div className={styles.icons}>
                            <ErrorSvg />
                        </div>
                        <h2>Oops.</h2>
                        <p>{error}</p>
                        {type === 'bene' ? (
                            <div className={styles.beneButton}>
                                <div className={styles.beneButtonSingle}>
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Yes"
                                        type="button"
                                        onClick={actionYes}
                                    />
                                </div>
                                <div className={styles.beneButtonSinglse}>
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="No"
                                        type="button"
                                        onClick={actionNo}
                                    />
                                </div>
                            </div>
                        ) : (
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text={text}
                                type="button"
                                onClick={action}
                            />
                        )}
                    </div>
                ) : null}
            </div>
        </Overlay>
    );
};

export default PaymentSuccess;
