import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import StoreIconSvg from '../../../components/ReusableComponents/ReusableSvgComponents/StoreIconSvg';
import SuccessCheckSvg from '../../../components/ReusableComponents/ReusableSvgComponents/SuccessCheckSvg';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const CreateStorefront = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <div className={styles.createStorefrontContainer}>
                        <div className={styles.createStorefront}>
                            <div>
                                <img
                                    src="../Assets/Images/cashhouse.png"
                                    alt=""
                                    className={styles.homeImg}
                                />
                                <h2 className={styles.header}>
                                    Welcome to MySME Storefront
                                </h2>
                                <p className={styles.narration}>
                                    You need to setup your store, then you can
                                    begin to derive the best use from your
                                    store.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className={styles.createStorefrontContainer}>
                        <div className={styles.createStorefront}>
                            <div>
                                <h2 className={styles.title}>
                                    <span>
                                        <ArrowBackSvg
                                            color="#102572"
                                            action={() => {
                                                setPage(page - 1);
                                            }}
                                        />
                                    </span>
                                    Storefront Setup
                                </h2>
                                <div className={styles.storefrontSetup}>
                                    <div>
                                        <img
                                            src="../Assets/Images/cashhouse.png"
                                            alt=""
                                        />
                                    </div>
                                    <p>
                                        Setup your storefront account and enjoy
                                        amazing easy to use features.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            >
                                Continue to Storefront
                            </button>
                        </div>
                    </div>
                );
            // case 1:
            //     return (
            //         <StorePopup overlay={true}>
            //             <h2 className={styles.title}>
            //                 <span>
            //                     <ArrowBackSvg
            //                         color="#102572"
            //                         action={() => {
            //                             setPage(page - 1);
            //                         }}
            //                     />
            //                 </span>
            //                 Create Storefront
            //             </h2>
            //             <div className={styles.headerLogo}>
            //                 <StoreIconSvg />
            //             </div>
            //             <p className={styles.logoText}>Tap to Upload Logo</p>
            //             <div className={styles.storeForm}>
            //                 <form
            //                     onSubmit={(e) => {
            //                         e.preventDefault();
            //                         setPage(page + 1);
            //                     }}
            //                 >
            //                     <div className={styles.formGroup}>
            //                         <label>Store Name</label>
            //                         <input
            //                             type="text"
            //                             placeholder="Enter Store Name"
            //                         />
            //                     </div>
            //                     <div className={styles.formGroup}>
            //                         <label>Storefront Link</label>
            //                         <input
            //                             type="text"
            //                             placeholder="ellevate.shop/"
            //                         />
            //                     </div>
            //                     <button type="submit">Create Storefront</button>
            //                 </form>
            //             </div>
            //         </StorePopup>
            //     );
            // case 2:
            //     return (
            //         <StorePopup overlay={true}>
            //             <div className={styles.storeSuccess}>
            //                 <SuccessCheckSvg />
            //             </div>
            //             <h2 className={styles.header}>
            //                 Storefront Created Successfully
            //             </h2>
            //             <p className={styles.narration2}>
            //                 Proceed to customize your Storefront
            //             </p>
            //             <button
            //                 onClick={() => {
            //                     router.push('/Admin/Storefront');
            //                 }}
            //             >
            //                 Continue to Storefront
            //             </button>
            //         </StorePopup>
            //     );
        }
    };
    return (
        <>{multi()}</>
        // <DashLayout
        //     page={headTitle}
        //     text={title}
        //     action={() => {
        //         setPage(page - 1);
        //         setHeadTitle('Storefront');
        //         setPreviewSingle(false);
        //     }}
        //     preview={preview}
        //     previewSingle={previewSingle}
        //     productAction={() => {
        //         setPage(page - 3);
        //         setPreview(false);
        //     }}
        // >
        // </DashLayout>
    );
};

export default CreateStorefront;
