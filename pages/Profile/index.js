import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import AppSvg from '../../components/ReusableComponents/AppSvg';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import BiometricsSvg from '../../components/ReusableComponents/BiometricsSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import LegalSvg from '../../components/ReusableComponents/LegalSvg';
import Lock from '../../components/ReusableComponents/LockSvg';
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
import RmSvg from '../../components/ReusableComponents/RmSvg';
import ShareSvg from '../../components/ReusableComponents/ShareSvg';
import styles from './styles.module.css';

const Profile = () => {
    const [account, setAccount] = useState('true');
    const [security, setSecurity] = useState('false');
    const [others, setOthers] = useState('false');
    const [overlay, setOverlay] = useState(false);
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const profileData = {
        account: [
            {
                text: 'Bank Verification Number (BVN)',
                icon: <BvnSvg />
            },
            {
                text: 'RM Name and Contact Details',
                icon: <RmSvg />
            },
            {
                text: 'Manage Signatories',
                icon: <ManageSignSvg />
            },
            {
                text: 'Manage Limit',
                icon: <ManageLimitSvg />
            },
            {
                text: 'Manage Beneficiaires',
                icon: <BeneSvg />
            }
        ],
        security: [
            {
                text: 'Reset and Update PIN',
                icon: <ResetPinSvg />
            },
            {
                text: 'Reset Password',
                icon: <ResetPassSvg />
            }
        ],
        others: [
            {
                text: 'App Preference',
                icon: <AppSvg />
            },
            {
                text: 'Legal-Terms & Condition, Data Privacy',
                icon: <LegalSvg />
            },
            {
                text: 'Share App/Refer a Friend',
                icon: <ShareSvg />
            }
        ]
    };
    useEffect(() => {
        setSecurity(false);
        setOthers(false);
    }, []);

    const renderForm = () => {
        switch (text) {
            case 'Reset Password':
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
                                title="Reset Password"
                                label1="Enter New Password"
                                label2="Confirm New Password"
                                formAction={() => setCount(count + 1)}
                            />
                        );
                    case 1:
                        return <OtpForm overlay={overlay} />;
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
            case 'App Preference':
                return (
                    <ResetPin
                        overlay={overlay}
                        action={() => {
                            setOverlay(false);
                            setText('');
                        }}
                        title={text}
                        label1="Enter New Password"
                        label2="Confirm New Password"
                    />
                );
            case 'Manage Signatories':
                switch (count) {
                    case 0:
                        return (
                            <ManageLimit
                                overlay={overlay}
                                title="Manage Signatories"
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                btnAction={() => {
                                    setCount(count + 1);
                                }}
                            />
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

            case 'Manage Limit':
                switch (count) {
                    case 0:
                        return (
                            <ManageLimit
                                overlay={overlay}
                                title="Manage Limit"
                                action={() => {
                                    setOverlay(false);
                                    setText('');
                                }}
                                btnAction={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ManageLimit2
                                title="Update Limit"
                                overlay={overlay}
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                btnAction={() => {
                                    setCount(count + 1);
                                }}
                                formAction={(data) => {
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
            case 'Manage Beneficiaires':
                switch (count) {
                    case 0:
                        return (
                            <ManageBene
                                overlay={overlay}
                                title="Manage Beneficiary"
                                action={() => {
                                    setOverlay(false);
                                    setText('');
                                }}
                                btnAction={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ManageBene2
                                title="Create New Beneficiary"
                                overlay={overlay}
                                action={() => {
                                    setOverlay(false);
                                    setCount(0);
                                    setText('');
                                }}
                                formAction={(data) => {
                                    console.log(data);
                                }}
                            />
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
    return (
        <DashLayout>
            <div className={styles.profileWrapper}>
                <h2>Profile Management</h2>
                <div className={styles.profileCont}>
                    <div className={styles.profileHeader}>
                        <div className={styles.profileHeaderImg}>
                            <Image
                                src="/Assets/Images/profileImg.png"
                                width="100%"
                                height="100%"
                                layout="responsive"
                            />
                            <p>Change Photo</p>
                        </div>
                        <div className={styles.profileHeaderText}>
                            <label
                                htmlFor="profileName"
                                className={styles.profileName}
                            >
                                Edit Profile Name
                            </label>
                            <input
                                type="text"
                                name="profileName"
                                placeholder="Bayo Olatunji _"
                            />
                            <div className={styles.lockAccount}>
                                <Lock />
                                <p>Freeze Account</p>
                                <label>
                                    <input type="checkbox" name="" id="" />
                                    <span>
                                        <i></i>
                                    </span>
                                </label>
                            </div>
                            <p>
                                Account active for 53 days. Toggle to freeze
                                account.
                            </p>
                            <button>Save Changes</button>
                        </div>
                    </div>
                    <div className={styles.profileBody}>
                        <div className={styles.profileBodyHeader}>
                            <div
                                className={
                                    account
                                        ? styles.active
                                        : styles.profileButton
                                }
                                onClick={() => {
                                    setAccount(true);
                                    setOthers(false);
                                    setSecurity(false);
                                }}
                            >
                                <p>Account</p>
                            </div>
                            <div
                                className={
                                    security
                                        ? styles.active
                                        : styles.profileButton
                                }
                                onClick={() => {
                                    setAccount(false);
                                    setOthers(false);
                                    setSecurity(true);
                                }}
                            >
                                <p>Security</p>
                            </div>
                            <div
                                className={
                                    others
                                        ? styles.active
                                        : styles.profileButton
                                }
                                onClick={() => {
                                    setAccount(false);
                                    setOthers(true);
                                    setSecurity(false);
                                }}
                            >
                                <p>Others</p>
                            </div>
                        </div>
                        <div className={styles.profileBodyCont}>
                            {account ? (
                                <div>
                                    {profileData.account.map((item, index) => {
                                        return (
                                            <ProfileSingle
                                                key={index}
                                                profileText={item.text}
                                                icon={item.icon}
                                                index={index}
                                                action={() => {
                                                    setText(item.text);
                                                    setOverlay(true);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            ) : null}
                            {security ? (
                                <div>
                                    {profileData.security.map((item, index) => {
                                        return (
                                            <ProfileSingle
                                                key={index}
                                                profileText={item.text}
                                                icon={item.icon}
                                                index={index}
                                                action={() => {
                                                    setText(item.text);
                                                    setOverlay(true);
                                                }}
                                            />
                                        );
                                    })}
                                    {/* action={showForm} */}
                                    {/* <ProfileSingle
                                        profileText="Enable/Disable Biometrics"
                                        icon={<BiometricsSvg />}
                                    /> */}
                                </div>
                            ) : null}
                            {others ? (
                                <div>
                                    {profileData.others.map((item, index) => {
                                        return (
                                            <ProfileSingle
                                                key={index}
                                                profileText={item.text}
                                                icon={item.icon}
                                                index={index}
                                                action={() => {
                                                    setText(item.text);
                                                    setOverlay(true);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {overlay ? renderForm() : null}
        </DashLayout>
    );
};

export default Profile;
