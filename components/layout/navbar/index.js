import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import NotificationsSvg from '../../ReusableComponents/NotificationSvg';

const Navbar = () => {
    return (
        <div className={styles.cov}>
            <nav className={styles.navigation}>
                <div className={styles.imageName}>
                    <div>
                        <img
                            src="/Assets/Images/UserImage.png"
                            width="50"
                            height="50"
                        />
                    </div>
                    <div className={styles.userName}>
                        <h3 className={styles.name}>Welcome Bayo,</h3>
                        <p className={styles.company}>Marvelous Solutions</p>
                    </div>
                </div>
                <div className={styles.rightNav}>
                    <form>
                        <input
                            className={styles.srch}
                            type="text"
                            placeholder="Search ellevate"
                        />
                    </form>
                    <div className={styles.notification}>
                        <NotificationsSvg />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
