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
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
        transform: 'translate(-50%, -50%)',
        zIndex: 999999
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <Tooltip anchorId="my-element" />
            <div>
                <div className={styles.homeForm}>
                    <div className={styles.secondSectionMidCountry}>
                        <label
                            htmlFor=""
                            id="my-element"
                            data-tooltip-content="This is the name you will be known on the app with"
                        >
                            Preferred user name/alias
                        </label>
                        <input
                            type="text"
                            {...register('userName', {
                                required:
                                    'Preferred user name/alias  is required',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
                            onInput={userName}
                            value={preferredName}
                            placeholder="Preferred user name/alias"
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
                        <label htmlFor="">Create Password</label>
                        <div className={styles.divs}>
                            <input
                                type={outType ? 'text' : 'password'}
                                placeholder="Enter Password"
                                onInput={handlePwd}
                            />
                            <Visbility typeSet={types} input="input" />
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
                                type={outTyped ? 'password' : 'text'}
                                onChange={handlePaswword}
                            />
                            <Visbility typeSet={typed} input="input" />
                        </div>
                        {password == confirmPassword ? null : (
                            <>
                                <p className={styles.error}>{passwordMatch}</p>
                                <div className={styles.sameErroSize}>
                                    <p
                                        className={
                                            numbers
                                                ? styles.success
                                                : styles.error
                                        }
                                    >
                                        Password should contain atleast 1 number
                                    </p>
                                    <p
                                        className={
                                            symbol
                                                ? styles.success
                                                : styles.error
                                        }
                                    >
                                        Password should contain at least 1
                                        special character
                                    </p>
                                    <p
                                        className={
                                            uppercase
                                                ? styles.success
                                                : styles.error
                                        }
                                    >
                                        Password should contain at least 1
                                        Uppercase character
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
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

                    <div>
                        <p>
                            Please read this page carefully. It provides you
                            with important information about your Ecobank
                            account(s).
                        </p>
                        <h4>A. TERMS / SCOPE</h4>

                        <li>
                            The information contained on this page together with
                            any further instructions and conditions that may be
                            prescribed by the bank from time to time shall
                            constitute the terms of the agreement between the
                            customer and Ecobank. When this application form has
                            been signed, it will be deemed to have been accepted
                            as binding on the customer and the Ecobank
                            representative office or affiliate where the account
                            is held.
                        </li>
                        <li>
                            These conditions apply to each account opened under
                            the Account Opening Form or in any other acceptable
                            manner.
                        </li>
                        <li>
                            These conditions are supplemented and / or amended
                            for Accounts held in certain countries or
                            territories by local conditions (the “Local
                            Conditions”), which will be supplied to the Customer
                            by Ecobank and will be binding on the Customer and
                            Ecobank.
                        </li>
                        <li>
                            If there is a conflict between these conditions and
                            any Local Conditions, the Local Conditions prevail;
                            and if there is a conflict between these conditions
                            or any Local Conditions and any agreement relating
                            to a service or product provided to the Customer (a
                            “Service”), that agreement prevails.
                        </li>
                        <li>
                            The Customer will provide to Ecobank all documents
                            and other information reasonably required by it in
                            relation to any Account or any Service.
                        </li>
                        <h6>B. THE ACCOUNT</h6>
                        <li>
                            The Customer shall assume full responsibility for
                            the genuineness, correctness and validity of all
                            endorsements appearing on all means of payment,
                            orders, bills, notes, negotiable instruments,
                            receipts or other instructions deposited into the
                            account.
                        </li>
                        <li>
                            The Bank will not be responsible for any loss of
                            funds deposited with it arising from any future
                            Government order, law, levy, tax, embargo,
                            moratorium, exchange restriction or any other cause
                            beyond its control.
                        </li>
                        <li>
                            Your account shall be debited for any service charge
                            that is set by the Bank from time to time.
                        </li>
                        <li>
                            The Bank will not be liable for funds handed over to
                            members of its staff other than the Cashiers /
                            Tellers in the Bank’s premises with the appropriate
                            deposit slip. Any anomaly in the entries All notices
                            or letters will be sent to the physical, postal or
                            electronic address supplied by you and will be
                            considered duly delivered and received at the time
                            it is delivered or seven days after posting.
                        </li>
                        <li>
                            on your Bank statements must be brought to the
                            attention of the Bank within 30 days of the date
                            thereof and you agree that failure to give such
                            notice absolves the Bank from all liabilities
                            arising thereof.
                        </li>
                        <li>
                            The Bank may exercise its general lien or any
                            similar right it is entitled to including the right
                            to combine and consolidate all or any of the
                            Customer’s accounts with the Bank, and the right to
                            set off or transfer any sum or sums standing to the
                            credit of any one or more of such accounts against
                            liabilities in any other account.
                        </li>
                        <h6>C. INSTRUCTIONS</h6>
                        <li>
                            Ecobank may rely on the authority of each person
                            designated (in a form acceptable to Ecobank) by the
                            Customer to send Instructions or do any other thing
                            until Ecobank has received written notice or other
                            notice acceptable to it of any change from a duly
                            authorized person and Ecobank has had a reasonable
                            time to act (after which time it may rely on the
                            change).
                        </li>
                        <li>
                            Each of the Customer and Ecobank will comply with
                            certain agreed security procedures (the
                            “Procedures”) designed to verify the origination of
                            instructions between them such as enquiries, advices
                            and instructions.
                        </li>
                        <li>
                            Ecobank may decide not to act on an Instruction
                            where it reasonably doubts its contents,
                            authorization, origination or compliance with the
                            Procedures and will promptly notify the Customer (by
                            telephone if appropriate) of its decision.
                        </li>
                        <li>
                            If the Customer informs Ecobank that it wishes to
                            recall, cancel or amend an Instruction, Ecobank will
                            use its reasonable efforts to comply.
                        </li>
                        <li>
                            If Ecobank acts on any Instruction sent by any means
                            requiring manual intervention (such as telephone,
                            telex, telefax, electronic mail or disks sent by
                            messenger) then, if Ecobank complies with the
                            Procedures, the Customer will be responsible for any
                            loss Ecobank may incur in connection with that
                            Instruction.
                        </li>
                        <li>
                            The Customer irrevocably agrees that all
                            instructions and documentation issued to the Bank by
                            the Customer in any electronic form shall be binding
                            and enforceable against the Customer.
                        </li>
                        <li>
                            The Customer agrees to fully indemnify the Bank
                            against any expenses, claims or liabilities
                            whatsoever incurred by the Bank by reason of acting
                            on such instruction/documentation.
                        </li>
                        <li>
                            The Customer authorizes the Bank to set off any such
                            expenses incurred by it against any of the
                            Customer’s accounts with the Bank.
                        </li>
                        <h6>D. MEANS OF PAYMENT</h6>
                        <li>
                            The Bank is under no obligation to honour any means
                            of payment drawn on the account unless there are
                            sufficient funds in the account to cover the value
                            of the said means of payment and such means of
                            payment may be returned unpaid.
                        </li>
                        <li>
                            All means of payment or other orders signed by you
                            (or either or both of you if a joint account) will
                            be processed by the Bank and your account will be
                            debited for such means of payment whether such
                            account is for the time being in credit or overdrawn
                            or may become over-drawn in consequence of such
                            debit.
                        </li>
                        <li>
                            The Bank may exercise its discretion in allowing
                            withdrawals against uncleared means of payment(s)
                            where the means of payment are returned unpaid
                            thereafter, the Bank shall have the right to hold on
                            to the returned means of payment and take further
                            action it deems appropriate to recover the value of
                            the withdrawal from you. The Bank shall have the
                            right whenever it deems appropriate to confirm the
                            issuance of a means of payment drawn on the
                            Customer’s current account failing which the means
                            of payment may be returned with ‘Drawer’s
                            Confirmation Required’ endorsed thereon. You must
                            ensure that your means of payment are kept in a safe
                            place to prevent unauthorized persons from gaining
                            access to same as failure to do this, may be a
                            ground for any consequential loss being charged to
                            your account.
                        </li>
                        <li>
                            If your means of payment get lost, missing or stolen
                            you must notify the Bank immediately. The Bank shall
                            not be held liable for any unauthorized use of your
                            means of payment where the loss or otherwise of same
                            was not reported immediately.
                        </li>
                        <li>
                            Ecobank may supply checks, payments instruments and
                            related materials to the Customer and the Customer
                            will make reasonable efforts to avoid any fraud,
                            loss, theft, misuse or dishonor in respect of them.
                            The Customer will promptly notify Ecobank in writing
                            of the loss or theft of any check or payment
                            instrument and will return to Ecobank or destroy any
                            unused checks, payment instruments and related
                            materials when the relevant Account is closed.
                        </li>
                        <h6>E. OVERDRAWN ACCOUNTS</h6>
                        <li>
                            Overdraft may be available to customers upon
                            arrangement with the Bank. If you do not have such
                            arrangement, the Bank may in its discretion,
                            nonetheless honour a means of payment even though
                            such account may become overdrawn in consequence. In
                            such a case, the Customer agrees to repay the
                            overdraft within 7 days, and bear the extra fee and
                            interest at our current rate for unauthorized
                            borrowing for the period that the account remains in
                            debit. If your account does not have enough cleared
                            funds to cover an amount you want to draw, we
                            reserve the right to return your means of payment
                            unpaid.
                        </li>
                        <li>
                            The Bank reserves the right to use credit balances
                            on your current account (s) to offset any
                            outstanding exposures on any of your accounts.
                        </li>
                        <h6>F. STATEMENTS AND ADVICES</h6>
                        <li>
                            Statements and Advices can be delivered to the
                            Customer either physically, by post or
                            electronically (e-Statements or e-Alerts).
                        </li>
                        <li>
                            Where requested, the Bank may provide electronic
                            Statements or SMS-Alerts or other similar service to
                            provide information on transactions. The service is
                            provided ‘as available’ and without any warranty of
                            fitness for a specific purpose. We do not warrant
                            that this service will always be uninterrupted, or
                            that any information provided is accurate and
                            current as at the time it is received. The Bank
                            disclaims responsibility for the service provided by
                            any network provider. Irrespective of the channel
                            used to deliver the statement or advice, the
                            Customer will notify Ecobank in writing of anything
                            incorrect in a statement or advice promptly and in
                            any case within thirty (30) days from the date on
                            which the statement or advice is sent to the
                            Customer.
                        </li>
                        <h6>G. INTEREST, FEES AND OTHER AMOUNTS</h6>

                        <li>
                            You will be liable for the payment of interest
                            charges at the rate fixed by the Bank from time to
                            time for any outstanding debit on your current
                            account. Your current account may also be debited
                            for the Bank’s usual banking charges, interest,
                            commission, etc. Unless otherwise agreed, Ecobank
                            may modify at any time the rate of interest, fees or
                            other amount applicable to any Account or Service
                            (but subject to any legal requirement as to notice).
                        </li>
                        <li>
                            Neither the Customer nor Ecobank will be responsible
                            for any failure to perform any of its obligations
                            with respect to any Account if such performance
                            would result in it being in breach of any law,
                            regulation or other requirement of any government or
                            other authority in accordance with which it is
                            required to act or if its performance is prevented,
                            hindered or delayed by a Force Majeure Event; in
                            such case its obligations will be suspended, for so
                            long as the force Majeure Event continues (and, in
                            the case of Ecobank, no other representative office
                            or affiliate shall become liable). “Force Majeure
                            Event” means any event due to any cause beyond the
                            reasonable control of the relevant party, such as
                            restrictions on convertibility or transferability,
                            requisition, involuntary transfers, unavailability
                            of any system, sabotage, fire, flood, explosion,
                            acts of God, civil commotion, strikes or industrial
                            action of any kind, riots, insurrection, war or acts
                            of government.
                        </li>

                        <h6>I. SHARING OF INFORMATION</h6>
                        <li>
                            Ecobank will treat information relating to the
                            Customer as confidential, but (unless consent is
                            prohibited by law) the Customer consents to the
                            transfer and disclosure by Ecobank of any
                            information relating to the Customer to and between
                            the representative offices, affiliates and agents of
                            Ecobank and third parties selected by any of them,
                            whenever situated, for confidential use (including
                            in connection with the provision of any Service and
                            for data processing, statistical and risk analysis
                            purposes). Ecobank and any representative office,
                            affiliate, agent or third party may transfer and
                            disclose any such information as required by any
                            law, court, regulator or legal process.
                        </li>
                        <h6>J. CUSTOMER INFORMATION UPDATE</h6>
                        <li>
                            The Customer is required to notify the Bank of any
                            change in his/her/its personal or company
                            information for appropriate Bank update in line with
                            regulation. The update shall include but not limited
                            to contact information, information on travel(s)
                            outside Nigeria prior to or at the time of such
                            travel to ensure uninterrupted access to the account
                            in the Customer’s interest.
                        </li>
                        <h6>K. RESTRICTION ON THE ACCOUNT</h6>
                        <li>
                            The Customer irrevocably consents and agrees that,
                            the Bank may in its absolute discretion, if there is
                            a contending dispute in respect of the Account, or
                            if it reasonably suspects fraud or other irregular
                            practices in respect of the Account in whatever
                            manner or if based on a directive/Circular from the
                            Central Bank of Nigeria, or any law enforcement
                            agency, place a restriction on further operation of
                            the Account until such a time as it is reasonably
                            satisfied that such concern, suspicion no longer
                            exists. This is without prejudice to the Bank’s
                            right to close the Account. If a fraudulent activity
                            is associated with the operation of your account,
                            you agree that we have the right to apply
                            restrictions to your account and report to
                            appropriate law enforcement agencies.
                        </li>
                        <h6>L. ELECTRONIC MONITORING OR RECORDING</h6>
                        <li>
                            The customer and Ecobank consent to telephonic or
                            electronic monitorring recording for security and
                            quality of service purposes and agree that either
                            may produce telephonic recording or computer records
                            as evidence in any proceeding brought in connection
                            with these conditions or any local conditions.
                        </li>
                        <h6>M. CHANGE OF MANDATE</h6>
                        <li>
                            The customer must notify the Bank immediately of any
                            change in the address, directors, committee members,
                            trustees, designated members, secretaries. Any
                            modification of change in authorized signatories
                            must be signed in accordance with the existing
                            mandate and accompanied by a resolution to that
                            effect.
                        </li>
                        <h6>N. TERMINATION</h6>
                        <li>
                            Either party may terminate this agreement at any
                            time (but subject to any legal requirement as to
                            notice) by notifying the other in writing. On
                            closure of an Account, the termination becomes
                            effective after any means of payment drawn on the
                            account or outstanding on it have been paid; all
                            means of payments and cards issued to you have been
                            sent back to the Bank; and all information and
                            equipment supplied by Ecobank have been returned to
                            the Bank. Where the Bank is terminating the
                            agreement and your account is overdrawn, you must
                            pay all sums outstanding on the account otherwise
                            the Bank may take appropriate legal action for
                            recovery. All mandatory documentation should be
                            completed by the Customer within three (3) months of
                            opening the account. If you do not provide the
                            required document within three (3) months, the
                            account will be automatically closed after prior
                            notice to you.
                        </li>
                        <h6>O. JURISDICTION</h6>
                        <li>
                            In relation to any account these conditions and the
                            relevant Local Conditions are governed by the law of
                            the country or territory in which that account is
                            held.
                        </li>
                        <h6>P. DISCLAIMER CLAUSE</h6>
                        <li>
                            The bank disclaims liability for any funds / assets
                            deposited by you which are subsequently found to
                            have derived from illegal source or activities. You
                            confirm that the funds / assets deposited are not
                            derived from any illegal source or activities.
                        </li>
                        <h5>ELECTRONIC BANKING TERMS AND CONDITIONS</h5>
                        <h6>1. Definitions</h6>
                        <li>
                            “Customer” means a customer of Ecobank Nigeria
                            Limited (ENG) who has or operates an account with
                            the bank and is named in the application form,
                            however where two individuals are named, either or
                            both shall be referred to as customers. “The Bank”
                            means Ecobank Nigeria Limited (ENG) “Card” refers to
                            Ecobank Master Card Credit and Debit, Visa Debit,
                            Verve Debit and Verve Prepaid. The cards above are a
                            property of the Bank and will be returned
                            unconditionally and immediately to the bank upon
                            request by the Bank. “Card Holders” means a customer
                            who has been issued any of the following Ecobank
                            cards: Ecobank Master Card debit, Master Card
                            Credit, Visa Debit, Verve Debit and Verve Prepaid.
                            The card is the property of the Bank and will be
                            returned unconditionally and immediately to the Bank
                            upon request by the Bank.” “Service” means any of
                            the following; (ENG) Retail Internet Banking, ATM,
                            POS, SMS alerts, Mobile Banking and card services.
                            “Access code, Pass code, Username and Password”
                            means the enabling code required to access the
                            system for any of the services and which is known to
                            you alone. The Bank will not be held responsible for
                            disclosure of same. “Account” means a current or
                            savings account or other account maintained with the
                            bank at any of the bank’s branches in Nigeria. “PIN”
                            means the Personal Identification Number. “ATM”
                            means Automated Teller Machine that dispenses cash
                            to account holders via the use of debit / credit /
                            prepaid cards or our cash deposit ATM’s. “Ecobank
                            Cards” refers to personalised Ecobank Master Card
                            debit, Master Card Credit, Visa Debit, Verve Debit
                            and Verve Prepaid which are used by a customer for
                            initiating transactions on the various electronic
                            payment channels e.g. A.T.M, P.O.S, and Internet.
                            “Secure Message Facility” means the facility within
                            the e-Banking service that enables the client to
                            send electronic message (e-mail, SMS) to the Bank,
                            including and without limitation to free-format
                            messages, fixed format messages or instructions to
                            make payments, requests for cheque books, Bank
                            drafts or the purchase or sale of securities and
                            interests in mutual funds.
                        </li>
                        <h6>
                            2. The service allows the customers to give the Bank
                            Instructions by use of
                        </h6>
                        <h6>
                            2.1. Telephone, secure message (e-mail, SMS),
                            Internet banking for the following:
                        </h6>
                        <li>
                            a). Obtain information regarding customer’s balances
                            as at the last date of business with the bank.
                        </li>
                        <li>
                            b). Obtain information with regards to any
                            instrument in clearing or any balance standing in
                            the customer’s account as at the last date of
                            transaction on the customer’s account.
                        </li>
                        <li>
                            c). Authorise the Bank to debit customer’s account
                            to pay specified utility bills as NITEL, PHCN, WATER
                            RATE and / or any other bills as specified by
                            customer subject however to availability of such
                            bill payment under this service.
                        </li>
                        <li>
                            d). Authorise the Bank to effect a transfer of funds
                            from the customer’s accounts to any other account
                            with the Bank and with other Banks.
                        </li>
                        <li>
                            e). Authorise the Bank to effect / stop any payment
                            order.
                        </li>
                        <li>
                            f).Authorise the Bank to debit customers account and
                            credit same into any of the customers designated
                            card.
                        </li>
                        <li>
                            2.2. Upon receipt of the customer’s instruction, the
                            Bank will endeavor to carry out the customer’s
                            instruction promptly, except in the event of any
                            unforeseen circumstances such as Act of God, Force
                            Majeure and other causes beyond the Bank’s control.
                        </li>
                        <li>
                            3. Before the customer can access any of the
                            services, he / she / must have any or a combination
                            of the following An account with the Bank A valid
                            email address A Passcode, Access code, User name,
                            Password, A Personal Identification Number “PIN”
                            Valid GSM Number
                        </li>
                        <li>
                            4. The Pass code / Access code / Password / E-mail
                            security The customer understands that his / her
                            Pass code, Access code / Password, E-mail is used as
                            a medium to give instructions to the Bank and
                            accordingly undertakes.
                        </li>
                        <li>
                            4.1. That under no circumstance shall the Pass code,
                            Access code / Password be disclosed to a third
                            party.
                        </li>
                        <li>
                            4.2. Not to write the Passcode / Access code /
                            Password in an open place in order to avoid third
                            party access.
                        </li>
                        <li>
                            4.3. That once the Bank is instructed by means of
                            the customer’s Passcode / Access code or Pin the
                            Bank is entitled to attend to the instructions as
                            though given by the customer and to provide a
                            response on the same.
                        </li>
                        <li>
                            4.4. That the customer’s Passcode must be changed
                            immediately it becomes known to someone else.
                        </li>
                        <li>
                            4.5. That the Bank shall be exempted from any form
                            of liability whatsoever for complying with any or
                            all instructions(s) given by means of the customer’s
                            Pass code / Access code if by any means the Pass /
                            Access code becomes known to a third party.
                        </li>
                        <li>
                            4.6. Where a customer notifies the Bank of his
                            intention to change his Pass code / Access code
                            arising from loss of memory of same, or that same
                            has come to the notice of a third party, the Bank
                            shall, with the consent of the customer, delete same
                            and thereafter allow the customer to enter a new
                            Pass code / Access code PROVIDED that the Bank shall
                            not be responsible for any loss that occurs between
                            the period of such loss of memory of the Pass /
                            Access code or knowledge of a third party and the
                            time the report is lodged with the Bank.
                        </li>
                        <li>
                            4.7. Once a customer’s Pass code / Access code is
                            given, it shall be sufficient confirmation of the
                            authenticity of the instruction given.
                        </li>
                        <li>
                            4.8. The customer shall be responsible for any
                            instruction given by means of the customer’s Pass
                            code / Access code. Accordingly, the bank shall not
                            be responsible for any instructions given by the
                            customer using their Pass code / Access code.
                        </li>
                        <li>5. Electronic Banking Service</li>
                        <li>
                            5.1. The use of debit cards shall be subject to the
                            following terms and conditions: I / We understand
                            that my / our card shall be kept secured at all
                            times and that my / our Personal Identification
                            Number (PIN), Card Verification Value (CVV), and
                            Card Verification Code will not be disclosed to any
                            third party.
                        </li>
                        <li>
                            5.2. I / We understand that all transactions at any
                            Automated Teller Machine (ATM), Point Of Sale
                            (P.O.S) terminal or via internet made with my card
                            and PIN, CVV or CVC shall be treated as having been
                            authorised by me / us.
                        </li>
                        <li>
                            5.3. I / We understand that if any account that may
                            be assessed by my card is a joint account with more
                            than one signatory, all transactions at any ATM, POS
                            terminal or via internet that are made with my card
                            and PIN, CVV or CVC shall be treated as authorised
                            by me and the Bank shall not be liable if it’s found
                            that such transactions were carried out without my
                            authorisation.
                        </li>
                        <li>
                            5.4. I / We understand that cash withdrawals made
                            with my card and PIN shall not exceed a maximum
                            limit as may be specified by the Bank from time to
                            time, and if it does by way of a downtime or system
                            glitch, I undertake to immediately fund my account
                            to bridge the shortfall
                        </li>
                        <li>
                            5.5. I / We understand that cash withdrawal at the
                            ATM shall be deemed to have been concluded at the
                            point when the ATM dispenses cash via the cash tray.
                            The Bank accepts no liability whatsoever for any
                            subsequent event that occurs after cash had been
                            dispensed.
                        </li>
                        <li>
                            5.6. I / We understand that this card is the
                            property of the Bank and may be withdrawn at any
                            time. It must be returned to the Bank on demand. I
                            further agree that the ATM may impound my cards
                            anytime if the circumstances so warrant.
                        </li>
                        <li>
                            5.7. I understand that the card shall expire on the
                            date indicated thereon and renewed automatically by
                            the Bank.
                        </li>
                        <li>
                            5.8. I / We understand that the Bank shall not be
                            liable for any machine malfunction, strike or
                            dispute or any other circumstance affecting the use
                            of the card where such matters are not within the
                            direct control of the Bank.
                        </li>
                        <li>
                            5.9. I / We agree to be liable for all losses
                            arising from use of the card by any person having
                            possession of it with my consent or due to my
                            negligence.
                        </li>
                        <li>
                            5.10. I / We understand that the Bank reserves the
                            right to charge me fees and commission, as it may
                            deem appropriate for the use of this service.
                        </li>
                        <li>
                            5.11. I / We understand that if my card is lost or
                            stolen, I shall promptly make a written report to
                            the Bank or at its nearest branch and take all
                            necessary steps as the Bank may require in the
                            recovery of the card. I further agree to be liable
                            for any loss arising from the use of my card or PIN,
                            CVV or CVC by any unauthorised person up to two
                            working days after the Bank receives written
                            notification of loss of the card.
                        </li>
                        <li>
                            5.12. I / We understand that in the event that my
                            card is lost, missing, stolen, or my PIN, CVV and
                            CVC is forgotten, I shall be required to obtain a
                            new card from the Bank at a prescribed fee.
                        </li>
                        <li>
                            5.13. I / We understand that my rights under this
                            service are personal and therefore not assignable or
                            transferable.
                        </li>
                        <li>
                            5.14. I / We understand that the Bank may vary the
                            terms of this service at any-time without notice to
                            me.
                        </li>
                        <li>
                            5.15. I / We understand that either party may
                            terminate this service with seven days written
                            notice to the other party; however the Bank may
                            terminate this service with or without notice if
                            circumstances so warrants.
                        </li>
                        <li>
                            5.16. I / We agree to abide by the rules and
                            regulations of relevant card associations
                            (MasterCard, Visa, Verve, etc.)
                        </li>
                        <li>
                            5.17. I / We undertake to activate my debit card
                            before leaving your branch.
                        </li>
                        <li>
                            5.18. I / We understand that that the Banks products
                            and services may from time to time, attract
                            additional charges which will be applied according
                            to the Global Banking Terms and Conditions as stated
                            overleaf and on the Internet Banking login page.
                        </li>
                        <li>
                            5.19. I / We understand that unless the Bank
                            receives express instruction to cancel a particular
                            product / service, you will continue to benefit from
                            these add-ons.
                        </li>
                        <li>
                            5.20. I / We understand that the cards will be
                            renewed automatically within one month of expiry
                            date unless the Bank received express instructions
                            from the customer on the contrary at least one month
                            before the renewal date
                        </li>
                        <li>
                            6. Alert / e-Mail Statement Banking Service The use
                            of Alert Banking Service shall be subject to the
                            following terms and conditions:
                        </li>
                        <li>
                            6.1. The Alert Banking Service is an information
                            service which is given after the occurrence, all
                            transaction message sent by alerts are therefore
                            presumed and treated as having been authorised by me
                            and the Bank shall therefore have no liability
                            whatsoever to me.
                        </li>
                        <li>
                            6.2. I hereby accept responsibility for the
                            confidentiality and security of the alert message
                            and shall ensure that my mobile phone is kept in
                            safe custody and that I alone have access to my
                            email alert.
                        </li>
                        <li>
                            6.3. Where I operate a joint account or an account
                            with more than one signatory for this service, all
                            transaction messages shall be treated as having been
                            authorised by me and the Bank shall therefore not be
                            liable if it turns out that such transactions were
                            carried out without due authorisation.
                        </li>
                        <li>
                            6.4. The Bank shall not be liable for any loss
                            arising from my inability to receive notification
                            due to system downtime arising from: a).
                            Circumstances beyond its control, including strikes
                            and dispute, b). System maintenance, upgrading or
                            similar circumstance. c). Failure of service
                            provider to deliver SMS on time.
                        </li>
                        <li>
                            6.5. I agree to pay the Bank’s scale of fees and
                            commission as may be specified from time to time,
                            for the provision of this service. I hereby
                            authorise the Bank to debit any of my account(s)
                            with such fees and commission.
                        </li>
                        <li>
                            6.6. I agree that my rights under this agreement are
                            personal and therefore not assignable or
                            transferable.
                        </li>
                        <li>
                            6.7. If the Bank provides by email any confidential
                            information requested by me, I agree that the Bank
                            shall not be liable if the information provided is
                            lost or intercepted, altered or misused by a third
                            party.
                        </li>
                        <li>
                            6.8. Where my mobile phone is lost, missing, stolen,
                            I undertake to make a report to the Bank within 24
                            hours and the service shall be terminated for the
                            affected line immediately.
                        </li>
                        <li>
                            6.9. The Bank shall not be liable for any
                            information that is disclosed to any unauthorised
                            person due to my negligence.
                        </li>
                        <li>
                            6.10. Either party may terminate this service within
                            seven days to the other, however the Bank may
                            terminate this service with or without notice if
                            circumstances so warrant
                        </li>
                        <li>7. Mobile Banking & Mobile Money</li>
                        <li>
                            7.1. Depending on the service type, the customer may
                            be provided with a temporary PIN for the service in
                            the first instance and will be asked to change the
                            PIN before transacting or will be asked to select
                            his / her own pin.
                        </li>
                        <li>
                            7.2. As a safety measure, customer should
                            immediately change PIN upon receipt and is
                            responsible for maintaining the confidentiality of
                            the PIN. The customer is to change his / her PIN
                            frequently thereafter.
                        </li>
                        <li>
                            7.3.The customer acknowledges that the PIN selected
                            acts as the customer’s authorised signature, which
                            authorises and validates instructions given as al
                            written signature does.
                        </li>
                        <li>
                            7.4. The customer agrees that he / she will not
                            under any circumstances disclose the PIN to anyone,
                            including any employee of the Bank or anyone
                            claiming to represent the Bank or to someone giving
                            assistance on a technical helpdesk in connection
                            with the service. It should be clearly understood
                            that Bank employees do not need the customer’s PIN
                            for any reason whatsoever.
                        </li>
                        <li>
                            7.5. The customer should ensure that no one is
                            physically watching his / her PIN when inputting it
                            on the mobile phone. The PIN should not be written
                            anywhere.
                        </li>
                        <li>
                            7.6. The Bank shall not be held responsible for the
                            failure of the User to safeguard the secrecy of the
                            PIN or be held liable if the User allows anyone to
                            have access to the pin thereby compromising his /
                            her accounts. User in allowing anyone to have access
                            to his / her pin does so at his / her own risk.
                        </li>
                        <li>
                            7.7. If the customer forgets the Mobile Banking PIN,
                            he/she has to make a request for the issuance of a
                            new PIN by sending a written request to ENG/r
                            Contact Center.
                        </li>
                        <li>
                            7.8. The User agrees and acknowledges that ENG shall
                            in no way be held responsible or liable if the User
                            incurs any loss as a result of information being
                            disclosed by ENG regarding his account(s) or
                            carrying the instruction of the User pursuant to the
                            access of the Ecobank Mobile and the User shall
                            fully indemnify and hold harmless ENG in respect of
                            the same.
                        </li>
                        <li>
                            7.9. ENG reserves the right to change the service
                            charges, as may be fixed from time to time. The User
                            hereby authorises ENG to debit his / her Bank
                            account(s) with such charges.
                        </li>
                        <li>
                            7.10. Whenever the customer accesses the service
                            offered by ENG, applicable telecommunications
                            charges may apply.
                        </li>
                        <li>
                            7.11. Customer should agree and confirm that he /
                            she will not use this Ecobank mobile facility for
                            money laundering or violate any law related to money
                            laundering.
                        </li>
                        <li>
                            7.12. ENG reserves the right to demand an
                            explanation or explanations from the user regarding
                            any matter pertaining to money laundering law(s) of
                            Nigeria.
                        </li>
                        <li>
                            7.13. These Terms and conditions / or the operations
                            of the accounts of the User shall be governed by the
                            Laws of the Federal Republic of Nigeria.
                        </li>
                    </div>
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
                    loads={loads}
                    err={errorMessage}
                />
            </div>
            <p className={styles.already}>
                Already have an account?{' '}
                <Link href="../Auth/Login">
                    <span>Sign in</span>
                </Link>
            </p>
        </form>
    );
};
export default NewUser;
