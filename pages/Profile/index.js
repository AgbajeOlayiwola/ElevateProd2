import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import AppSvg from '../../components/ReusableComponents/AppSvg';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import BiometricsSvg from '../../components/ReusableComponents/BiometricsSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import LegalSvg from '../../components/ReusableComponents/LegalSvg';
import Lock from '../../components/ReusableComponents/LockSvg';
import ManageLimitSvg from '../../components/ReusableComponents/ManageLimitSvg';
import ManageSignSvg from '../../components/ReusableComponents/ManageSignSvg';
import ProfileSingle from '../../components/ReusableComponents/ProfileSingle';
import ResetPassSvg from '../../components/ReusableComponents/ResetPassSvg';
import ResetPinSvg from '../../components/ReusableComponents/ResetPinSvg';
import RmSvg from '../../components/ReusableComponents/RmSvg';
import ShareSvg from '../../components/ReusableComponents/ShareSvg';
import styles from './styles.module.css';

const Profile = () => {
    const [account, setAccount] = useState('true');
    const [security, setSecurity] = useState('false');
    const [others, setOthers] = useState('false');
    useEffect(() => {
        setSecurity(false);
        setOthers(false);
    }, []);
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
                            <label htmlFor="profileName">
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
                                <input type="checkbox" name="" id="" />
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
                                    <ProfileSingle
                                        profileText="Bank Verification Number (BVN)"
                                        icon={<BvnSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="RM Name and Contact Details"
                                        icon={<RmSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Manage Signatories"
                                        icon={<ManageSignSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Manage Limit"
                                        icon={<ManageLimitSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Manage Beneficiaires"
                                        icon={<BeneSvg />}
                                    />
                                </div>
                            ) : null}
                            {security ? (
                                <div>
                                    <ProfileSingle
                                        profileText="Reset and Update PIN"
                                        icon={<ResetPinSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Reset Password"
                                        icon={<ResetPassSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Enable/Disable Biometrics"
                                        icon={<BiometricsSvg />}
                                    />
                                </div>
                            ) : null}
                            {others ? (
                                <div>
                                    <ProfileSingle
                                        profileText="App Preference"
                                        icon={<AppSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Legal-Terms & Condition, Data Privacy"
                                        icon={<LegalSvg />}
                                    />
                                    <ProfileSingle
                                        profileText="Share App/Refer a Friend"
                                        icon={<ShareSvg />}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    );
};

export default Profile;
