// import React, { useEffect, useState } from 'react';
// import { Navbar, Sidebar } from '../../index';
// import styles from './styles.module.css';
// import styled from 'styled-components';

// const DashLayout = ({ children, overlay }) => {
//     const [height, setHeight] = useState('');
//     useEffect(() => {
//         setHeight(document.documentElement.scrollHeight);
//     }, []);

//     console.log(height);
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
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import withAuth from '../../HOC/withAuth';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';
import Idle from 'react-idle';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
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
    const [cornifyLoaded, setCornifyLoaded] = useState('');
    const router = useRouter();
    const preloadCornify = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        if (!localStorage.getItem('user')) {
            router.replace('../Auth/Login');
        }

        if (getCookie('cookieToken') == undefined) {
            deleteCookie('existingToken');
        } else {
            deleteCookie('cookieToken');
        }
    };
    return (
        <div className={styles.dash}>
            <div className={sideActive ? styles.sidebar : styles.sidebarActive}>
                <Sidebar
                    showSubnav={() => {
                        setSideActive(false);
                    }}
                />
            </div>
            <Idle
                timeout={2000}
                onChange={({ idle }) => {
                    if (idle) {
                        preloadCornify();
                    }
                }}
            />

            {!sideActive ? (
                <div className={styles.dashCont}>
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
                    />
                    {children}
                </div>
            ) : null}
        </div>
    );
};

// export default withAuth(DashLayout);
export default DashLayout;
