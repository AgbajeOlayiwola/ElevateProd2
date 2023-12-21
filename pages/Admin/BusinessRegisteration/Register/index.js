import Image from 'next/image';
import React, { useState } from 'react';
import StepOne from '../../../../components/layout/BussinesRegisteration/Step1';
import StepTwo from '../../../../components/layout/BussinesRegisteration/Step2';
import StepThree from '../../../../components/layout/BussinesRegisteration/Step3';
import StepFour from '../../../../components/layout/BussinesRegisteration/Step4';
import StepFive from '../../../../components/layout/BussinesRegisteration/Step5';
import styles from './styles.module.css';
const BussinesRegisteration = () => {
    const [page, setPage] = useState(4);
    const multiStep = () => {
        switch (page) {
            case 0:
                return <StepOne />;
            case 1:
                return <StepTwo />;
            case 2:
                return <StepThree />;
            case 3:
                return <StepFour />;
            case 4:
                return <StepFive />;
        }
    };
    return (
        <div className={styles.breg}>
            {page === 4 ? null : (
                <div className={styles.bregLeft}>
                    <Image
                        src="/Assets/Images/Rectangle552.png"
                        height={503}
                        width={432}
                        alt="side"
                    />
                    <h2>Register your business in 3 steps</h2>
                    <p>
                        We help you seamlessly register your business and get
                        your business number in a week.
                    </p>
                </div>
            )}
            <div className={styles.bregRight}>
                {page === 4 ? null : (
                    <>
                        <h2 className={styles.reg}>Register your business</h2>
                        <div className={styles.level}>
                            <div
                                onClick={() => setPage(0)}
                                className={
                                    page === 0 ? styles.active : styles.inactive
                                }
                            >
                                <div>1</div>
                                <p>Business details</p>
                            </div>
                            <hr />
                            <div
                                onClick={() => setPage(1)}
                                className={
                                    page === 1 ? styles.active : styles.inactive
                                }
                            >
                                <div>2</div>
                                <p>Your personal details</p>
                            </div>
                            <hr />
                            <div
                                onClick={() => setPage(2)}
                                className={
                                    page === 2 ? styles.active : styles.inactive
                                }
                            >
                                <div>3</div>
                                <p>Identity card details</p>
                            </div>
                        </div>

                        <hr />
                        <br />
                    </>
                )}
                {multiStep()}
            </div>
        </div>
    );
};

export default BussinesRegisteration;
