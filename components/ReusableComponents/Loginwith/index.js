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
    console.log(displayInput);
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
                        <Image
                            src="/Assets/Images/omni.png"
                            width={30}
                            height={30}
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
                            <Image
                                src="/Assets/Images/ecobank.png"
                                width={30}
                                height={30}
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
                        <svg
                            width="33"
                            height="33"
                            viewBox="0 0 33 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0.105469"
                                y="0.195312"
                                width="32"
                                height="32"
                                rx="16"
                                fill="#BABABA"
                            />
                            <path
                                d="M16.4797 13.2104C16.6653 13.2104 16.8432 13.1367 16.9744 13.0055C17.1056 12.8743 17.1793 12.6964 17.1793 12.5108C17.1793 12.3253 17.1056 12.1474 16.9744 12.0162C16.8432 11.885 16.6653 11.8113 16.4797 11.8113C16.2942 11.8113 16.1163 11.885 15.9851 12.0162C15.8539 12.1474 15.7802 12.3253 15.7802 12.5108C15.7802 12.6964 15.8539 12.8743 15.9851 13.0055C16.1163 13.1367 16.2942 13.2104 16.4797 13.2104ZM17.1662 9.90392C16.9722 9.74624 16.7298 9.66016 16.4797 9.66016C16.2297 9.66016 15.9873 9.74624 15.7933 9.90392L11.1279 13.6954C10.5608 14.158 10.8872 15.0758 11.6185 15.0758H11.8162V18.9932C11.2622 19.2758 10.8835 19.8512 10.8835 20.5163V21.1384C10.8835 21.2621 10.9326 21.3807 11.0201 21.4681C11.1075 21.5556 11.2262 21.6047 11.3499 21.6047H21.6096C21.7333 21.6047 21.8519 21.5556 21.9394 21.4681C22.0269 21.3807 22.076 21.2621 22.076 21.1384V20.5163C22.076 19.8522 21.6973 19.2758 21.1433 18.9932V15.0758H21.341C22.0723 15.0758 22.3987 14.1571 21.8307 13.6954L17.1671 9.90299L17.1662 9.90392ZM16.3827 10.6277C16.4105 10.6053 16.445 10.5931 16.4807 10.5931C16.5163 10.5931 16.5509 10.6053 16.5786 10.6277L20.9017 14.1431H12.0568L16.3827 10.6268V10.6277ZM20.2106 18.8066H19.2779V15.0758H20.2106V18.8066ZM18.3452 18.8066H16.9461V15.0758H18.3452V18.8066ZM16.0134 18.8066H14.6143V15.0758H16.0134V18.8066ZM20.3663 19.7393C20.7954 19.7393 21.1433 20.0872 21.1433 20.5163V20.672H11.8162V20.5163C11.8162 20.0872 12.1641 19.7393 12.5932 19.7393H20.3663ZM13.6816 18.8066H12.7489V15.0758H13.6816V18.8066Z"
                                fill="white"
                            />
                        </svg>
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
                        <svg
                            width="33"
                            height="33"
                            viewBox="0 0 33 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0.839844"
                                y="0.195312"
                                width="32"
                                height="32"
                                rx="16"
                                fill="#BABABA"
                            />
                            <path
                                d="M20.9365 12.7555C21.1234 12.7555 21.3027 12.8298 21.4349 12.9619C21.567 13.0941 21.6413 13.2733 21.6413 13.4602V19.0981C21.6413 19.285 21.567 19.4642 21.4349 19.5964C21.3027 19.7286 21.1234 19.8028 20.9365 19.8028H12.4798C12.2929 19.8028 12.1136 19.7286 11.9815 19.5964C11.8493 19.4642 11.775 19.285 11.775 19.0981V13.4602C11.775 13.2733 11.8493 13.0941 11.9815 12.9619C12.1136 12.8298 12.2929 12.7555 12.4798 12.7555H20.9365ZM12.4798 12.0508C12.106 12.0508 11.7475 12.1993 11.4831 12.4636C11.2188 12.7279 11.0703 13.0864 11.0703 13.4602V19.0981C11.0703 19.4719 11.2188 19.8304 11.4831 20.0947C11.7475 20.359 12.106 20.5075 12.4798 20.5075H20.9365C21.3103 20.5075 21.6688 20.359 21.9332 20.0947C22.1975 19.8304 22.346 19.4719 22.346 19.0981V13.4602C22.346 13.0864 22.1975 12.7279 21.9332 12.4636C21.6688 12.1993 21.3103 12.0508 20.9365 12.0508H12.4798Z"
                                fill="white"
                            />
                            <path
                                d="M12.4805 14.5164C12.4805 14.423 12.5176 14.3333 12.5837 14.2673C12.6498 14.2012 12.7394 14.1641 12.8328 14.1641H14.2423C14.3357 14.1641 14.4254 14.2012 14.4915 14.2673C14.5575 14.3333 14.5947 14.423 14.5947 14.5164V15.2212C14.5947 15.3146 14.5575 15.4042 14.4915 15.4703C14.4254 15.5364 14.3357 15.5735 14.2423 15.5735H12.8328C12.7394 15.5735 12.6498 15.5364 12.5837 15.4703C12.5176 15.4042 12.4805 15.3146 12.4805 15.2212V14.5164ZM12.4805 16.6306C12.4805 16.5372 12.5176 16.4475 12.5837 16.3815C12.6498 16.3154 12.7394 16.2783 12.8328 16.2783H16.3565C16.4499 16.2783 16.5396 16.3154 16.6056 16.3815C16.6717 16.4475 16.7088 16.5372 16.7088 16.6306C16.7088 16.7241 16.6717 16.8137 16.6056 16.8798C16.5396 16.9459 16.4499 16.983 16.3565 16.983H12.8328C12.7394 16.983 12.6498 16.9459 12.5837 16.8798C12.5176 16.8137 12.4805 16.7241 12.4805 16.6306ZM12.4805 18.0401C12.4805 17.9466 12.5176 17.857 12.5837 17.7909C12.6498 17.7248 12.7394 17.6877 12.8328 17.6877H13.5376C13.631 17.6877 13.7206 17.7248 13.7867 17.7909C13.8528 17.857 13.8899 17.9466 13.8899 18.0401C13.8899 18.1335 13.8528 18.2232 13.7867 18.2892C13.7206 18.3553 13.631 18.3924 13.5376 18.3924H12.8328C12.7394 18.3924 12.6498 18.3553 12.5837 18.2892C12.5176 18.2232 12.4805 18.1335 12.4805 18.0401ZM14.5947 18.0401C14.5947 17.9466 14.6318 17.857 14.6979 17.7909C14.7639 17.7248 14.8536 17.6877 14.947 17.6877H15.6518C15.7452 17.6877 15.8348 17.7248 15.9009 17.7909C15.967 17.857 16.0041 17.9466 16.0041 18.0401C16.0041 18.1335 15.967 18.2232 15.9009 18.2892C15.8348 18.3553 15.7452 18.3924 15.6518 18.3924H14.947C14.8536 18.3924 14.7639 18.3553 14.6979 18.2892C14.6318 18.2232 14.5947 18.1335 14.5947 18.0401ZM16.7088 18.0401C16.7088 17.9466 16.746 17.857 16.8121 17.7909C16.8781 17.7248 16.9678 17.6877 17.0612 17.6877H17.7659C17.8594 17.6877 17.949 17.7248 18.0151 17.7909C18.0812 17.857 18.1183 17.9466 18.1183 18.0401C18.1183 18.1335 18.0812 18.2232 18.0151 18.2892C17.949 18.3553 17.8594 18.3924 17.7659 18.3924H17.0612C16.9678 18.3924 16.8781 18.3553 16.8121 18.2892C16.746 18.2232 16.7088 18.1335 16.7088 18.0401ZM18.823 18.0401C18.823 17.9466 18.8602 17.857 18.9262 17.7909C18.9923 17.7248 19.082 17.6877 19.1754 17.6877H19.8801C19.9736 17.6877 20.0632 17.7248 20.1293 17.7909C20.1954 17.857 20.2325 17.9466 20.2325 18.0401C20.2325 18.1335 20.1954 18.2232 20.1293 18.2892C20.0632 18.3553 19.9736 18.3924 19.8801 18.3924H19.1754C19.082 18.3924 18.9923 18.3553 18.9262 18.2892C18.8602 18.2232 18.823 18.1335 18.823 18.0401Z"
                                fill="white"
                            />
                        </svg>
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
