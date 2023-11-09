import Image from 'next/image';
import React, { useState } from 'react';
import ElevateLogo from '../../../../components/ReusableComponents/Ellevate';
import CreateStore1 from '../../../../components/layout/Storefront/CreateStore1';
import CreateStore2 from '../../../../components/layout/Storefront/CreateStore2';
import styles from './styles.module.css';

const CreateStoreFront = () => {
    const [page, setPage] = useState(0);
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <CreateStore1 nextPage={() => setPage(1)} />;
            case 1:
                return <CreateStore2 nextPage={() => setPage(2)} />;
            case 2:
                return <h1>Continue</h1>;
            case 3:
                return <h1>End</h1>;
        }
    };

    return (
        <div className={styles.store}>
            <div className={styles.createStoreFlex}>
                <div className={styles.welcomeDiv}>
                    <Image
                        src="/Assets/Images/storefront.png"
                        width={432}
                        height={503}
                        alt="storfrontImages"
                    />
                    <span>
                        Welcome to <ElevateLogo />
                        StoreFront
                    </span>
                    <p>
                        You need to setup your store, then you can begin to
                        derive the best use from your store.
                    </p>
                </div>
                <div className={styles.creating}>
                    <div>
                        <h1>Create Storefront</h1>
                    </div>
                    <div className={styles.storeFrontSteps}>
                        <div>
                            <div
                                className={
                                    page === 0
                                        ? styles.detBrand
                                        : styles.detBrandInactive
                                }
                            >
                                1
                            </div>
                            <p
                                className={
                                    page === 0 ? styles.active : styles.inactive
                                }
                            >
                                Storefront details
                            </p>
                        </div>
                        <hr className={styles.hr} />
                        <div>
                            <div
                                className={
                                    page === 1
                                        ? styles.detBrand
                                        : styles.detBrandInactive
                                }
                            >
                                2
                            </div>
                            <p
                                className={
                                    page === 1 ? styles.active : styles.inactive
                                }
                            >
                                Storefront branding
                            </p>
                        </div>
                    </div>
                    <hr className={styles.serperator} />
                    {conditionalComponent()}
                </div>
            </div>
        </div>
    );
};

export default CreateStoreFront;
