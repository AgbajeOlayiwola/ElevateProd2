import React, { useEffect, useState } from 'react';
import { ButtonComp, Messagesvg } from '../../components';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from './Loading';
import Failed from './Failed';
import Success from '../../components/ReusableComponents/Success';
const Verify = () => {
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);
    const [res, setRes] = useState('');
    const [resError, setResErros] = useState('');
    const [timeInterval, setTimeInterval] = useState(0);
    const { query, isReady, push } = useRouter();
    // const dispatch = useDispatch();
    const handleClick = () => {
        push('./Auth/Login');
    };

    useEffect(() => {
        var token = query['token'];
        //console.log'hello', token);
        if (!isReady) return;
        if (token) {
            axios
                .get(
                    `https://testvate.live/authentication/email-verification/${token}`,
                    {
                        headers: {
                            'X-Client-Type': 'web'
                        }
                    }
                )
                .then((response) => {
                    //console.logresponse.data.message);
                    setRes(response.data.message);
                    if (response.data.message) {
                        router.push('/Auth/Login');
                    }
                })
                .catch((error) => {
                    //console.logerror.response.data.statusCode);
                    setResErros(error.response.data.statusCode);
                });
        }
    }, [isReady]);

    return (
        <>
            {res === 'Email Successfully verified' ? (
                <div className={styles.verifyCov}>
                    <div className={styles.body}>
                        <svg>
                            <path
                                className={styles.checkBox}
                                d="M62.9989 124.999C97.4428 124.999 125.365 97.1259 125.365 62.7427C125.365 28.3594 97.4428 0.486328 62.9989 0.486328C28.5551 0.486328 0.632812 28.3594 0.632812 62.7427C0.632812 97.1259 28.5551 124.999 62.9989 124.999Z"
                                fill="#6CCF00"
                            />
                            <path
                                className={styles.check}
                                d="M57.5805 0.467654C58.3666 1.10972 46.7176 16.757 31.5668 35.4007L22.3715 46.5298L21.109 48.0517L19.7749 46.6725C7.8639 34.4733 -0.16414 25.4368 0.407589 24.8661C0.979318 24.2954 10.0555 32.3568 22.2524 44.1755L19.6796 44.4371L28.6844 33.1891C43.8352 14.4266 56.7706 -0.17441 57.5805 0.467654Z"
                                fill="white"
                            />
                        </svg>
                        <div className={styles.email}>
                            <h3 className={styles.verifyEmail}>
                                Your email address has been verified!
                            </h3>
                        </div>
                    </div>
                </div>
            ) : resError === 400 ? (
                <Failed />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Verify;
