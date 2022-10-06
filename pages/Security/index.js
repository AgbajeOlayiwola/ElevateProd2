import React, { useState } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import CustomerSingle from '../../components/ReusableComponents/CustomerSingle';
import EditProfileSvg from '../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import styles from './styles.module.css';

const Security = () => {
    const [text, setText] = useState('Change Transaction Pin');
    const [type, setType] = useState('');
    const [count, setCount] = useState(0);
    const profileData = [
        {
            text: 'Change Transaction Pin',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        {
            text: 'Change Password',
            icon: <BeneSvg />,
            color: '#7A7978'
        }
    ];
    const renderForm = () => {
        switch (text) {
            case 'Change Transaction Pin':
                return (
                    <>
                        <h2 className={styles.title}>Transaction Pin</h2>
                        <div className={styles.groupForm}>
                            <div className={styles.formGroup}>
                                <label>Old Transaction Pin</label>
                                <input
                                    type="text"
                                    placeholder="Old Transaction Pin"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Transaction Pin</label>
                                <input
                                    type="text"
                                    placeholder="New Transaction Pin"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Confirm Transaction Pin</label>
                                <input
                                    type="text"
                                    placeholder="Confirm Transaction Pin"
                                />
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            <button>Update</button>
                        </div>
                    </>
                );
            case 'Change Password':
                return (
                    <>
                        <h2 className={styles.title}>New Password</h2>
                        <div className={styles.groupForm}>
                            <div className={styles.formGroup}>
                                <label>Old Password</label>
                                <input type="text" placeholder="Old Password" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Password</label>
                                <input type="text" placeholder="New Password" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Confirm Password</label>
                                <input
                                    type="text"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            <button>Update</button>
                        </div>
                    </>
                );
        }
    };
    return (
        <DashLayout text="Security">
            <ProfileLayout
                head={profileData?.map((profile, index) => {
                    return (
                        <CustomerSingle
                            key={index}
                            profileText={profile.text}
                            icon={profile.icon}
                            color={profile.color}
                            action={() => {
                                setText(profile.text);
                                setCount(0);
                            }}
                        />
                    );
                })}
            >
                {renderForm()}
            </ProfileLayout>
        </DashLayout>
    );
};

export default Security;
