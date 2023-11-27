import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import InputWithSvg from '../../../components/ReusableComponents/InputWithSvg';
import RegisterationDetails from '../../../components/layout/BussinesRegisteration/RegisterationDetails';
import styles from './styles.module.css';
const BussinesRegisteration = () => {
    const [page, setPage] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');
    const [empty, setEmpty] = useState(false);
    const [checkReg, setCheckReg] = useState(true);
    const router = useRouter();
    const registerABusinss = () => {
        router.push('/Admin/BusinessRegisteration/Register');
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {checkReg ? (
                <RegisterationDetails
                    returnToPrev={() => setCheckReg((prev) => !prev)}
                />
            ) : (
                <div className={styles.breg}>
                    <div className={styles.reg}>
                        <div className={styles.businss}>
                            <h1>Business registration</h1>
                            <p>
                                You can make money registering business for
                                people
                            </p>
                        </div>
                        <button onClick={registerABusinss}>
                            Register a business
                        </button>
                    </div>
                    <div className={styles.regBus}>
                        <div className={styles.regHistory}>
                            <h1>Registration history</h1>

                            <InputWithSvg
                                svg={<BiSearch />}
                                placeholder="Search"
                                type="text"
                                label=""
                                name="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        {empty ? (
                            <div className={styles.center}>
                                <button onClick={registerABusinss}>
                                    Register a business
                                </button>
                            </div>
                        ) : (
                            <div className={styles.tableMain}>
                                <div className={styles.TableDetailHeader}>
                                    <p className={styles.beneficiary}>S/N </p>

                                    <p className={styles.type}>DATE</p>
                                    <p className={styles.amount}>
                                        REGISTRATION TYPE
                                    </p>
                                    <p className={styles.bank}>BUSINESS NAME</p>
                                    <p className={styles.dates}>
                                        BUSINESS OWNER(S)
                                    </p>
                                    <p className={styles.status}>STATUS</p>
                                    <p className={styles.date}>ACTION</p>
                                </div>
                                <div className={styles.TableDetailHeaders}>
                                    <p className={styles.beneficiary}>1 </p>

                                    <p className={styles.type}>11/12/1998</p>
                                    <p className={styles.amount}>My business</p>
                                    <p className={styles.bank}>Sales</p>
                                    <p className={styles.dates}>
                                        AGbaje Olayiwola, CHisom Christopher,
                                        AYomide Fagboyp
                                    </p>
                                    <p className={styles.status}>Completed</p>
                                    <p className={styles.date}>View</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BussinesRegisteration;
