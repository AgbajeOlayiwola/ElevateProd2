import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import FacebookLogo from '../../components/ReusableComponents/facebookLogo';
import InstagramLogoSvg from '../../components/ReusableComponents/InstagramLogoSvg';
import CartSvg from '../../components/ReusableComponents/ReusableSvgComponents/CartSvg';
import FacebookSvg from '../../components/ReusableComponents/ReusableSvgComponents/FacebookSvg';
import FavoriteSvg from '../../components/ReusableComponents/ReusableSvgComponents/FavoriteSvg';
import InstagramSvg from '../../components/ReusableComponents/ReusableSvgComponents/InstagramSvg';
import PhoneSvg from '../../components/ReusableComponents/ReusableSvgComponents/PhoneSvg';
import ShareSvg from '../../components/ReusableComponents/ReusableSvgComponents/ShareSvg';
import WhatsappSvg from '../../components/ReusableComponents/ReusableSvgComponents/WhatsappSvg';
import WhatsappLogo from '../../components/ReusableComponents/whatsappLogo';
import styles from './styles.module.css';

const Viewproducts = () => {
    const router = useRouter();
    const pid = router.query.index;
    const [page, setPage] = useState(0);
    const [preview, setPreview] = useState(false);
    const [previewSingle, setPreviewSingle] = useState(false);
    const [previewAll, setPreviewAll] = useState(true);
    const [previewTop, setPreviewTop] = useState(false);
    const [previewRec, setPreviewRec] = useState(false);
    const [previewClear, setPreviewClear] = useState(false);
    const [previewText, setPreviewText] = useState('');
    const [sizeActive, setSizeActive] = useState('XS');
    const [actionText, setActionText] = useState('Customize Storefront');
    const [title, setTitle] = useState('');
    const [orderType, setOrderType] = useState('Open');
    const [headTitle, setHeadTitle] = useState('Storefront');
    const previewDetails = [
        {
            img: './Assets/Images/diamond.png',
            name: 'Round Neck T-Shirt',
            price: 'N10,000.00'
        },
        {
            img: './Assets/Images/suit.png',
            name: 'Round Neck T-Shirt',
            price: 'N10,000.00'
        },
        {
            img: './Assets/Images/jeans.png',
            name: 'Round Neck T-Shirt',
            price: 'N10,000.00'
        },
        {
            img: './Assets/Images/bag.png',
            name: 'Round Neck T-Shirt',
            price: 'N10,000.00'
        },
        {
            img: './Assets/Images/diamond.png',
            name: 'Round Neck T-Shirt',
            price: 'N10,000.00'
        }
    ];
    return (
        <>
            <div className={styles.previewCont}>
                <div className={styles.firstPreviewCont}>
                    <img src="./Assets/Images/diamond.png" alt="" />
                </div>
                <div className={styles.secondPreviewCont}>
                    <div className={styles.previewSin}>
                        <h2>{previewText}</h2>
                        <div>
                            <ShareSvg color="#549E04" />
                            <p>Share Link</p>
                        </div>
                    </div>
                    <div className={styles.rate}>
                        <p>
                            Brand: <span>Gucci</span>
                        </p>
                    </div>
                    <p className={styles.stock}>12 in Stock</p>
                    <div className={styles.sizeContainer}>
                        <h2>Select Size</h2>
                        <div className={styles.sizeWrapper}>
                            <div
                                className={
                                    sizeActive === 'XS'
                                        ? styles.sizeActive
                                        : styles.sizeSingle
                                }
                                onClick={() => {
                                    setSizeActive('XS');
                                }}
                            >
                                <p>XS</p>
                            </div>
                            <div
                                className={
                                    sizeActive === 'S'
                                        ? styles.sizeActive
                                        : styles.sizeSingle
                                }
                                onClick={() => {
                                    setSizeActive('S');
                                }}
                            >
                                <p>S</p>
                            </div>
                            <div
                                className={
                                    sizeActive === 'M'
                                        ? styles.sizeActive
                                        : styles.sizeSingle
                                }
                                onClick={() => {
                                    setSizeActive('M');
                                }}
                            >
                                <p>M</p>
                            </div>
                            <div
                                className={
                                    sizeActive === 'L'
                                        ? styles.sizeActive
                                        : styles.sizeSingle
                                }
                                onClick={() => {
                                    setSizeActive('L');
                                }}
                            >
                                <p>L</p>
                            </div>
                            <div
                                className={
                                    sizeActive === 'XL'
                                        ? styles.sizeActive
                                        : styles.sizeSingle
                                }
                                onClick={() => {
                                    setSizeActive('XL');
                                }}
                            >
                                <p>XL</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        <div className={styles.priceWrapper}>
                            <h2>N10,000</h2>
                            <p>
                                46% <span>Discount</span>
                            </p>
                        </div>
                        <div className={styles.cartWrapper}>
                            <div className={styles.cartContainer}>
                                <CartSvg />
                            </div>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <h2>Description</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    urna proin elit vestibulum imperdiet proin elementum
                    scelerisque amet. Senectus morbi fringilla volutpat
                    fermentum, blandit blandit risus tellus dui. Integer nisl
                    arcu montes, quis suspendisse. Nec fringilla egestas nulla
                    adipiscing vitae iaculis viverra cras. Sed egestas aliquam
                    phasellus nulla nisi leo orci nec. Vitae pulvinar sed
                    pharetra, aliquet ipsum viverra odio mi. Quisque arcu, mi
                    mollis laoreet est, fringilla eleifend ut elit. Id vulputate
                    viverra mi nibh cum pellentesque risus urna. Morbi
                    condimentum malesuada suspendisse vulputate blandit
                    elementum. Est arcu eget orci, ultrices purus odio gravida
                    aliquet. Semper sed mi odio feugiat neque amet et, id vitae.
                    Quam velit porta mauris pellentesque feugiat ornare
                    pellentesque amet, dignissim. Elementum vitae vitae
                    elementum, arcu ut nunc eget tellus, nulla. Nulla molestie
                    morbi mollis sit tellus sit risus maecenas id. Hac nunc
                    eleifend dui pharetra etiam mi cursus risus adipiscing. Urna
                    aliquet et elit augue. Accumsan dignissim mi tristique ut.
                    Aliquam orci sagittis, dui erat et tempus posuere vestibulum
                    euismod. Nam malesuada dis bibendum aliquet netus in felis
                    aliquam. Id mollis condimentum leo laoreet sed. Ut nisl enim
                    dolor nibh elementum. Aenean viverra.
                </p>
            </div>
            <div className={styles.retailerDiv}>
                <div className={styles.firstRetailerDiv}></div>
                <div className={styles.secondRetailerDiv}>
                    <h2>Retailer’s Information</h2>
                    <div className={styles.retailerCont}>
                        <img src="./Assets/Images/retailerImg.png" alt="" />
                        <div className={styles.retailerWrapper}>
                            <h3>{title}</h3>
                            <div className={styles.retailerInfo}>
                                <div className={styles.retailerInfoDiv}>
                                    <PhoneSvg color="#6CCF00" />
                                    <p>08163546585</p>
                                </div>
                                <div className={styles.retailerSocials}>
                                    <WhatsappSvg />
                                    <FacebookSvg />
                                    <InstagramSvg />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.previewBody}>
                <h2 className={styles.customer}>Customer also viewed this</h2>
                <div>
                    {previewDetails?.map((details, index) => {
                        return (
                            <div
                                className={styles.previewSingle}
                                key={index}
                                onClick={() => {
                                    setPage(page + 1);
                                    setPreviewText(details.name);
                                }}
                            >
                                <div className={styles.previewWrapper}>
                                    <img src={details.img} alt="" />
                                    <span>
                                        <FavoriteSvg />
                                    </span>
                                    <div className={styles.previewDetails}>
                                        <h2>{details.name}</h2>
                                        <p>{details.price}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Viewproducts;
