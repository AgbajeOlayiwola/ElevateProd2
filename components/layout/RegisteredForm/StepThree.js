import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Link from 'next/link';

const StepThree = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);

    const [bcolor, setBColor] = useState(false);

    const handleRegistrationStatus = () => {
        setIsRegistered(true);
        setBgcolor(true);
    };
    const switchRegistrationStatus = () => {
        setIsRegistered(false);
        setBgcolor(false);
    };
    const handleBusiness = () => {
        setBColor(false);
    };
    const handleBusinessTog = () => {
        setBColor(true);
    };
    return (
        <div>
            <h1 className={styles.header}>Complete Your Profile</h1>
            <div className={styles.cardHeading}>
                <h3 className={styles.LeftHeading}>Complete Your Profile</h3>

                {/* <Imag
                    src="/width"
                    alt="lineImage" /> */}
            </div>
            <p
                style={{
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#3E3E3E'
                }}
            >
                Is your business registered?
            </p>
            <div className={styles.ButtonWrapper}>
                <span
                    className={styles.ToggleNo}
                    onClick={switchRegistrationStatus}
                    style={
                        bgcolor
                            ? { background: '#f8f8f8' }
                            : { background: '#6ccf00' }
                    }
                >
                    <p
                        className={styles.ToggleNoText}
                        style={
                            bgcolor
                                ? { color: '#a5a5a5' }
                                : { color: '#ffffff' }
                        }
                    >
                        No
                    </p>
                </span>
                <span
                    className={styles.ToggleYes}
                    onClick={handleRegistrationStatus}
                    style={
                        bgcolor
                            ? { background: '#6ccf00' }
                            : { background: '#f8f8f8' }
                    }
                >
                    <p
                        className={styles.ToggleYesText}
                        style={
                            bgcolor
                                ? { color: '#ffffff' }
                                : { color: '#a5a5a5' }
                        }
                    >
                        Yes
                    </p>
                </span>
            </div>
            <div className={styles.formInner}>
                <div>
                    <p>Name : </p>
                    <p>Agbaje Olayiwola</p>
                </div>
                <div>
                    <p>Account number : </p>
                    <p>02515425352</p>
                </div>
                <div>
                    <div>
                        <p>Email : </p>
                        <p>agbajeolaiwola@gmail.com</p>
                    </div>
                    <div>
                        <p>Phone Number : </p>
                        <p>081110692865</p>
                    </div>
                    <div>
                        <p>Gender : </p>
                        <p>Male</p>
                    </div>
                </div>
                <Link href="/Succes">
                    <ButtonComp text="Confirm" type="button" />
                </Link>
            </div>
        </div>
    );
};

export default StepThree;
