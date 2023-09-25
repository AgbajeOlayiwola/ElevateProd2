import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import OmniliteSvg from '../ReusableSvgComponents/OmniliteSvg';
import AccountNumberSvg from '../ReusableSvgComponents/AccountNumberSvg';
import CardSvg from '../ReusableSvgComponents/CardSvg';
import Visbility from '../Eyeysvg';
import Modal from 'react-modal';
import ButtonComp from '../Button';
import TermsConditions from '../TermmsConditions';
import Link from 'next/link';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '70vh',
        width: '40vw',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const ExistingProfileSetup = ({
    selectCountry,
    selectedOption,
    onSelectChange
}) => {
    const [omnilit, setOmnilite] = useState(true);
    const [activeBtn, setActiveBtn] = useState(false);
    const [page, setPage] = useState(0);
    const [ecobank, setEcobank] = useState(false);
    const [outType, setOutType] = useState();
    const [acct, setAcct] = useState(false);
    const [card, setCard] = useState(false);
    const [ecoonlineUserName, setEconlineUsername] = useState();
    const [ecoonlinePassword, setEcoonlinePassword] = useState();
    const [accountNo, setAccountNo] = useState();
    const [cardPan, setCardPanMatch] = useState('');
    const [loading, setLoading] = useState(false);
    const [cardExp, setCardExp] = useState('');
    const [cvv, setCVV] = useState('');
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const types = (type) => {
        setOutType(type);
    };
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter Your Omnilite Username</label>
                            <input
                                placeholder="Omnilite Username"
                                type="text"
                                className={styles.idInput}
                                name="omniliteUsername"
                            />
                        </div>
                        <div>
                            <label>Enter Your Omnilite Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Omnilite Password"
                                    className={styles.idInput}
                                    name="omnilitePassword"
                                    type={outType ? 'text' : 'password'}
                                />
                                <Visbility typeSet={types} input="input" />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter your Ecobank Online Username</label>
                            <input
                                placeholder="Ecobank Online Username"
                                type="text"
                                className={styles.idInput}
                                name="onlineUsername"
                            />
                        </div>
                        <div>
                            <label>Enter Your Ecobank Online Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Ecobank Online Password"
                                    className={styles.idInput}
                                    name="onlinePassword"
                                    type={outType ? 'text' : 'password'}
                                />
                                <Visbility typeSet={types} input="input" />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter Your Ecobank Account Number</label>
                            <input
                                placeholder="123*******62"
                                type="text"
                                className={styles.idInput}
                                name="accountNumber"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Ecobank Card number</label>
                            <input
                                placeholder="Ecobank Card number"
                                className={styles.idInput}
                                type="number"
                                name="cardNumber"
                            />
                        </div>
                        <div className={styles.expCvv}>
                            <div className={styles.exp}>
                                <div className={styles.shows}>
                                    <label>Expiry Date</label>
                                    <input
                                        placeholder="YY/MM"
                                        className={styles.passwordInput}
                                        type="text"
                                        name="expiryDate"
                                        value={cardExp}
                                        maxLength="5"
                                    />
                                </div>
                            </div>
                            <div className={styles.cvvCode}>
                                <div className={styles.shows}>
                                    <label>CVV</label>
                                    <input
                                        placeholder="CVV"
                                        className={styles.passwordInput}
                                        maxLength="3"
                                        type="password"
                                        name="cvv"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
        }
    };
    const handleChange = (event) => {
        const newOption = event.target.value;
        onSelectChange(newOption); // Call the callback function in the parent component
    };
    return (
        <>
            <div className={styles.secondSectionMidYes}>
                <label htmlFor="">Do you have an Ecobank Account?</label>
                <select onChange={handleChange} value={selectedOption}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <form className={styles.form}>
                <div className={styles.existingUser}>
                    <div className={styles.existingUserHeader}>
                        <p className={styles.choose}>
                            Choose Preferred Login Option
                        </p>
                        <div className={styles.omnisets}>
                            <div className={styles.cov}>
                                <div
                                    className={
                                        omnilit
                                            ? styles.active
                                            : styles.notActive
                                    }
                                    onClick={() => {
                                        setPage(0);

                                        setOmnilite(true);
                                        setEcobank(false);
                                        setCard(false);
                                        setAcct(false);
                                    }}
                                >
                                    <OmniliteSvg id="image0_8209_39687" />
                                </div>
                                <p
                                    className={
                                        omnilit
                                            ? styles.activeName
                                            : styles.name
                                    }
                                >
                                    Omnilite Details
                                </p>
                            </div>
                            <div className={styles.cov}>
                                {' '}
                                <div
                                    className={
                                        ecobank
                                            ? styles.active
                                            : styles.notActive
                                    }
                                    onClick={() => {
                                        setPage(1);

                                        setOmnilite(false);
                                        setEcobank(true);
                                        setCard(false);
                                        setAcct(false);
                                        setEconlineUsername('');
                                        setEcoonlinePassword('');
                                    }}
                                >
                                    <img
                                        src="/Assets/Svgs/ecobankMobile.svg"
                                        width={45}
                                        height={45}
                                        alt="Details"
                                    />
                                    {/* <EcobankMobileSvg /> */}
                                </div>
                                <p
                                    className={
                                        ecobank
                                            ? styles.activeName
                                            : styles.name
                                    }
                                >
                                    Ecobank Online
                                </p>
                            </div>

                            <div className={styles.cov}>
                                <div
                                    className={
                                        acct ? styles.active : styles.notActive
                                    }
                                    onClick={() => {
                                        setPage(2);

                                        setOmnilite(false);
                                        setEcobank(false);
                                        setCard(false);
                                        setAcct(true);
                                        setAccountNo('');
                                    }}
                                >
                                    <AccountNumberSvg />
                                </div>
                                <p
                                    className={
                                        acct ? styles.activeName : styles.name
                                    }
                                >
                                    Account Number
                                </p>
                            </div>
                            <div className={styles.cov}>
                                <div
                                    className={
                                        card ? styles.active : styles.notActive
                                    }
                                    onClick={() => {
                                        setPage(3);

                                        setOmnilite(false);
                                        setEcobank(false);
                                        setCard(true);
                                        setAcct(false);
                                        setCVV('');
                                    }}
                                >
                                    <CardSvg />
                                </div>
                                <p
                                    className={
                                        card ? styles.activeName : styles.name
                                    }
                                >
                                    Bank Card Details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.existingUserBody}>
                        {conditionalComponent()}
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ul>
                        <div className={styles.headerDiv}>
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                                GLOBAL ACCOUNT TERMS AND CONDITIONS DEC 2022
                            </h2>
                            <h1 className={styles.errorX} onClick={closeModal}>
                                X
                            </h1>
                        </div>

                        <TermsConditions />
                    </ul>
                </Modal>
                <p className={styles.alreadyTC}>
                    <input
                        type="radio"
                        onChange={() => setActiveBtn(true)}
                        className={styles.termms}
                    />
                    I agree with ellevate app{' '}
                    <span className={styles.termsBtn} onClick={openModal}>
                        <span>Terms and Conditions</span>
                    </span>
                </p>
                <div className={styles.secondSectionMidCountry}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Create account"
                        type="submit"
                        loads={loading}
                    />
                </div>
                <p className={styles.already}>
                    Already have an account?{' '}
                    <Link href="/Auth/Login">
                        <span>Sign in</span>
                    </Link>
                </p>
            </form>
        </>
    );
};

export default ExistingProfileSetup;
