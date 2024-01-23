// import React, { useEffect, useState } from 'react';
// import { Navbar, Sidebar } from '../../index';
// import styles from './styles.module.css';
// import styled from 'styled-components';

// const DashLayout = ({ children, overlay }) => {
//     const [height, setHeight] = useState('');
//     useEffect(() => {
//         setHeight(document.documentElement.scrollHeight);
//     }, []);

//     // //// console.log(height);
//

//     const mainOverlay = {
//         height: height,
//         backgroundColor: '#f5f6fa',
//         padding: '36px 32px 46px 32px',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         opacity: 0.8,
//         zIndex: '5'
//     };
//     return (
//         <div className={styles.dash}>
//             <Sidebar />
//             <DashCont>
//                 <div style={overlay ? mainOverlay : null}></div>
//                 <Navbar />
//                 {children}
//             </DashCont>
//         </div>
//     );
// };

// export default DashLayout;
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import {
    useGetStoreFrontMutation,
} from '../../../redux/api/authApi';
import { setStoreSlice } from '../../../redux/slices/storeSlice';

const DashLayout = ({
    children,
    page,
    text,
    action,
    preview,
    previewSingle,
    productAction
}) => {
    const [sideActive, setSideActive] = useState(false);
    const [profileImg, setProfileImg] = useState('');
    const [userProfileData, setUserProfileData] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const [
        getStoreFront,
        {
            data: getStoreFrontData,
            isLoading: getStoreFrontLoad,
            isSuccess: getStoreFrontSuccess,
            isError: getStoreFrontFalse,
            error: getStoreFrontErr,
            reset: getStoreFrontReset
        }
    ] = useGetStoreFrontMutation();
    useEffect( () => {
        if ( getStoreFrontSuccess ) {
            dispatch( setStoreSlice( getStoreFrontData?.data ) );
            nextStep();
        }
    }, [getStoreFrontSuccess] );
    return (
        <>
            {router.pathname.includes('Admin') ? (
                <div className={styles.dash}>
                    <div
                        className={
                            sideActive ? styles.sidebar : styles.sidebarActive
                        }
                    >
                        <Sidebar
                            showSubnav={() => {
                                setSideActive(false);
                            }}
                        />
                    </div>
                    {/* <Idle
                        timeout={300000}
                        onChange={({ idle }) => {
                            if (idle) {
                                preloadCornify();
                            }
                        }}
                    /> */}

                    {!sideActive ? (
                        <div className={styles.dashCont}>
                            {page === 'Create Storefront' ? null : (
                                <Navbar
                                    page={page}
                                    text={text}
                                    action={action}
                                    preview={preview}
                                    previewSingle={previewSingle}
                                    productAction={productAction}
                                    sideAction={() => {
                                        setSideActive(true);
                                    }}
                                    profileImg={profileImg}
                                    userProfile={userProfileData}
                                />
                            )}
                            {children}
                        </div>
                    ) : null}
                </div>
            ) : (
                <> {children}</>
            )}
        </>
    );
};

export default DashLayout;
// export default DashLayout;
