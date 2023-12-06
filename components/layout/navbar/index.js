import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import { affiliateCountries } from '../../ReusableComponents/Data';
import NotificationsSvg from '../../ReusableComponents/NotificationSvg';
import CartSvg from '../../ReusableComponents/ReusableSvgComponents/CartSvg';
import SearchButtonSvg from '../../ReusableComponents/ReusableSvgComponents/SearchButtonSvg';
import SearchSvg from '../../ReusableComponents/ReusableSvgComponents/SearchSvg';
import styles from './style.module.css';

const Navbar = ({
    page,
    text,
    action,
    preview,
    previewSingle,
    productAction,
    sideAction,
    userProfile,
    profileImg
}) => {
    const router = useRouter();
    // const [userProfile, setUserProfile] = useState();
    // const [userProfileData, setUserProfileData] = useState();
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         setUserProfile(window.localStorage.getItem('user'));
    //     }
    // }, []);
    // useEffect(() => {
    //     if (userProfile !== undefined) {
    //         setUserProfileData(JSON.parse(userProfile));
    //     }
    // }, [userProfile]);
    //  //console.log(userProfileData);
    const { profile } = useSelector((store) => store);
    const affiliate = localStorage.getItem('affiliateCode');
    const [flagSvgUrl, setFlagSvgUrl] = useState(null);
    const desiredAffiliateCode = affiliate;

    useEffect(() => {
        // Find the affiliate with the matching code
        const matchedAffiliate = affiliateCountries?.find(
            (affiliate) => affiliate?.affiliateCode === desiredAffiliateCode
        );

        // Set the SVG URL of the flag if a matching affiliate is found
        if (matchedAffiliate) {
            setFlagSvgUrl(matchedAffiliate?.flags?.svg);
        }
    }, [desiredAffiliateCode]);

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
                    <FaBars onClick={sideAction} className={styles.bars} />
                    <div className={styles.imageName}>
                        {router.pathname === '/Admin/Dashboard' ? (
                            <div className={styles.userName}>
                                <h3 className={styles.name}>
                                    Hello {profile?.user?.preferredName},
                                </h3>
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
                        ) : router.pathname == '/Admin/Payment' ? (
                            <h2 className={styles.name}>Payment</h2>
                        ) : router.pathname == '/Admin/Security' ? (
                            <h2 className={styles.name}>Security</h2>
                        ) : router.pathname == '/Admin/Reports' ? (
                            <h2 className={styles.name}>Transaction Reports</h2>
                        ) : router.pathname == '/Admin/Collections' ? (
                            <h2 className={styles.name}>Collections</h2>
                        ) : router.pathname == '/Admin/BankStatement' ? (
                            <h2 className={styles.name}>Bank Statement</h2>
                        ) : router.pathname == '/Admin/AllDisputes' ? (
                            <h2 className={styles.name}>All Disputes</h2>
                        ) : null}
                    </div>

                    <div className={styles.rightNav}>
                        {page === 'Payments' ? null : (
                            <form>
                                <div className={styles.navSearchWrapper}>
                                    <SearchSvg color="#CCCCCC" />
                                    <input
                                        type="text"
                                        placeholder="Search Products"
                                    />
                                </div>
                            </form>
                        )}
                        {flagSvgUrl ? (
                            <img
                                src={flagSvgUrl}
                                alt={`Flag for ${desiredAffiliateCode}`}
                                width="40"
                                height="40"
                            />
                        ) : null}
                        <div className={styles.notificationBar}>
                            <div className={styles.notification}>
                                <NotificationsSvg />
                            </div>
                            <Link href="/Admin/Profile">
                                <div>
                                    {profile?.user?.faceMatchSelfieBase64 !==
                                    null ? (
                                        <img
                                            src={`data:image/png;base64,${profile?.user?.faceMatchSelfieBase64}`}
                                            width="50"
                                            height="50"
                                        />
                                    ) : null}
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
