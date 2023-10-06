import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import MoreSvg from '../MoreSvg';
import ElevateLogo from '../Ellevate';
import LogoutSvg from '../LogoutSvg';
import { SidebarData } from '../Data';
import SideBarDrop from './sidebarcont';
import Dropdownicon from './dropdownicon';
import Innersubnav from './innersubnav';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile } from '../../../redux/slices/profile';
import { clearfaceMatchDetails } from '../../../redux/slices/facematchSlice';
import { clearMoreAccountNumberDetails } from '../../../redux/slices/moreAccountNumberDetails';
import { clearAccountNumber } from '../../../redux/slices/accountNumberSlice';
const Sidebar = ({ showSubnav }) => {
    const dispatch = useDispatch();
    // const { logout } = useSelector((state) => state.logoutReducer);
    const router = useRouter();

    const [Nav, setNav] = useState(false);
    const [subNavTitle, setSubNavTitle] = useState('');

    const handleLogOut = async () => {
        // Clear local storage
        await localStorage.clear();

        // Dispatch actions to clear Redux state
        await dispatch(clearProfile());
        await dispatch(clearfaceMatchDetails());
        await dispatch(clearMoreAccountNumberDetails());
        await dispatch(clearAccountNumber());
        // Redirect the user to the login page (you may use React Router for this)
        router.push('/Auth/Login');
    };

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    // fillColor={router.pathname == '/Dashboard'}

    return (
        <nav className={styles.sideNav}>
            <div className={styles.closeIcon} onClick={showSubnav}>
                <FaTimes />
            </div>
            <div className={styles.top}>
                <Link href="/Admin/Dashboard">
                    <div className={styles.ellevate}>
                        <ElevateLogo />
                    </div>
                </Link>
                <div className={styles.track}>
                    {SidebarData.map((item, index) => {
                        if (item.subNav) {
                            return (
                                <div
                                    key={index}
                                    className={
                                        router.pathname === item.path
                                            ? styles.inActive
                                            : styles.cont
                                    }
                                >
                                    <SideBarDrop item={item} />
                                </div>
                            );
                        } else {
                            return (
                                <Link
                                    href={
                                        router.pathname !== item.path
                                            ? item.path
                                            : '#'
                                    }
                                    className={styles.title}
                                >
                                    <div
                                        key={index}
                                        className={
                                            router.pathname === item.path
                                                ? styles.inActive
                                                : styles.cont
                                        }
                                        onClick={width > 950 ? '' : showSubnav}
                                    >
                                        <div className={styles.contWrapper}>
                                            <span className={styles.titleIcon}>
                                                {router.pathname === item.path
                                                    ? item.iconActive
                                                    : item.icon}
                                            </span>
                                            <div>{item.title}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
            <div
                onClick={handleLogOut}
                className={styles.cont}
                // styles={{ marginTop: '48.64px' }}
            >
                <div className={styles.contWrapper}>
                    <span>
                        <LogoutSvg />
                    </span>
                    <div>
                        <p className={styles.title}>Logout</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
