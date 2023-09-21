import React, { useState } from 'react';
import { ButtonComp, Messagesvg } from '../../../components';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useResendEmailMutation } from '../../../redux/api/authApi';
const Loading = () => {
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);
    const [
        resendEmail,
        {
            data: resendEmailData,
            isLoading: resendEmailLoad,
            isSuccess: resendEmailSuccess,
            isError: resendEmailFalse,
            error: resendEmailErr,
            reset: resendEmailReset
        }
    ] = useResendEmailMutation();

    return (
        <div className={styles.verifyCov}>
            <div className={styles.verifyPopup}>
                <div className={styles.body}>
                    <Messagesvg />
                    <div className={styles.veriEmaillTxt}>
                        <h3 className={styles.verifyEmail}>
                            Verify your Email
                        </h3>
                    </div>
                    <p className={styles.error}>
                        {resendEmailErr ? resendEmailErr?.data?.message : null}
                    </p>
                    {resendEmailSuccess ? (
                        <p className={styles.hi}>Email Has Been Resent</p>
                    ) : (
                        <p className={styles.hi}>
                            An Email has been sent to your email account,Please
                            check your inbox and verify your email.
                        </p>
                    )}
                    <div>
                        <ButtonComp
                            onClick={() => router.push('/Auth/Login')}
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text="Proceed To Login"
                        />
                    </div>
                    <div className={styles.resendEmail}>
                        <p
                            onClick={() => {
                                resendEmail();
                            }}
                        >
                            Resend Email
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
