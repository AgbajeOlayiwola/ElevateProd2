import React from 'react';
import styles from './styles.module.css';

const CorporateAccount = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);

    const router = useRouter();

    const { isLoading, profile, errorMessage } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(CompProfile());
    }, []);
    useEffect(() => {
        if (profile !== null) {
            setProfileCont(profile.data);
        }
        // setGender(profileCont.gender);
    }, [profile]);
    const dispatch = useDispatch();

    console.log(profile);
    const { newUserAccount, newUserAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDetails
    );
    // useEffect(() => {
    // const accountData = {
    //     affiliateCode: 'ENG',
    //     ccy: 'NGN'
    // };
    // dispatch(createNewUserAccount(accountData));
    // }, []);
    const newUserAccountt = () => {
        console.log(newUserAccount.message);
        if (!newUserAccountErrorMessage) {
            // dispatch(getNewUserAccountDetails());
            dispatch(getNewUserAccountDetails());
            setTimeout(() => {
                dispatch(getNewUserAccountDetails());
            }, 10000);
            // setLoading(false);
        }
        if (newUserAccount.message === 'SUCCESS') {
            router.push('/Succes');
        } else if (newUserAccount.message === 'SUCCESS') {
            // window.localStorage.setItem(
            //     'accountNumber',
            //     JSON.stringify(accountStatus)
            // );
            router.push('/Succes');
        }
    };
    useEffect(() => {
        newUserAccountt();
    }, [newUserAccountErrorMessage, newUserAccount]);

    return (
        <>
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        <svg
                            width="59"
                            height="15"
                            viewBox="0 0 59 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svg}
                        >
                            <circle
                                cx="7.5"
                                cy="7.25684"
                                r="7"
                                fill="#6CCF00"
                            />
                            <circle
                                cx="29.5"
                                cy="7.25684"
                                r="7"
                                fill="#6CCF00"
                            />
                            <circle
                                cx="51.5"
                                cy="7.25684"
                                r="7"
                                fill="#6CCF00"
                            />
                        </svg>
                    </div>
                    <p className={styles.kindly}>
                        Kindly wait while the system fetches your account
                        number, this will take a moment.
                    </p>
                </div>
            </div>
        </>
    );
};

export default CorporateAccount;
