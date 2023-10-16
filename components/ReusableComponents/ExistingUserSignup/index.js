import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useAuthEcobankMutation,
    useAuthOmniliteMutation,
    useRegisterAccountNumberMutation,
    useRegisterCardMutation
} from '../../../redux/api/authApi';
import { setExistingUserDetails } from '../../../redux/slices/existingUserData';
import ButtonComp from '../Button';
import Visbility from '../Eyeysvg';
import AccountNumberSvg from '../ReusableSvgComponents/AccountNumberSvg';
import CardSvg from '../ReusableSvgComponents/CardSvg';
import OmniliteSvg from '../ReusableSvgComponents/OmniliteSvg';
import TermsConditions from '../TermmsConditions';
import styles from './styles.module.css';
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
    const [loading, setLoading] = useState(false);
    const [acct, setAcct] = useState(false);
    const [card, setCard] = useState(false);
    const [ecobank, setEcobank] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    const [omniliteUsername, setOmniliteUsername] = useState('');
    const [omnilitePassword, setOmnilitePassword] = useState();
    const [ecoonlineUserName, setEconlineUsername] = useState();
    const [ecoonlinePassword, setEcoonlinePassword] = useState();
    const [accountNo, setAccountNo] = useState();
    const [cardPan, setCardPanMatch] = useState('');
    const [cardExp, setCardExp] = useState('');
    const [cvv, setCVV] = useState('');
    const [page, setPage] = useState(0);
    const [outType, setOutType] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();
    let subtitle;
    function openModal() {
        setIsOpen(true);
    }
    const router = useRouter();

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
    const [
        registerAccountNumber,
        {
            data: registerAccountNumberData,
            isLoading: registerAccountNumberLoad,
            isSuccess: registerAccountNumberSuccess,
            isError: registerAccountNumberFalse,
            error: registerAccountNumberErr,
            reset: registerAccountNumberReset
        }
    ] = useRegisterAccountNumberMutation();
    const [
        registerCard,
        {
            data: registerCardData,
            isLoading: registerCardLoad,
            isSuccess: registerCardSuccess,
            isError: registerCardFalse,
            error: registerCardErr,
            reset: registerCardReset
        }
    ] = useRegisterCardMutation();
    const [
        authOmnilite,
        {
            data: authOmniliteData,
            isLoading: authOmniliteLoad,
            isSuccess: authOmniliteSuccess,
            isError: authOmniliteFalse,
            error: authOmniliteErr,
            reset: authOmniliteReset
        }
    ] = useAuthOmniliteMutation();
    const [
        authEcobank,
        {
            data: authEcobankData,
            isLoading: authEcobankLoad,
            isSuccess: authEcobankSuccess,
            isError: authEcobankFalse,
            error: authEcobankErr,
            reset: authEcobankReset
        }
    ] = useAuthEcobankMutation();
    const showToastMessage = () => {
        toast.error('Error Creating Account', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (
            authEcobankErr ||
            authOmniliteErr ||
            registerCardErr ||
            registerAccountNumberErr
        ) {
            showToastMessage();
        }
    }, [
        authEcobankErr,
        authOmniliteErr,
        registerCardErr,
        registerAccountNumberErr
    ]);

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
                                value={omniliteUsername}
                                onChange={(e) =>
                                    setOmniliteUsername(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label>Enter Your Omnilite Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Omnilite Password"
                                    className={styles.idInput}
                                    value={omnilitePassword}
                                    name="omnilitePassword"
                                    onChange={(e) =>
                                        setOmnilitePassword(e.target.value)
                                    }
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
                                value={ecoonlineUserName}
                                onChange={(e) =>
                                    setEconlineUsername(e.target.value)
                                }
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
                                    value={ecoonlinePassword}
                                    type={outType ? 'text' : 'password'}
                                    onChange={(e) =>
                                        setEcoonlinePassword(e.target.value)
                                    }
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
                                value={accountNo}
                                name="accountNumber"
                                onChange={(e) => setAccountNo(e.target.value)}
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
                                value={cardPan}
                                type="number"
                                name="cardNumber"
                                onChange={(e) =>
                                    setCardPanMatch(e.target.value)
                                }
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
                                        onChange={(e) =>
                                            setCardExp(e.target.value)
                                        }
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
                                        type="number"
                                        value={cvv}
                                        onChange={(e) => setCVV(e.target.value)}
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
    useEffect(() => {
        if (registerAccountNumberData) {
            dispatch(setExistingUserDetails(registerAccountNumberData));
            router.push('/Onboarding/ExistingProfileSetup');
            localStorage.setItem('loginWith', 'accountNumber');
        }
    }, [registerAccountNumberSuccess]);

    useEffect(() => {
        if (authOmniliteSuccess || authEcobankSuccess) {
            const getData = authOmniliteData?.data || authEcobankData?.data;
            const model = {
                statusCode: 200,
                message: 'success',
                data: {
                    phone: null,
                    mobileNos: getData?.originalMsisdn,
                    pndStatus: 'N',
                    pncStatus: 'N',
                    dormantStatus: 'N',
                    frozenStatus: 'N',
                    blockedStatus: 'N',
                    currencyCode: 'NGN',
                    dob: getData?.dateOfBirth,
                    bvn: '',
                    accountNumber: getData?.accounts
                        ?.map((obj) => obj?.accountNumber)
                        ?.join(', ')
                }
            };
            dispatch(
                setExistingUserDetails(
                    authOmniliteData?.data || authEcobankData?.data
                )
            );
            router.push('/Onboarding/ExistingProfileSetup');
        }
    }, [authOmniliteSuccess, authEcobankSuccess]);

    useEffect(() => {
        if (registerCardData) {
            dispatch(setExistingUserDetails(registerCardData));
            router.push('/Onboarding/ExistingProfileSetup');
        }
    }, [registerCardSuccess]);
    const submitForms = (e) => {
        e.preventDefault();
        if (page === 0) {
            const data = {
                username: omniliteUsername,
                password: omnilitePassword
            };
            authOmnilite(data);
        } else if (page === 1) {
            const data = {
                username: ecoonlineUserName,
                password: ecoonlinePassword
            };
            authEcobank(data);
        } else if (page === 2) {
            const data = {
                accountNo: accountNo
            };
            registerAccountNumber(data);
        } else if (page === 3) {
            const data = {
                pan: cardPan,
                expiry: cardExp,
                cvv: cvv
            };
            registerCard(data);
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
            {registerAccountNumberErr ? (
                <p className={styles.error}>
                    {registerAccountNumberErr?.data?.message}
                </p>
            ) : null}
            {registerCardErr ? (
                <p className={styles.error}>{registerCardErr?.data?.message}</p>
            ) : null}
            {authOmniliteErr ? (
                <p className={styles.error}>{authOmniliteErr?.data?.message}</p>
            ) : null}
            {authEcobankErr ? (
                <p className={styles.error}>{authEcobankErr?.data?.message}</p>
            ) : null}

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
                        <ToastContainer />
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
                        onClick={submitForms}
                        loads={
                            registerAccountNumberLoad ||
                            registerCardLoad ||
                            authOmniliteLoad ||
                            authEcobankLoad
                        }
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
