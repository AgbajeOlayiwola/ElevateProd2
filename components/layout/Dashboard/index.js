// import React, { useEffect, useState } from 'react';
// import { Navbar, Sidebar } from '../../index';
// import styles from './styles.module.css';
import styled from 'styled-components';

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
// import withAuth from '../../HOC/withAuth';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';

const DashLayout = ({ children, page }) => {
    const DashCont = styled.div`
        flex: 1;
        background-color: #f5f6fa;
        padding: 36px 32px 46px 32px;
        height: 100vh;
        overflow-y: scroll;
    `;
    return (
        // <div className={styles.dash}>
        //     <Navbar page={page} />
        //     <div className={styles.main}>{children}</div>
        //     <Sidebar />
        // </div>
        <div className={styles.dash}>
            <Sidebar />
            <DashCont>
                <Navbar page={page} />
                {children}
            </DashCont>
        </div>
    );
};

// export default withAuth(DashLayout);
export default DashLayout;
