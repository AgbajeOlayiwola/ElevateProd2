import React, { useState } from 'react';
import Card from '../../../components/layout/NotRegisteredForms/Card/index';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { ButtonComp } from '../../../components';

const ResetPassword = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const router = useRouter();
    function handleSubmit() {
        router.push('../../Auth/Login');
    }
    return (
        <div className={styles.cov}>
            <Card>
                <div className={styles.create}>
                    <div>
                        <p>Create New Password</p>
                    </div>
                    <div>
                        <p>
                            Your new password must be different from previous
                            passwords used.
                        </p>
                    </div>
                </div>
                <form className={styles.formCre}>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="text"
                            name="newPassword"
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confnewPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="text"
                            name="confnewPassword"
                            placeholder="Confirm New Password"
                        />
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        onClick={handleSubmit}
                        type="submit"
                        text="Reset"
                    />
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;
