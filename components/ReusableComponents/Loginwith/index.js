import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ButtonComp from '../Button';
import Visbility from '../Eyeysvg';
import styles from './styles.module.css';
import Link from 'next/link';
import Omnilite from './omnilite';
import Ecoacct from './ecoacct';
import Ecocard from './ecocard';
import Ecoonline from './ecoonline';

const LoginWith = ({
    display,
    labelI,
    labelII,
    placeholderI,
    placeholderII,
    displayInput,
    bankdets,
    type
}) => {
    //console.log(displayInput);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = ({ data }) => {
        router.push('../Verify');
    };

    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const [bgcolor, setBgcolor] = useState(false);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [active, setActive] = useState(false);
    const [number, setNumber] = useState('');

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <Omnilite />;
            case 1:
                return <Ecoonline />;
            case 2:
                return <Ecoacct />;
            case 3:
                return <Ecocard />;
            default:
                return <Omnilite />;
        }
    };
    const omnilite = () => {
        setPage(0);
        setOmnilite(true);
        setEcobank(false);
        setCard(false);
        setAcct(false);
    };
    const ecobanks = () => {
        setPage(1);
        setOmnilite(false);
        setEcobank(true);
        setCard(false);
        setAcct(false);
    };
    const acctnum = () => {
        setPage(2);
        setOmnilite(false);
        setEcobank(false);
        setCard(false);
        setAcct(true);
    };
    const bankCard = () => {
        setPage(3);
        setOmnilite(false);
        setEcobank(false);
        setCard(true);
        setAcct(false);
    };
    // function handleSubmit() {
    //     setPage(page + 1);
    // }
    const [omnilit, setOmnilite] = useState(true);
    const [ecobank, setEcobank] = useState(false);
    const [acct, setAcct] = useState(false);
    const [card, setCard] = useState(false);

    return (
        <>
            <div className={styles.omnisets}>
                <div className={styles.cov}>
                    <div
                        className={omnilit ? styles.active : styles.notActive}
                        onClick={omnilite}
                    >
                        <img
                            src="/Assets/Images/omni.png"
                            width={45}
                            height={45}
                            alt="omnilite"
                        />
                    </div>
                    <p className={omnilit ? styles.activeName : styles.name}>
                        Omnilite
                    </p>
                </div>
                <div className={styles.cov}>
                    {' '}
                    <div
                        className={ecobank ? styles.active : styles.notActive}
                        onClick={ecobanks}
                    >
                        <div>
                            <img
                                src="/Assets/Images/ecobank.png"
                                width={45}
                                height={45}
                                alt="omnilite"
                            />
                        </div>
                    </div>
                    <p className={ecobank ? styles.activeName : styles.name}>
                        Ecobank Online
                    </p>
                </div>

                <div className={styles.cov}>
                    <div
                        className={acct ? styles.active : styles.notActive}
                        onClick={acctnum}
                    >
                        <img
                            src="/Assets/Images/AccountNum.png"
                            width={45}
                            height={45}
                            alt="AccountNumber"
                        />
                    </div>
                    <p className={acct ? styles.activeName : styles.name}>
                        Ecobank Account Number
                    </p>
                </div>
                <div className={styles.cov}>
                    <div
                        className={card ? styles.active : styles.notActive}
                        onClick={bankCard}
                    >
                        <img
                            src="/Assets/Images/Details.png"
                            width={45}
                            height={45}
                            alt="Details"
                        />
                    </div>
                    <p className={card ? styles.activeName : styles.name}>
                        Ecobank Debit Card
                    </p>
                </div>
            </div>
            {conditionalComponent()}
        </>
    );
};

// <form>
// <div className={styles.Log}>
//     {/* omnilite part  */}

//     {/* register your input into the hook by invoking the "register" function */}
//     <div>
//         <label>{labelI}</label>
//         <br />
//         <input
//             placeholder={placeholderI}
//             className={styles.idInput}
//         />
//     </div>
//     {/* bank details only */}
//     <div className={bankdets ? styles.shows : styles.noShow}>
//         <label>Expiry Date</label>
//         <br />
//         <input
//             placeholder=""
//             className={styles.passwordInput}
//             type="month"
//         />
//     </div>
//     <div className={styles.cvvCode}>
//         <div
//             className={bankdets ? styles.shows : styles.noShow}
//         >
//             <label>CVV</label>
//             <br />
//             <input
//                 placeholder="CVV"
//                 className={styles.passwordInput}
//                 maxLength="3"
//                 type="password"
//                 value={number}
//                 onChange={(event) => {
//                     if (event.target.value.length == 3)
//                         return false; //limits to 10 digit entry
//                     setNumber(event?.target.value); //saving input to state
//                 }}
//             />
//         </div>
//     </div>
//     {/* end  */}
//     {/* include validation with required or other standard HTML validation rules */}
//     <div className={displayInput ? styles.noShow : styles.show}>
//         <input
//             placeholder={placeholderII}
//             className={styles.passwordInput}
//             required
//             type={outType ? 'text' : 'password'}
//             onChange={(e) => setCount(e.target.value.length)}
//         />

//         <Visbility typeSet={types} />
//     </div>
//     {count <= 1 || count >= 8 ? null : (
//         <p className={styles.error}>
//             Minimum Password length is 8 Characters
//         </p>
//     )}
// </div>

// {/* <div className={styles.terms}>
// <input
//     type="checkbox"
//     className={styles.termcondition}
//     defaultChecked={active}
//     onClick={() => setActiveBtn(!activeBtn)}
// />
// <label>
//     I agree with Ellevate App
//     <Link href="#">
//         <span className={styles.termss}>
//             {' '}
//             Terms and Conditions
//         </span>
//     </Link>
// </label>
// </div> */}

// <Link href="/Onboarding/ExistingProfileSetup">
//     <ButtonComp
//         disabled={activeBtn}
//         active={activeBtn ? 'active' : 'inactive'}
//         text="Login"
//         type="submit"
//     />
// </Link>
// </form>

export default LoginWith;
