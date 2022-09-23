import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import NotificationsSvg from '../../ReusableComponents/NotificationSvg';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import SearchSvg from '../../ReusableComponents/ReusableSvgComponents/SearchSvg';
import SearchButtonSvg from '../../ReusableComponents/ReusableSvgComponents/SearchButtonSvg';
import CartSvg from '../../ReusableComponents/ReusableSvgComponents/CartSvg';

const Navbar = ({
    page,
    text,
    action,
    preview,
    previewSingle,
    productAction
}) => {
    return (
        <nav className={styles.navigation}>
            {preview === true ? (
                <>
                    <div className={styles.imageName}>
                        {previewSingle === true ? (
                            <h2 className={styles.name}>
                                <span>
                                    <ArrowBackSvg
                                        color="#102572"
                                        action={action}
                                    />
                                </span>{' '}
                                Back to Products
                            </h2>
                        ) : (
                            <>
                                <h2 className={styles.previewName}>{text}</h2>
                                <p className={styles.company}>
                                    Welcome to my Storefront
                                </p>
                            </>
                        )}
                    </div>
                    <div className={styles.productSearchCont}>
                        <div className={styles.productSearchWrapper}>
                            <SearchSvg color="#CCCCCC" />
                            <input type="text" placeholder="Search Products" />
                        </div>
                        <button>
                            <SearchButtonSvg />
                        </button>
                    </div>
                    {previewSingle === true ? (
                        <div className={styles.cartCont}>
                            <div>
                                <CartSvg />
                            </div>
                            <img
                                src="./Assets/Images/productOwner.png"
                                alt=""
                            />
                        </div>
                    ) : (
                        <div className={styles.productAction}>
                            <button className={styles.share}>Share</button>
                            <button
                                className={styles.close}
                                onClick={productAction}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
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
                        ) : page === 'Storefront' ? (
                            <>
                                <h2 className={styles.name}>{page}</h2>
                                <p>
                                    Create, Enable/Disable your storefront for
                                    your Ellevate account.
                                </p>
                            </>
                        ) : page === 'text' ? (
                            <h2 className={styles.name}>
                                <span>
                                    <ArrowBackSvg
                                        color="#102572"
                                        action={action}
                                    />
                                </span>
                                {text}
                            </h2>
                        ) : (
                            <h2 className={styles.name}>{page}</h2>
                        )}
                    </div>
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
                            <Link href="/Profile">
                                <div>
                                    <img
                                        src="/Assets/Images/UserImage.png"
                                        width="50"
                                        height="50"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
