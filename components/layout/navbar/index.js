import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import NotificationsSvg from '../../ReusableComponents/NotificationSvg';

const Navbar = ({ page }) => {
    return (
        <div className={styles.cov}>
            <nav className={styles.navigation}>
                <Link href="/Profile">
                    <div className={styles.imageName}>
                        {page === 'Dashboard' ? (
                            <div className={styles.userName}>
                                <h3 className={styles.name}>
                                    Welcome, Bayo 👍🏼
                                </h3>
                                <p className={styles.company}>
                                    Marvelous Solutions
                                </p>
                            </div>
                        ) : (
                            <h2 className={styles.name}>{page}</h2>
                        )}
                    </div>
                </Link>
                <div className={styles.rightNav}>
                    {page === 'Payments' ? null : (
                        <form>
                            <input
                                className={styles.srch}
                                type="text"
                                placeholder="Search ellevate"
                            />
                        </form>
                    )}
                    <div className={styles.notificationBar}>
                        <div className={styles.notification}>
                            <NotificationsSvg />
                        </div>
                        <div>
                            <img
                                src="/Assets/Images/UserImage.png"
                                width="50"
                                height="50"
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
