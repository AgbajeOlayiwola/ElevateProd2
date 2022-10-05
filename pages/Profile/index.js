import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import AppSvg from '../../components/ReusableComponents/AppSvg';
import ArrowBackSvg from '../../components/ReusableComponents/ArrowBackSvg';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import BiometricsSvg from '../../components/ReusableComponents/BiometricsSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import CheckedSvg from '../../components/ReusableComponents/CheckedSvg';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import InputTag from '../../components/ReusableComponents/Input';
import LegalSvg from '../../components/ReusableComponents/LegalSvg';
import Lock from '../../components/ReusableComponents/LockSvg';
import ManageBeneSingle from '../../components/ReusableComponents/ManageBene';
import ManageBene from '../../components/ReusableComponents/ManageBene';
import ManageBene2 from '../../components/ReusableComponents/ManageBene2';
import ManageLimit from '../../components/ReusableComponents/ManageLimit1';
import ManageLimit2 from '../../components/ReusableComponents/ManageLimit2';
import ManageLimitSvg from '../../components/ReusableComponents/ManageLimitSvg';
import ManageSignSvg from '../../components/ReusableComponents/ManageSignSvg';
import OtpForm from '../../components/ReusableComponents/OtpForm';
import PaymentSuccess from '../../components/ReusableComponents/PaymentSuccess';
import ProfileSingle from '../../components/ReusableComponents/ProfileSingle';
import ResetPassSvg from '../../components/ReusableComponents/ResetPassSvg';
import ResetPin from '../../components/ReusableComponents/ResetPin';
import ResetPinSvg from '../../components/ReusableComponents/ResetPinSvg';
import AddSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddSvg';
import ContactSvg from '../../components/ReusableComponents/ReusableSvgComponents/ContactSvg';
import EditProfileSvg from '../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import LogoutSvg from '../../components/ReusableComponents/ReusableSvgComponents/LogoutSvg';
import RmSvg from '../../components/ReusableComponents/RmSvg';
import ShareSvg from '../../components/ReusableComponents/ShareSvg';
import styles from './styles.module.css';

const Profile = () => {
    const [type, setType] = useState('Account');
    const [overlay, setOverlay] = useState(false);
    const [text, setText] = useState('View Profile');
    const [count, setCount] = useState(0);
    const [outType, setOutType] = useState();
    const profileData = [
        {
            text: 'View Profile',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Beneficiaries',
            icon: <BeneSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Limit',
            icon: <ManageLimitSvg />,
            color: '#7A7978'
        },
        {
            text: 'Bank Verification Number (BVN)',
            icon: <BvnSvg />,
            color: '#7A7978'
        },
        {
            text: 'RM Name and Contact Details ',
            icon: <RmSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Signatories',
            icon: <ManageSignSvg />,
            color: '#7A7978'
        },

        {
            text: 'Contact us',
            icon: <ContactSvg />,
            color: '#7A7978'
        },
        {
            text: 'Share App/Refer a Friend',
            icon: <ShareSvg color="#102572" />,
            color: '#7A7978'
        },
        {
            text: 'Log Out',
            icon: <LogoutSvg />,
            color: '#FF0000'
        }
    ];
    const bene = {
        account: [
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            },
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            },
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            },
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            }
        ],
        airtime: [
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            },
            {
                name: 'Ayomide James',
                account: '1234567890 (Ecobank Plc)'
            }
        ],
        signatories: [
            {
                name: 'Ayomide James',
                mail: 'ayomide0007@gmail.com'
            },
            {
                name: 'Ayomide James',
                mail: 'ayomide0007@gmail.com'
            },
            {
                name: 'Ayomide James',
                mail: 'ayomide0007@gmail.com'
            }
        ]
    };
    let countryName = '';
    let countryNames;

    if (typeof window !== 'undefined') {
        countryName = window.localStorage.getItem('country');
        if (countryName === null) {
            countryNames = window.localStorage.getItem('country');
        } else {
            countryNames = JSON.parse(countryName);
        }
    }
    let userProfile;
    let userProfileData = {};
    if (typeof window !== 'undefined') {
        userProfile = window.localStorage.getItem('user');
        userProfileData = JSON.parse(userProfile);
    }
    // console.log(countryNames.flags.svg);
    const types = (type) => {
        setOutType(type);
    };
    const renderForm = () => {
        switch (text) {
            case 'View Profile':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>View Profile</h2>
                                <div className={styles.profileBodyHead}>
                                    <div className={styles.profileBodyHeadImg}>
                                        <Image
                                            src={`data:image/png;base64,${userProfileData.profile.profileImg}`}
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    <div className={styles.groupForm}>
                                        <div className={styles.formGroup}>
                                            <label>Full Name</label>
                                            <InputTag
                                                type="text"
                                                placeholder="Babatune Abiodun"
                                                value={`${userProfileData.profile.lastName} ${userProfileData.profile.firstName}`}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Email Address</label>
                                            <InputTag
                                                type="email"
                                                placeholder="babatuneabiodun@gmail.com"
                                                value={userProfileData.email}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Phone Number</label>
                                            <div className={styles.phone}>
                                                <div
                                                    className={
                                                        styles.phoneHeader
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            // src={
                                                            // countryNames
                                                            // .flags.svg
                                                            // }
                                                            alt=""
                                                        />
                                                    </span>
                                                    <p>
                                                        {
                                                            // countryNames.baseCurrency
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        styles.phoneDetails
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            // countryNames.countryCode
                                                        }
                                                    </p>
                                                    <InputTag
                                                        type="number"
                                                        placeholder="812 345 6789"
                                                        value={
                                                            userProfileData.phoneNumber
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    // case 1:
                    //     return <OtpForm overlay={overlay} />;
                }

            case 'Reset and Update PIN':
                switch (count) {
                    case 0:
                        return (
                            <ResetPin
                                overlay={overlay}
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                title="Reset/Update Pin"
                                label1="Enter New Transacntion  Pin (6-Digit)"
                                label2="Confirm Transacntion  Pin (6-Digit)"
                                formAction={() => setCount(count + 1)}
                            />
                        );
                    case 1:
                        return <OtpForm overlay={overlay} />;
                }
            case 'Manage Limit':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>Manage Limit</h2>
                                <div className={styles.manageLimitBody}>
                                    <div className={styles.manageLimit}>
                                        <label>Ecobank to Other Banks</label>
                                        <div
                                            className={styles.manageLimitSingle}
                                        >
                                            <div
                                                className={
                                                    styles.manageLimitSingleHead
                                                }
                                            >
                                                <p>Sending (Per Transaction)</p>
                                                <p>
                                                    Receicing (Per Transaction)
                                                </p>
                                                <p>Daily Transfer Limit</p>
                                            </div>
                                            <div
                                                className={
                                                    styles.manageLimitSingleBody
                                                }
                                            >
                                                <p>N1,000,000</p>
                                                <p>Unlimited</p>
                                                <p>N2,500,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.manageLimit}>
                                        <label>Ecobank to Ecobank</label>
                                        <div
                                            className={styles.manageLimitSingle}
                                        >
                                            <div
                                                className={
                                                    styles.manageLimitSingleHead
                                                }
                                            >
                                                <p>Sending (Per Transaction)</p>
                                                <p>
                                                    Receicing (Per Transaction)
                                                </p>
                                                <p>Daily Transfer Limit</p>
                                            </div>
                                            <div
                                                className={
                                                    styles.manageLimitSingleBody
                                                }
                                            >
                                                <p>N1,000,000</p>
                                                <p>Unlimited</p>
                                                <p>N2,500,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.manageLimit}>
                                        <label>Account Balance</label>
                                        <div
                                            className={styles.manageLimitSingle}
                                        >
                                            <div
                                                className={
                                                    styles.manageLimitSingleHead
                                                }
                                            >
                                                <p>Maximum Balance </p>
                                            </div>
                                            <div
                                                className={
                                                    styles.manageLimitSingleBody
                                                }
                                            >
                                                <p>Unlimited</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.manageLimit}>
                                        <label>mPOS Payments</label>
                                        <div
                                            className={styles.manageLimitSingle}
                                        >
                                            <div
                                                className={
                                                    styles.manageLimitSingleHead
                                                }
                                            >
                                                <p>Single</p>
                                            </div>
                                            <div
                                                className={
                                                    styles.manageLimitSingleBody
                                                }
                                            >
                                                <p>N1,000,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.profileBodyButton}>
                                        <button
                                            onClick={() => {
                                                setCount(count + 1);
                                            }}
                                        >
                                            Update Transfer Limit
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <>
                                <h2 className={styles.title}>
                                    <span>
                                        <ArrowBackSvg
                                            action={() => {
                                                setCount(count - 1);
                                            }}
                                        />
                                    </span>
                                    Update Transfer Limit
                                </h2>
                                <div className={styles.manageLimitImg}>
                                    <div className={styles.img}>
                                        <img
                                            src="./Assets/Images/limitMoney.png"
                                            alt=""
                                        />
                                    </div>
                                    <h3>
                                        Update Daily Transfer Limit to other
                                        Banks
                                    </h3>
                                    <h2>N2,500,000.00</h2>
                                    <img
                                        src="./Assets/Svgs/slider.svg"
                                        alt=""
                                        className={styles.slider}
                                    />
                                    <p>
                                        Adjust the slider to the maximum
                                        transfer limit you prefer.
                                        <span>
                                            Maximum Limit is N5,000,000.00
                                        </span>
                                    </p>
                                    <div className={styles.manageLimitButton}>
                                        <button
                                            onClick={() => {
                                                setCount(count - 1);
                                            }}
                                        >
                                            Update Transfer Limit
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                }

            case 'Bank Verification Number (BVN)':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>View my BVN</h2>
                                <div className={styles.bvn}>
                                    <p>
                                        Kindly enter your details below to view
                                        the BVN tied to your Ellevate account.
                                    </p>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Date of Birth</label>
                                    <input
                                        type="text"
                                        placeholder="DD  |  MM  |  YYYY"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Enter your Password</label>

                                    <div className={styles.divs}>
                                        <input
                                            placeholder="**********"
                                            // {...register('password', {
                                            //     required: 'Password is Required'
                                            // })}
                                            name="password"
                                            type={outType ? 'text' : 'password'}
                                        />
                                        <Visbility typeSet={types} />
                                    </div>
                                </div>
                                <div className={styles.bvnButton}>
                                    <button>View my BVN</button>
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <ManageLimit2
                                title="Update Signatories"
                                overlay={overlay}
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                btnAction={(data) => {
                                    setCount(count + 1);
                                    console.log(data);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                type="profile"
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                heading="New Signatory Successful"
                                body="Ayomide James has been added to your Signatory"
                            />
                        );
                }

            case 'Manage Signatories':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>
                                    Manage Signatories
                                </h2>
                                <div className={styles.sign}>
                                    <p>
                                        Please see below signatories to your
                                        Ellevate account.
                                    </p>
                                </div>
                                <div className={styles.signBody}>
                                    {bene.signatories?.map((sign, index) => {
                                        return (
                                            <ManageLimit
                                                fname={sign.name}
                                                mail={sign.mail}
                                                key={index}
                                            />
                                        );
                                    })}
                                    <div className={styles.signButton}>
                                        <button
                                            onClick={() => {
                                                setCount(count + 1);
                                            }}
                                        >
                                            Add New
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <>
                                <h2 className={styles.title}>
                                    <span>
                                        <ArrowBackSvg
                                            action={() => {
                                                setCount(count - 1);
                                            }}
                                        />
                                    </span>
                                    Manage Signatory
                                </h2>
                                <div className={styles.beneForm}>
                                    <div className={styles.signForm}>
                                        <div className={styles.midBeneForm}>
                                            <div className={styles.formGroup}>
                                                <label>Enter Email</label>
                                                <InputTag
                                                    type="email"
                                                    placeholder="Enter email here"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.midBeneForm}>
                                            <div className={styles.formGroup}>
                                                <label>
                                                    Enter your Business Phone
                                                    Number
                                                </label>
                                                <div className={styles.phone}>
                                                    <div
                                                        className={
                                                            styles.phoneHeader
                                                        }
                                                    >
                                                        <span>
                                                            {/* <img
                                                            src={
                                                                countryNames
                                                                    .flags.svg
                                                            }
                                                            alt=""
                                                        /> */}
                                                        </span>
                                                        <p>
                                                            {/* {
                                                            countryNames.baseCurrency
                                                        } */}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.phoneDetails
                                                        }
                                                    >
                                                        {/* <p>{countryNames.countryCode}</p> */}
                                                        <input
                                                            type="number"
                                                            placeholder="812 345 6789"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.signForm}>
                                        <div className={styles.midBeneForm}>
                                            <div className={styles.formGroup}>
                                                <label>Enter BVN</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your BVN"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.midBeneForm}>
                                            <div className={styles.formGroup}>
                                                <label>Signing Mandate</label>
                                                <select>
                                                    <option value="">
                                                        Select Signing Mandate
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.signRights}>
                                    <p>
                                        Select sigining rights to be assigned to
                                        this user
                                    </p>
                                    <div className={styles.signRightSingle}>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="viewBalances"
                                                    value="View Balances"
                                                />
                                                <span>
                                                    <CheckedSvg />
                                                </span>
                                            </label>

                                            <p>View Balances</p>
                                        </div>
                                    </div>
                                    <div className={styles.signRightSingle}>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="viewBalances"
                                                    value="Transacting (able to move money)"
                                                />
                                                <span>
                                                    <CheckedSvg />
                                                </span>
                                            </label>

                                            <p>
                                                Transacting (able to move money)
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.signRightSingle}>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="viewBalances"
                                                    value="Manage Account"
                                                />
                                                <span>
                                                    <CheckedSvg />
                                                </span>
                                            </label>

                                            <p>Manage Account</p>
                                        </div>
                                    </div>
                                    <div className={styles.profileBodyButton}>
                                        <button>Create Signatory</button>
                                    </div>
                                </div>
                            </>
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                type="profile"
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                heading="New Signatory Successful"
                                body="Ayomide James has been added to your Signatory"
                            />
                        );
                }
            case 'Manage Beneficiaries':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <div className={styles.beneficiaryHead}>
                                    <h2>Manage Beneficiaries</h2>
                                    <div
                                        className={styles.add}
                                        onClick={() => {
                                            setCount(count + 1);
                                        }}
                                    >
                                        <AddSvg />
                                        <p>Add</p>
                                    </div>
                                </div>
                                <div className={styles.beneficiaryHeader}>
                                    <div
                                        className={
                                            type === 'Account'
                                                ? styles.active
                                                : styles.beneficiaryHeaderDiv
                                        }
                                        onClick={() => {
                                            setType('Account');
                                        }}
                                    >
                                        <p>Account</p>
                                    </div>
                                    <div
                                        className={
                                            type === 'Airtime'
                                                ? styles.active
                                                : styles.beneficiaryHeaderDiv
                                        }
                                        onClick={() => {
                                            setType('Airtime');
                                        }}
                                    >
                                        <p>Airtime/Data</p>
                                    </div>
                                </div>
                                <div className={styles.search}>
                                    <img
                                        src="../Assets/Svgs/search.svg"
                                        alt=""
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search Products"
                                    />
                                </div>
                                <div className={styles.beneficiaryBody}>
                                    {type === 'Account' ? (
                                        <>
                                            <p className={styles.text}>A</p>
                                            {bene.account?.map(
                                                (account, index) => {
                                                    return (
                                                        <ManageBeneSingle
                                                            beneAccount={
                                                                account.account
                                                            }
                                                            beneName={
                                                                account.name
                                                            }
                                                            key={index}
                                                        />
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : type === 'Airtime' ? (
                                        <>
                                            <p className={styles.text}>A</p>
                                            {bene.airtime?.map(
                                                (account, index) => {
                                                    return (
                                                        <ManageBeneSingle
                                                            beneAccount={
                                                                account.account
                                                            }
                                                            beneName={
                                                                account.name
                                                            }
                                                            key={index}
                                                        />
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <>
                                <div className={styles.beneficiaryHead}>
                                    <h2>
                                        <span>
                                            <ArrowBackSvg
                                                action={() => {
                                                    setCount(count - 1);
                                                }}
                                            />
                                        </span>
                                        Manage Beneficiaries
                                    </h2>
                                    <div
                                        className={styles.add}
                                        // onClick={() => {
                                        //     setCount(count + 1);
                                        // }}
                                    >
                                        <AddSvg />
                                        <p>Add</p>
                                    </div>
                                </div>
                                <div className={styles.beneForm}>
                                    <div className={styles.formGroup}>
                                        <label>Choose Beneficiary Type</label>
                                        <select name="" id="">
                                            <option value="">
                                                Select Type
                                            </option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Account Number</label>
                                        <input
                                            type="number"
                                            placeholder="Enter Account Number"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Choose Bank</label>
                                        <select name="" id="">
                                            <option value="">
                                                Select Bank
                                            </option>
                                        </select>
                                    </div>
                                    <div className={styles.profileBodyButton}>
                                        <button>Create Beneficiary</button>
                                    </div>
                                </div>
                            </>
                        );
                    // case 2:
                    //     return (
                    //         <PaymentSuccess
                    //             overlay={overlay}
                    //             type="profile"
                    //             action={() => {
                    //                 setOverlay(false);
                    //                 setCount(0);
                    //                 setText('');
                    //             }}
                    //             heading="New Signatory Successful"
                    //             body="Ayomide James has been added to your Signatory"
                    //         />
                    //     );
                }
        }
    };
    // const myref = useRef();
    // useEffect(() => {
    //     myref.current.scrollTo(0, 0);
    //     window.scrollTo(0, 0);
    // }, [count, text]);
    return (
        <DashLayout page="Profile Management">
            <ProfileLayout
                head={
                    <>
                        <div className={styles.profileHeaderHead}>
                            <div className={styles.profileHeaderImg}>
                                <Image
                                    src={`data:image/png;base64,${userProfileData.profile.profileImg}`}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            <div className={styles.profileBodyHeaderCont}>
                                <h2>Marvelous Solutions</h2>
                                <p>{`${userProfileData.profile.lastName} ${userProfileData.profile.firstName}`}</p>
                            </div>
                        </div>
                        <div className={styles.subProfileHead}>
                            <div className={styles.freezeAccount}>
                                <p>Freeze Account</p>
                                <div className={styles.saveBene}>
                                    <label className={styles.beneCheck}>
                                        <input type="checkbox" />
                                        <span>
                                            <i></i>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.accountNumber}>
                                <h4>Account Number</h4>
                                <div className={styles.accountNumberCopy}>
                                    <p>2345678910 (Ecobank)</p>
                                    <h5>copy</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            {profileData.map((item, index) => {
                                return (
                                    <ProfileSingle
                                        key={index}
                                        profileText={item.text}
                                        icon={item.icon}
                                        index={index}
                                        action={() => {
                                            setText(item.text);
                                            setOverlay(true);
                                            setCount(0);
                                        }}
                                        color={item.color}
                                    />
                                );
                            })}
                        </div>
                    </>
                }
            >
                {renderForm()}
            </ProfileLayout>
        </DashLayout>
    );
};

export default Profile;
