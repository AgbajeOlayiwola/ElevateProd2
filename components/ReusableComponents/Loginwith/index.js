import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonComp from '../Button';
import Visbility from '../Eyeysvg';
import styles from './styles.module.css';
import Link from 'next/link';

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
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(false);
    const [active, setActive] = useState(false);
    const [number, setNumber] = useState('');

    return (
        <form>
            <div className={styles.Log}>
                {/* omnilite part  */}

                {/* register your input into the hook by invoking the "register" function */}
                <div>
                    <label>{labelI}</label>
                    <br />
                    <input
                        placeholder={placeholderI}
                        className={styles.idInput}
                    />
                </div>
                {/* bank details only */}
                <div className={bankdets ? styles.shows : styles.noShow}>
                    <label>Expiry Date</label>
                    <br />
                    <input
                        placeholder=""
                        className={styles.passwordInput}
                        type="month"
                    />
                </div>
                <div className={styles.cvvCode}>
                    <div className={bankdets ? styles.shows : styles.noShow}>
                        <label>CVV</label>
                        <br />
                        <input
                            placeholder="CVV"
                            className={styles.passwordInput}
                            maxLength="3"
                            type="password"
                            value={number}
                            onChange={(event) => {
                                if (event.target.value.length == 3)
                                    return false; //limits to 10 digit entry
                                setNumber(event?.target.value); //saving input to state
                            }}
                        />
                    </div>
                </div>
                {/* end  */}
                {/* include validation with required or other standard HTML validation rules */}
                <div className={displayInput ? styles.noShow : styles.show}>
                    <input
                        placeholder={placeholderII}
                        className={styles.passwordInput}
                        required
                        type={outType ? 'text' : 'password'}
                        onChange={(e) => setCount(e.target.value.length)}
                    />

                    <Visbility typeSet={types} />
                </div>
                {count <= 1 || count >= 8 ? null : (
                    <p className={styles.error}>
                        Minimum Password length is 8 Characters
                    </p>
                )}
            </div>

            <div className={styles.terms}>
                <input
                    type="checkbox"
                    className={styles.termcondition}
                    defaultChecked={active}
                    onClick={() => setActiveBtn(!activeBtn)}
                />
                <label>
                    I agree with Ellevate App
                    <Link href="#">
                        <span className={styles.termss}>
                            {' '}
                            Terms and Conditions
                        </span>
                    </Link>
                </label>
            </div>

            <Link href="/Onboarding/ExistingProfileSetup">
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Login"
                    type="submit"
                />
            </Link>
        </form>
    );
};

export default LoginWith;
