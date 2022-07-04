import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import NotificationsSvg from '../../ReusableComponents/NotificationSvg';

const Navbar = () => {
    return (
        <nav className={styles.navigation}>
            <div className={styles.imageName}>
                <div>
                    <img
                        src="/Assets/Images/UserImage.png"
                        width="50"
                        height="50"
                    />
                </div>
                <div>
                    <div>
                        <h3 className={styles.name}>Welcome, Bayo</h3>
                    </div>
                    <div>
                        <p className={styles.company}>Marvelous Solutions</p>
                    </div>
                </div>
            </div>
            <div>
                <NotificationsSvg />
            </div>
        </nav>
    );
};

export default Navbar;
