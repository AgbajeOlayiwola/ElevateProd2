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
import { useState } from 'react';
// import withAuth from '../../HOC/withAuth';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';

const DashLayout = ({
    children,
    page,
    text,
    action,
    preview,
    previewSingle,
    productAction
}) => {
    const [sidebarState, setSidebarState] = useState(true);
    const [burgerState, setburgerState] = useState(true);
    return (
        // <div className={styles.dash}>
        //     <Navbar page={page} />
        //     <div className={styles.main}>{children}</div>
        //     <Sidebar />
        // </div>
        <div className={styles.dash}>
            {sidebarState ? <Sidebar /> : null}
            <div className={styles.dashCont}>
                <Navbar
                    page={page}
                    text={text}
                    action={action}
                    preview={preview}
                    previewSingle={previewSingle}
                    productAction={productAction}
                    sideAction={() => {
                        setSidebarState(!sidebarState);
                        setburgerState(!burgerState);
                    }}
                    burgerState={burgerState}
                />
                {children}
            </div>
        </div>
    );
};

// export default withAuth(DashLayout);
export default DashLayout;
