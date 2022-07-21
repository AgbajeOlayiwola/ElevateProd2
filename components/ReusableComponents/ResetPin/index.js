import React, { useState, useRef, useEffect } from 'react';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import CloseBtnSvg from '../ClosebtnSvg';
import Visbility from '../Eyeysvg';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const ResetPin = ({ overlay, title, label1, label2, action, formAction }) => {
    const {
        // register,
        handleSubmit
        // formState: { errors }
    } = useForm();
    const [activeBtn, setActiveBtn] = useState(false);
    const types = (type) => {
        setOutType(type);
    };
    const [outType, setOutType] = useState();
    const [count, setCount] = useState([]);
    const [counts, setCounts] = useState([]);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        if (password != confPassword) {
            setPasswordMatch('Passwords do not match');
        }
    };
    const handlePwd = (e) => {
        setCount(e.target.value.length);
        setPassword(e.target.value);
    };
    const handlePin = (e) => {
        setCounts(e.target.value.length);
        setActiveBtn(true);
    };

    // const onSubmit = async (data) => {
    //     console.log(data);
    // };
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    return (
        <Popup overlay={overlay} action={action} title={title}>
            <form onSubmit={handleSubmit(formAction)} ref={myref}>
                <div className={styles.formGroup}>
                    <label>{label1}</label>
                    <div>
                        <input
                            placeholder="******"
                            required
                            type={outType ? 'text' : 'password'}
                            onChange={handlePwd}
                        />
                        <Visbility color="green" typeSet={types} />
                    </div>
                    {count <= 0 || count >= 6 ? null : (
                        <p className={styles.error}>
                            Minimum Password length is 6 Characters
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>{label2}</label>
                    <div>
                        <input
                            placeholder="******"
                            required
                            type={outType ? 'text' : 'password'}
                            onChange={handlePaswword}
                        />
                        <Visbility typeSet={types} />
                    </div>
                    {password == confPassword ? null : (
                        <p className={styles.error}>{passwordMatch}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>Enter Transaction Pin</label>
                    <div>
                        <input
                            placeholder="******"
                            required
                            type={outType ? 'text' : 'password'}
                            onChange={handlePin}
                        />
                        <Visbility typeSet={types} />
                    </div>
                    {counts <= 0 || counts >= 8 ? null : (
                        <p className={styles.error}>
                            Minimum Transaction Pin is 8 Characters
                        </p>
                    )}
                </div>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Update"
                    type="submit"
                    onClick={formAction}
                />
            </form>
        </Popup>
    );
};

export default ResetPin;
