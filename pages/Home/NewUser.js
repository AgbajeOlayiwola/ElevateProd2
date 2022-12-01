import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { ButtonComp } from '../../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '../../redux/actions/actions';
import Link from 'next/link';
import Loader from '../../components/ReusableComponents/Loader';
import { encrypt } from '../../redux/helper/hash';
import validator from 'validator';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import { useRouter } from 'next/router';
import InputTag from '../../components/ReusableComponents/Input';
import Modal from 'react-modal';
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

const NewUser = ({ selectCountry }) => {
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

    const router = useRouter();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [preferredName, setPname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [outTyped, setOutTyped] = useState();
    const [activeBtn, setActiveBtn] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState('');
    const [symbol, setSymbol] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [loads, setLoads] = useState(false);
    const { user, errorMessage } = useSelector((state) => state.registered);
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        if (password != confirmPassword) {
            setPasswordMatch('Passwords do not match');
        }
    };
    const handlePwd = (e) => {
        setCount(e.target.value.length);

        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 0,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 1
            })
        ) {
            setSymbol(true);
        } else {
            setSymbol(false);
        }
        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 0,
                minLowercase: 0,
                minUppercase: 1,
                minNumbers: 0,
                minSymbols: 0
            })
        ) {
            setUppercase(true);
        } else {
            setUppercase(false);
        }

        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 0,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0
            })
        ) {
            setNumbers(true);
        } else {
            setNumbers(false);
        }

        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        ) {
            setErrorMessages(' Strong');
        } else if (
            validator.isStrongPassword(e.target.value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0
            })
        ) {
            setErrorMessages('Medium');
        } else {
            setErrorMessages('Weak');
        }
        setPassword(e.target.value);
        if (e.target.value === '') {
            setErrorMessages('');
        }
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const userName = (e) => {
        setPname(e.target.value);
        //console.logpName);
    };
    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        //console.logdata);
        if (selectCountry === '') {
            setError('Choose a country');
        } else {
            window.localStorage.setItem(
                'country',
                JSON.stringify(selectCountry)
            );
        }
        setError('');
        if (
            password === confirmPassword &&
            symbol === true &&
            numbers === true
        ) {
            setLoads((prev) => !prev);
            const postData = {
                preferredName,
                email,
                password,
                confirmPassword,
                affiliateCode: 'ENG'
            };
            setLoading(true);
            //console.logerrorMessage);
            dispatch(createUserAction(postData));
        } else {
            passwordMatch;
        }
    };
    const sentSIgnUp = () => {
        //console.logerrorMessage);
        if (errorMessage !== null) {
            setError(errorMessage);
            setLoading(false);
        } else if (user == 'User registered successfully') {
            router.push('../Verify/Loading');
        }
    };
    useEffect(() => {
        sentSIgnUp();
    }, [errorMessage, user]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formTag}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.homeForm}>
                <div className={styles.secondSectionMidCountry}>
                    <label htmlFor="">Preferred Name</label>
                    <input
                        type="text"
                        {...register('userName', {
                            required: 'Preferred name  is required',
                            pattern: {
                                value: /^[A-Za-z ]+$/i,
                                message: 'Only Alphabelts allowed'
                            }
                        })}
                        onInput={userName}
                        value={preferredName}
                        placeholder="Preferred Name"
                    />
                    {/* <InputTag
                        label="Preferred Name"
                        placeholder="Preferred Name"
                        type="text"
                        pattern={{
                            value: /^[A-Za-z ]+$/i,
                            message: 'Only Alphabelts allowed'
                        }}
                        value={preferredName}
                        action={userName}
                    /> */}
                    {errors.userName ? (
                        <p className={styles.error}>
                            {errors.userName?.message}
                        </p>
                    ) : null}
                </div>
                <div className={styles.secondSectionMidYes}>
                    <label htmlFor="">Email Address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                        onInput={handleEmail}
                        value={email}
                        placeholder="Enter your Email"
                    />
                    <p className={styles.error}>{errors.email?.message}</p>
                </div>
            </div>
            <div className={styles.homeForm}>
                <div className={styles.secondSectionMidCountry}>
                    <label htmlFor="">Password</label>
                    <div className={styles.divs}>
                        <input
                            type={outType ? 'text' : 'password'}
                            placeholder="Enter Password"
                            onInput={handlePwd}
                        />
                        <Visbility typeSet={types} />
                    </div>
                    {errorMessages === '' ? null : (
                        <div className={styles.errorCont}>
                            <div
                                className={
                                    errorMessages === 'Strong'
                                        ? styles.strong
                                        : errorMessages === 'Medium'
                                        ? styles.medium
                                        : errorMessages === 'Weak'
                                        ? styles.errors
                                        : styles.strong
                                }
                            >
                                <p>{errorMessages}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.secondSectionMidYes}>
                    <label htmlFor="">Confirm Password</label>
                    <div className={styles.divs}>
                        <input
                            placeholder="Enter Password "
                            type={outTyped ? 'text' : 'password'}
                            onChange={handlePaswword}
                        />
                        <Visbility typeSet={typed} />
                    </div>
                    {password == confirmPassword ? null : (
                        <>
                            <p className={styles.error}>{passwordMatch}</p>
                            <div className={styles.sameErroSize}>
                                <p
                                    className={
                                        numbers ? styles.success : styles.error
                                    }
                                >
                                    Password should contain atleast 1 number
                                </p>
                                <p
                                    className={
                                        symbol ? styles.success : styles.error
                                    }
                                >
                                    Password should contain at least 1 special
                                    character
                                </p>
                                <p
                                    className={
                                        uppercase
                                            ? styles.success
                                            : styles.error
                                    }
                                >
                                    Password should contain at least 1 Uppercase
                                    character
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Terms And Condition
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean ac lacus posuere, imperdiet metus vitae, ultricies
                    ipsum. Integer interdum sit amet massa nec egestas. Donec
                    fermentum massa et leo molestie malesuada. Sed at vestibulum
                    mauris. Praesent et fermentum mi. Morbi sed augue sit amet
                    sapien fringilla varius. Quisque sed tempus tellus.
                    Curabitur ullamcorper quam eget sagittis facilisis.
                    Phasellus rhoncus rutrum blandit. In venenatis convallis
                    purus non malesuada. Maecenas vehicula dolor eget purus
                    ullamcorper, id luctus justo aliquet. Quisque vel ante at
                    enim cursus laoreet scelerisque quis mauris. Nullam tortor
                    tellus, tincidunt nec erat vel, consequat bibendum dui. In
                    vehicula sit amet nisi sed tristique. Morbi sit amet tempor
                    tellus. Maecenas dictum commodo sapien, sit amet venenatis
                    dolor porttitor condimentum. Proin vitae felis eros. Mauris
                    imperdiet ipsum ac euismod pretium. Sed eget dignissim arcu.
                    Fusce sed urna justo. Aliquam erat volutpat. Pellentesque
                    non dictum tellus. Nullam congue efficitur scelerisque. Duis
                    lacinia, dui ac ultricies luctus, tellus erat finibus
                    libero, sit amet iaculis arcu massa at est. Vestibulum ante
                    ipsum primis in faucibus orci luctus et ultrices posuere
                    cubilia curae; Aenean iaculis magna vitae massa dignissim,
                    eget sagittis urna ullamcorper. Suspendisse et lorem non
                    odio imperdiet auctor sit amet eget mi. Vivamus in sem
                    porttitor, efficitur augue nec, pellentesque odio. Quisque
                    at cursus nunc, pellentesque consequat ex. Cras sed justo
                    vehicula, aliquet tellus id, dapibus velit. Aliquam erat
                    volutpat. Suspendisse vel sapien mattis, vulputate justo
                    vitae, aliquam magna. Pellentesque porta erat nec libero
                    interdum, imperdiet sodales erat tempor. In pharetra dui id
                    quam vulputate, vitae porttitor ex aliquam. Vivamus
                    sollicitudin sed magna eget sodales. Vivamus et orci vitae
                    neque bibendum accumsan. Aliquam ex tellus, scelerisque eget
                    enim et, fermentum mollis risus. Nullam vitae facilisis
                    nibh. Sed sodales fringilla euismod. Duis sed tempor turpis.
                    Quisque odio lacus, malesuada sed auctor quis, rutrum quis
                    felis. Curabitur non massa dapibus, porta purus vitae,
                    egestas odio. Nullam et elit mi. Pellentesque vel risus eu
                    sapien suscipit efficitur. Sed mattis diam non diam gravida
                    aliquam. Duis vestibulum nulla nulla, et cursus metus
                    euismod eget. Nulla mollis metus elit, non ultricies quam
                    ultrices ut. Cras vitae purus nisl. In condimentum nisl
                    quam, vitae elementum urna commodo pharetra. Duis
                    sollicitudin sapien eu nibh bibendum, id bibendum augue
                    blandit. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Ut purus augue, cursus ac velit ut, convallis
                    maximus sapien. Fusce vehicula sodales cursus. Fusce pretium
                    accumsan augue, ac condimentum lectus luctus quis.
                    Vestibulum vel ex luctus, faucibus lacus et, sodales enim.
                    Curabitur accumsan sapien lacus, sed maximus lectus
                    venenatis ut. Sed pretium elit ut enim gravida, quis dictum
                    lorem accumsan. Fusce ultrices sed nisl vel lacinia. Nam
                    tristique elit quis laoreet porttitor. Quisque porttitor
                    suscipit nisl, vel hendrerit nibh pulvinar aliquam. Proin
                    tempus, quam vel aliquet euismod, turpis massa varius quam,
                    vel iaculis felis leo eu metus. Nulla quam odio, suscipit
                    vel est et, semper faucibus ex. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla pellentesque nisl eu metus accumsan
                    feugiat. Phasellus commodo a nibh at blandit. Nam nisi nibh,
                    consectetur a lectus nec, fringilla mollis orci. Nam
                    elementum, ante vitae mattis venenatis, metus elit faucibus
                    odio, eget hendrerit massa risus et neque. Nam facilisis
                    sapien sit amet sapien dictum dictum. Ut in ipsum maximus,
                    finibus ligula ac, finibus neque. Integer suscipit vulputate
                    interdum. Aliquam volutpat lorem quis magna commodo, vel
                    fringilla tellus faucibus. Sed dignissim urna in lacus
                    pharetra, nec eleifend ante scelerisque. Nam mollis metus
                    velit, vel porta metus elementum lobortis. Maecenas et lacus
                    rhoncus, semper ante ac, egestas leo. Maecenas aliquet
                    feugiat sapien, in condimentum eros sollicitudin efficitur.
                    Ut egestas metus semper nibh dictum consectetur. Donec at
                    convallis ex. Curabitur suscipit ornare scelerisque.
                    Maecenas sed accumsan diam. Duis facilisis dolor ut nisl
                    rhoncus scelerisque. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Maecenas in varius neque, eu
                    bibendum tortor. Donec vel tempus odio, tincidunt rutrum
                    magna. Fusce pharetra eu eros et ultricies. Nunc quam ex,
                    tempus at lorem ut, scelerisque vulputate lorem. Nam
                    suscipit nisi eros. Maecenas ut sodales arcu. Nulla
                    facilisi. Aliquam turpis erat, rhoncus quis suscipit sed,
                    molestie sed ante. Morbi elit magna, convallis sit amet
                    maximus eget, elementum eu ipsum. Etiam varius sapien velit,
                    ut sagittis lacus dapibus sollicitudin. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Pellentesque a diam
                    auctor, lobortis lorem sit amet, sagittis odio. Mauris
                    malesuada tincidunt magna, tristique convallis lacus
                    volutpat quis. Cras vel dignissim augue. Integer porta nulla
                    nisi. In pellentesque fermentum malesuada. Sed laoreet,
                    nulla a fringilla scelerisque, nisl mauris maximus lectus,
                    eu porta turpis ex facilisis ante. In nibh orci, pharetra
                    vel erat at, malesuada feugiat arcu. Aenean elementum urna
                    non elit fringilla fringilla. Mauris magna augue, volutpat
                    vitae sodales nec, dapibus quis nisl. Etiam pulvinar diam
                    vitae cursus condimentum. Fusce ut purus blandit, cursus
                    quam in, aliquet quam. Aenean quis enim vitae est pulvinar
                    rutrum. Morbi varius elit in ultrices tempor. Ut vel aliquam
                    dui. Cras ac fringilla lorem, quis posuere leo. Nullam
                    dapibus rutrum tellus eget vestibulum. Quisque dignissim
                    auctor sodales. Ut tincidunt dictum tellus, quis dapibus
                    eros auctor id. Etiam mattis tortor bibendum enim blandit,
                    et condimentum erat aliquam. In vel auctor ante, eget luctus
                    ligula. Quisque eget tellus enim. In ac quam tristique,
                    tincidunt massa et, euismod metus. Curabitur feugiat
                    porttitor augue sed elementum. Pellentesque at nulla urna.
                    Curabitur diam eros, convallis vel faucibus non, pulvinar eu
                    metus. Quisque feugiat condimentum faucibus. Pellentesque
                    euismod tincidunt pellentesque. Donec consequat lacus
                    aliquet sapien laoreet aliquet. Nullam nibh neque, ornare
                    non pulvinar eget, interdum sit amet diam. Fusce ultrices
                    felis ac massa egestas, sed placerat metus ultricies.
                    Aliquam nec massa condimentum, sollicitudin nunc in, tempor
                    leo. Curabitur non metus vel nibh efficitur suscipit. Aenean
                    gravida eu ex nec semper. Maecenas blandit neque nibh, vel
                    tempus purus posuere rutrum. Curabitur non magna sed leo
                    dignissim tempus at sed lacus. Fusce rhoncus malesuada ipsum
                    in eleifend. Mauris imperdiet elit augue, fringilla volutpat
                    risus facilisis eu. Duis mattis mi viverra mauris aliquet,
                    quis finibus dolor mollis. In sodales felis non sodales
                    vehicula. Interdum et malesuada fames ac ante ipsum primis
                    in faucibus. Phasellus imperdiet felis sed erat egestas
                    mollis. Suspendisse id enim vel lorem sollicitudin blandit.
                    In hac habitasse platea dictumst. Ut libero est, porta et
                    est mattis, ornare posuere dui. Mauris accumsan eleifend
                    dui, vel iaculis justo congue at. Vivamus ac ornare arcu.
                    Suspendisse accumsan volutpat accumsan. Nulla urna tellus,
                    rutrum varius ornare et, hendrerit vel nisi. Sed gravida
                    pellentesque purus, ut faucibus ipsum varius id. Mauris
                    mattis efficitur tristique. Praesent mollis pulvinar dui, ac
                    pulvinar purus tristique ut. Nunc efficitur massa non sapien
                    dapibus auctor. Nunc eget lectus in urna accumsan
                    consectetur non eleifend ipsum. Suspendisse potenti. Donec
                    porttitor, neque vitae vehicula cursus, augue lectus
                    scelerisque ipsum, nec tristique odio odio et est. Nunc
                    egestas mollis eros, sit amet viverra neque pulvinar vitae.
                    Nulla eu nisl dui. In bibendum facilisis diam, vel molestie
                    nisi fermentum nec. Nullam enim ex, semper ac vehicula a,
                    pharetra nec arcu. Nulla fringilla auctor ex vel bibendum.
                    Duis non lacus sit amet ex feugiat convallis. Duis rutrum
                    nulla eros, in laoreet augue pulvinar vel. Proin id
                    fringilla metus, ut commodo nibh. Aenean ut elit in metus
                    efficitur vestibulum. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Nunc eros erat, ornare ut luctus
                    vitae, pulvinar eget ex. Fusce quam enim, hendrerit ut
                    consequat et, dictum sed lectus. Sed et purus eu sem posuere
                    sodales. Proin cursus velit ut porta varius. Sed sed posuere
                    lacus. Fusce mauris justo, faucibus a magna sed, suscipit
                    tristique libero. Fusce sit amet suscipit sem. Nullam elit
                    lacus, dictum a ex varius, elementum imperdiet leo.
                    Curabitur accumsan turpis ut hendrerit lacinia. Praesent
                    rhoncus egestas magna ut efficitur. Suspendisse non
                    hendrerit eros. Mauris fringilla semper arcu, at posuere
                    diam posuere eu. Vestibulum at dui ut dolor cursus hendrerit
                    sit amet mattis magna. Proin tempor sollicitudin tincidunt.
                    Suspendisse et lacinia nulla. Proin et diam quis purus
                    rhoncus posuere. Praesent a porta tortor. Quisque porttitor,
                    lacus et porta consequat, lorem massa condimentum purus, sit
                    amet facilisis libero dui sit amet risus. Mauris vitae erat
                    eget metus feugiat convallis id quis quam. Vestibulum ante
                    ipsum primis in faucibus orci luctus et ultrices posuere
                    cubilia curae; Fusce ac odio vel dui porta dictum in at
                    augue. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Donec lorem quam, venenatis in dolor in, blandit
                    condimentum mauris. Proin at interdum sem, a porta dui. Sed
                    id augue dignissim, tincidunt risus a, commodo mi. Nulla
                    condimentum lacinia enim nec pharetra. Sed ut augue dolor.
                    Nam pulvinar augue velit, vitae congue tortor dictum vitae.
                    Aliquam porttitor ante quam. Morbi at metus efficitur,
                    sodales elit ac, faucibus justo. Nunc pharetra dolor id diam
                    dignissim, et convallis nulla congue. Nullam iaculis
                    faucibus tortor, eget dapibus ante tempus vel. Aliquam
                    sodales, enim et vestibulum tempus, felis dolor malesuada
                    massa, id ultricies ipsum dui non ligula. Cras pharetra
                    massa in nunc fermentum, eu pharetra risus rhoncus. Maecenas
                    ornare commodo est sed ultrices. In ac commodo tellus. Orci
                    varius natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Nunc scelerisque tellus vel risus
                    hendrerit, a congue est viverra. Morbi hendrerit faucibus
                    ante quis lobortis. Maecenas condimentum urna sollicitudin
                    nisi venenatis, malesuada pharetra erat pellentesque. Morbi
                    iaculis aliquet mi, ut mollis turpis molestie et. Nullam a
                    felis euismod, facilisis lacus in, sagittis metus. Duis id
                    purus dui. Maecenas eget enim et elit ornare semper id ac
                    nisi. Aenean lacinia risus non elit condimentum facilisis.
                    Praesent a dapibus metus. Integer fermentum ligula quis ante
                    mollis, at pretium enim porttitor. Duis nec quam rhoncus,
                    rutrum sapien a, ullamcorper ipsum. Maecenas pulvinar
                    efficitur arcu sed scelerisque. Aenean malesuada velit est.
                    Aliquam laoreet vel dolor non auctor. Curabitur tristique
                    tincidunt laoreet. Nam pharetra, magna non facilisis tempor,
                    sem lacus egestas dui, ac semper elit metus ut augue.
                    Vestibulum cursus arcu metus, ut tempus leo vehicula et.
                    Praesent auctor orci elit. Quisque pharetra eros augue, a
                    ultrices ligula vestibulum in. Nunc finibus finibus nulla,
                    in facilisis orci sodales eget. Ut venenatis interdum mi, id
                    finibus felis pellentesque id. Vestibulum facilisis erat
                    elit, ut varius felis eleifend ac. Vivamus quis risus
                    bibendum risus commodo elementum vel at nibh. Pellentesque
                    vehicula, quam ut porta auctor, ipsum ex tempus dolor, non
                    congue nisl mi eget purus. Integer accumsan mattis varius.
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Donec id malesuada ante, vel
                    hendrerit neque. Donec malesuada ligula arcu, eu rutrum mi
                    lacinia eu. Sed pulvinar metus tellus, ut porta nunc
                    tincidunt vel. Mauris dignissim egestas mauris, ut fermentum
                    nisl molestie ac. Vestibulum ullamcorper lorem in purus
                    maximus, at vulputate metus commodo. Donec vel mattis
                    tortor. Nullam non tincidunt ex. Cras congue mauris ut nisl
                    fermentum tincidunt. Donec a suscipit ipsum, vel blandit
                    nisi. Fusce faucibus magna nisi, nec rutrum quam mattis
                    vitae
                </p>
            </Modal>
            <div className={styles.secondSectionMidCountry}>
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
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Create account"
                    type="submit"
                    loads={loads}
                    err={errorMessage}
                />

                <p className={styles.already}>
                    Already have an account?{' '}
                    <Link href="../Auth/Login">
                        <span>Sign in</span>
                    </Link>
                </p>
            </div>
        </form>
    );
};
export default NewUser;
