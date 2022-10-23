import React, { useState } from 'react';
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
import { logoutAction } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, deleteCookie } from 'cookies-next';

const Sidebar = ({ showSubnav }) => {
    const dispatch = useDispatch();
    // const { logout } = useSelector((state) => state.logoutReducer);
    const router = useRouter();

    const [Nav, setNav] = useState(false);
    const [subNavTitle, setSubNavTitle] = useState('');

    const handleLogOut = () => {
        if (!localStorage.getItem('user')) {
            router.replace('../Auth/Login');
        }
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        if (getCookie('cookieToken') == undefined) {
            deleteCookie('existingToken');
        } else {
            deleteCookie('cookieToken');
        }
    };

    // fillColor={router.pathname == '/Dashboard'}

    return (
        <nav className={styles.sideNav}>
            <div className={styles.closeIcon} onClick={showSubnav}>
                <FaTimes />
            </div>
            <div className={styles.top}>
                <div className={styles.ellevate}>
                    <ElevateLogo />
                </div>
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
                                <div
                                    key={index}
                                    className={
                                        router.pathname === item.path
                                            ? styles.inActive
                                            : styles.cont
                                    }
                                >
                                    <div className={styles.contWrapper}>
                                        <span className={styles.titleIcon}>
                                            {router.pathname === item.path
                                                ? item.iconActive
                                                : item.icon}
                                        </span>
                                        <div>
                                            <a
                                                href={
                                                    router.pathname !==
                                                    item.path
                                                        ? item.path
                                                        : null
                                                }
                                                className={styles.title}
                                            >
                                                {item.title}
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
