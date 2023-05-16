import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import ArrowBackSvg from '../../components/ReusableComponents/ArrowBackSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import CustomerSingle from '../../components/ReusableComponents/CustomerSingle';
import LeftArrowSvg from '../../components/ReusableComponents/LeftArrowSvg';
import Overlay from '../../components/ReusableComponents/Overlay';
import CartSvg from '../../components/ReusableComponents/ReusableSvgComponents/CartSvg';
import CustomizeSvg from '../../components/ReusableComponents/ReusableSvgComponents/CustomizeSvg';
import EmailSvg from '../../components/ReusableComponents/ReusableSvgComponents/EmailSvg';
import FacebookSvg from '../../components/ReusableComponents/ReusableSvgComponents/FacebookSvg';
import FavoriteSvg from '../../components/ReusableComponents/ReusableSvgComponents/FavoriteSvg';
import InstagramSvg from '../../components/ReusableComponents/ReusableSvgComponents/InstagramSvg';
import PhoneSvg from '../../components/ReusableComponents/ReusableSvgComponents/PhoneSvg';
import ShareSvg from '../../components/ReusableComponents/ReusableSvgComponents/ShareSvg';
import StoreIconSvg from '../../components/ReusableComponents/ReusableSvgComponents/StoreIconSvg';
import StoreLogisticsSvg from '../../components/ReusableComponents/ReusableSvgComponents/StoreLogisticsSvg';
import StoreOrdersSvg from '../../components/ReusableComponents/ReusableSvgComponents/StoreOrdersSvg';
import SuccessCheckSvg from '../../components/ReusableComponents/ReusableSvgComponents/SuccessCheckSvg';
import WhatsappSvg from '../../components/ReusableComponents/ReusableSvgComponents/WhatsappSvg';
import StorePopup from '../../components/ReusableComponents/StorePopup';
import styles from './styles.module.css';

const Storefront = () => {
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
    const stores = [
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Click to Preview'
        },
        {
            storeName: 'Marvelous Solutions',
            orders: '21',
            link: 'Click to Preview'
        },
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Click to Preview'
        }
    ];
    const storeAction = [
        {
            title: 'Customize Storefront',
            icon: <CustomizeSvg />,
            color: '#7A7978'
        },
        {
            title: 'Inventory',
            icon: <BvnSvg />,
            color: '#7A7978'
        },
        {
            title: 'Orders',
            icon: <StoreOrdersSvg />,
            color: '#7A7978'
        },
        {
            title: 'Logistics',
            icon: <StoreLogisticsSvg />,
            color: '#7A7978'
        }
    ];
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
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <StorePopup overlay={true}>
                        <img
                            src="./Assets/Images/store.png"
                            alt=""
                            className={styles.homeImg}
                        />
                        <h2 className={styles.header}>
                            Welcome to Ellevate Storefront
                        </h2>
                        <p className={styles.narration}>
                            You need to setup your store, then you can begin to
                            derive the best use from your store.
                        </p>
                        <button
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            Get Started
                        </button>
                    </StorePopup>
                );
            case 1:
                return (
                    <StorePopup overlay={true}>
                        <h2 className={styles.title}>
                            <span>
                                <ArrowBackSvg
                                    color="#102572"
                                    action={() => {
                                        setPage(page - 1);
                                    }}
                                />
                            </span>
                            Create Storefront
                        </h2>
                        <div className={styles.headerLogo}>
                            <StoreIconSvg />
                        </div>
                        <p className={styles.logoText}>Tap to Upload Logo</p>
                        <div className={styles.storeForm}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                <div className={styles.formGroup}>
                                    <label>Store Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Store Name"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Storefront Link</label>
                                    <input
                                        type="text"
                                        placeholder="ellevate.shop/"
                                    />
                                </div>
                                <button type="submit">Create Storefront</button>
                            </form>
                        </div>
                    </StorePopup>
                );
            case 2:
                return (
                    <StorePopup overlay={true}>
                        <div className={styles.storeSuccess}>
                            <SuccessCheckSvg />
                        </div>
                        <h2 className={styles.header}>
                            Storefront Created Successfully
                        </h2>
                        <p className={styles.narration2}>
                            Proceed to customize your Storefront
                        </p>
                        <button
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            Continue to Storefront
                        </button>
                    </StorePopup>
                );
            case 3:
                return (
                    <div className={styles.storeBody}>
                        <div className={styles.storeBodyHeader}>
                            <div className={styles.tableFilter}>
                                <div>
                                    <img
                                        src="../Assets/Svgs/search.svg"
                                        alt=""
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search by Type"
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                    />
                                </div>
                                <select name="" id="">
                                    <option value="" defaultValue="Filter">
                                        Filter
                                    </option>
                                    <option
                                        value="Bvn"
                                        onClick={(e) => {
                                            alert(e.target.value);
                                        }}
                                    >
                                        Bvn
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.tableBody}>
                            <TableDetail header="Header" />
                            {stores?.map((store, index) => {
                                return (
                                    <TableDetail
                                        accountId={store?.accountId}
                                        storeName={store.storeName}
                                        orders={store.orders}
                                        link={store.link}
                                        key={index}
                                        action={() => {
                                            setPage(page + 1);
                                            setTitle(store.storeName);
                                            setHeadTitle('text');
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div className={styles.storeButton}>
                            <button
                                onClick={() => {
                                    setPage(page - 2);
                                }}
                            >
                                Create Storefront
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <ProfileLayout
                        head={
                            <>
                                <div className={styles.profileHeaderHead}>
                                    <div className={styles.profileHeaderImg}>
                                        <img
                                            src="/Assets/Images/storeOwner.png"
                                            width="100%"
                                            height="100%"
                                            layout="responsive"
                                        />
                                    </div>
                                    <div
                                        className={styles.profileBodyHeaderCont}
                                    >
                                        <h2>{title}</h2>
                                        <p>34 Products</p>
                                    </div>
                                </div>
                                <div className={styles.subProfileHead}>
                                    <div className={styles.freezeAccount}>
                                        <p>Enable Store</p>
                                        <div className={styles.saveBene}>
                                            <label className={styles.beneCheck}>
                                                <input type="checkbox" />
                                                <span>
                                                    <i></i>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.accountNumber}>
                                        <h4>Storefront Link</h4>
                                        <div
                                            className={styles.accountNumberCopy}
                                        >
                                            <p>ellevate/babatunde.....</p>
                                            <h5>copy</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.storeWrapper}>
                                    <div className={styles.storeAction}>
                                        {storeAction?.map((store, index) => {
                                            return (
                                                <CustomerSingle
                                                    icon={store.icon}
                                                    profileText={store.title}
                                                    action={() => {
                                                        setActionText(
                                                            store.title
                                                        );
                                                    }}
                                                    color={store.color}
                                                    key={index}
                                                />
                                            );
                                        })}
                                    </div>

                                    <button
                                        className={styles.copyLink}
                                        onClick={() => {
                                            setPreview(true);
                                            setPage(page + 3);
                                        }}
                                    >
                                        Preview Storefront
                                    </button>
                                </div>
                            </>
                        }
                    >
                        {actionText === 'Customize Storefront' ? (
                            <>
                                <h2 className={styles.actionText}>
                                    {actionText}
                                </h2>
                                <div className={styles.businessLogoDiv}>
                                    <img
                                        src="./Assets/Images/businessLogo.png"
                                        alt=""
                                    />
                                </div>
                                <div className={styles.customizeBody}>
                                    <div className={styles.customizeFirst}>
                                        <div className={styles.customizeForm}>
                                            <label>Store Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Store Name"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.customizeSecond}>
                                        <div className={styles.contactForm}>
                                            <label>Contact</label>
                                            <div>
                                                <PhoneSvg color="#102572" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Phone Number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.customizeBody}>
                                    <div className={styles.customizeFirst}>
                                        <div className={styles.customizeForm}>
                                            <label>Storefront Link</label>
                                            <input
                                                type="text"
                                                placeholder="ellevate.shop/"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.customizeSecond}>
                                        <div className={styles.contactForm}>
                                            <label>Contact</label>
                                            <div>
                                                <EmailSvg />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Email"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.customizeBody}>
                                    <div className={styles.customizeFirst}>
                                        <div className={styles.customizeForm}>
                                            <label>About your Business</label>
                                            <textarea
                                                name=""
                                                id=""
                                                placeholder="Tell your customer about your business"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className={styles.customizeSecond}>
                                        <div className={styles.socialForm}>
                                            <label>Link your Socials</label>
                                            <div>
                                                <WhatsappSvg />
                                                <input
                                                    type="text"
                                                    placeholder="wa.we/message/"
                                                />
                                            </div>
                                            <div>
                                                <FacebookSvg />
                                                <input
                                                    type="text"
                                                    placeholder="facebook.com/"
                                                />
                                            </div>
                                            <div>
                                                <InstagramSvg />
                                                <input
                                                    type="text"
                                                    placeholder="instagram.com/"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.customizeFirst}>
                                    <button>Save & Continue</button>
                                </div>
                            </>
                        ) : actionText === 'Inventory' ? (
                            <>
                                <h2 className={styles.actionText}>
                                    {actionText}
                                </h2>
                                <div className={styles.inventoryBody}>
                                    <div className={styles.inventoryHead}>
                                        <div>
                                            <img
                                                src="../Assets/Images/storeSearch.png"
                                                alt=""
                                            />
                                            <input
                                                type="text"
                                                placeholder="Search Products"
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setPage(page + 1);
                                            }}
                                        >
                                            + Add New
                                        </button>
                                    </div>
                                    <div className={styles.inventoryWrapper}>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.availability
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.beneCheck
                                                            }
                                                        >
                                                            <input type="checkbox" />
                                                            <span>
                                                                <i></i>
                                                            </span>
                                                        </label>
                                                        <p>Make Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3>12 in stock</h3>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.availability
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.beneCheck
                                                            }
                                                        >
                                                            <input type="checkbox" />
                                                            <span>
                                                                <i></i>
                                                            </span>
                                                        </label>
                                                        <p>Make Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3>12 in stock</h3>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.availability
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.beneCheck
                                                            }
                                                        >
                                                            <input type="checkbox" />
                                                            <span>
                                                                <i></i>
                                                            </span>
                                                        </label>
                                                        <p>Make Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3>12 in stock</h3>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.availability
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.beneCheck
                                                            }
                                                        >
                                                            <input type="checkbox" />
                                                            <span>
                                                                <i></i>
                                                            </span>
                                                        </label>
                                                        <p>Make Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3>12 in stock</h3>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : actionText == 'Orders' ? (
                            <>
                                <h2 className={styles.actionText}>
                                    {actionText}
                                </h2>
                                <div className={styles.ordersCont}>
                                    <div
                                        className={
                                            orderType === 'Open'
                                                ? styles.openOrders
                                                : styles.closeOrders
                                        }
                                        onClick={() => {
                                            setOrderType('Open');
                                        }}
                                    >
                                        <h4>Open Orders</h4>
                                    </div>
                                    <div
                                        className={
                                            orderType === 'Close'
                                                ? styles.openOrders
                                                : styles.closeOrders
                                        }
                                        onClick={() => {
                                            setOrderType('Close');
                                        }}
                                    >
                                        <h4>Closed Orders</h4>
                                    </div>
                                </div>
                                {orderType === 'Open' ? (
                                    <>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <h3 className={styles.orderNumber}>
                                                2 Pcs
                                            </h3>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <h3 className={styles.orderNumber}>
                                                2 Pcs
                                            </h3>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <h3 className={styles.orderNumber}>
                                                2 Pcs
                                            </h3>
                                        </div>
                                    </>
                                ) : orderType === 'Close' ? (
                                    <>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.orderDuration}
                                            >
                                                <p>25-10-2022</p>
                                                <h3>Shipped</h3>
                                            </div>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.orderDuration}
                                            >
                                                <p>25-10-2022</p>
                                                <h3>Shipped</h3>
                                            </div>
                                        </div>
                                        <div className={styles.inventorySingle}>
                                            <div
                                                className={
                                                    styles.inventorySingleFirst
                                                }
                                            >
                                                <img
                                                    src="./Assets/Images/cloth.png"
                                                    alt=""
                                                />
                                                <div className={styles.details}>
                                                    <p
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        Gucci Black Shirt
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.productPrice
                                                        }
                                                    >
                                                        N10,000
                                                    </p>
                                                    <h5>Order #1234567890</h5>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.orderDuration}
                                            >
                                                <p>25-10-2022</p>
                                                <h3>Shipped</h3>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </>
                        ) : actionText === 'Logistics' ? (
                            <h2 className={styles.actionText}>{actionText}</h2>
                        ) : null}
                    </ProfileLayout>
                );
            case 5:
                return (
                    <StorePopup overlay={true}>
                        <h2 className={styles.title}>
                            <span>
                                <ArrowBackSvg
                                    color="#102572"
                                    action={() => {
                                        setPage(page - 1);
                                    }}
                                />
                            </span>
                            New Product
                        </h2>
                        <div className={styles.newForm}>
                            <form>
                                <div className={styles.customizeForm}>
                                    <label> Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Store Name"
                                    />
                                </div>
                                <div className={styles.customizeForm}>
                                    <label> Description</label>
                                    <textarea
                                        name=""
                                        id=""
                                        placeholder="Tell your customer about your product"
                                    ></textarea>
                                </div>
                                <div className={styles.customizeForm}>
                                    <label> Price</label>
                                    <input type="text" placeholder="0.00" />
                                </div>
                                <div className={styles.customizeForm}>
                                    <label> Quantity</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Quantity"
                                    />
                                </div>
                                <button>Next</button>
                            </form>
                        </div>
                    </StorePopup>
                );
            case 6:
                return <></>;
            case 7:
                return (
                    <>
                        <div className={styles.previewHead}>
                            <h4
                                className={
                                    previewAll ? styles.previewActive : null
                                }
                                onClick={() => {
                                    setPreviewAll(true);
                                    setPreviewTop(false);
                                    setPreviewRec(false);
                                    setPreviewClear(false);
                                }}
                            >
                                All Products
                            </h4>
                            <h4
                                className={
                                    previewTop ? styles.previewActive : null
                                }
                                onClick={() => {
                                    setPreviewAll(false);
                                    setPreviewTop(true);
                                    setPreviewRec(false);
                                    setPreviewClear(false);
                                }}
                            >
                                Top Sales
                            </h4>
                            <h4
                                className={
                                    previewRec ? styles.previewActive : null
                                }
                                onClick={() => {
                                    setPreviewAll(false);
                                    setPreviewTop(false);
                                    setPreviewRec(true);
                                    setPreviewClear(false);
                                }}
                            >
                                Recommended
                            </h4>
                            <h4
                                className={
                                    previewClear ? styles.previewActive : null
                                }
                                onClick={() => {
                                    setPreviewAll(false);
                                    setPreviewTop(false);
                                    setPreviewRec(false);
                                    setPreviewClear(true);
                                }}
                            >
                                Clearance Sales
                            </h4>
                        </div>
                        <div className={styles.previewBody}>
                            {previewDetails?.map((details, index) => {
                                return (
                                    <div
                                        className={styles.previewSingle}
                                        key={index}
                                        onClick={() => {
                                            setPage(page + 1);
                                            setPreviewText(details.name);
                                            setPreviewSingle(true);
                                        }}
                                    >
                                        <div className={styles.previewWrapper}>
                                            <img src={details.img} alt="" />
                                            <span>
                                                <FavoriteSvg />
                                            </span>
                                            <div
                                                className={
                                                    styles.previewDetails
                                                }
                                            >
                                                <h2>{details.name}</h2>
                                                <p>{details.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                );
        }
    };
    //         case 8:
    //             return (
    //                 <>
    //                     <div className={styles.previewCont}>
    //                         <div className={styles.firstPreviewCont}>
    //                             <img src="./Assets/Images/diamond.png" alt="" />
    //                         </div>
    //                         <div className={styles.secondPreviewCont}>
    //                             <div className={styles.previewSin}>
    //                                 <h2>{previewText}</h2>
    //                                 <div>
    //                                     <ShareSvg color="#549E04" />
    //                                     <p>Share Link</p>
    //                                 </div>
    //                             </div>
    //                             <div className={styles.rate}>
    //                                 <p>
    //                                     Brand: <span>Gucci</span>
    //                                 </p>
    //                             </div>
    //                             <p className={styles.stock}>12 in Stock</p>
    //                             <div className={styles.sizeContainer}>
    //                                 <h2>Select Size</h2>
    //                                 <div className={styles.sizeWrapper}>
    //                                     <div
    //                                         className={
    //                                             sizeActive === 'XS'
    //                                                 ? styles.sizeActive
    //                                                 : styles.sizeSingle
    //                                         }
    //                                         onClick={() => {
    //                                             setSizeActive('XS');
    //                                         }}
    //                                     >
    //                                         <p>XS</p>
    //                                     </div>
    //                                     <div
    //                                         className={
    //                                             sizeActive === 'S'
    //                                                 ? styles.sizeActive
    //                                                 : styles.sizeSingle
    //                                         }
    //                                         onClick={() => {
    //                                             setSizeActive('S');
    //                                         }}
    //                                     >
    //                                         <p>S</p>
    //                                     </div>
    //                                     <div
    //                                         className={
    //                                             sizeActive === 'M'
    //                                                 ? styles.sizeActive
    //                                                 : styles.sizeSingle
    //                                         }
    //                                         onClick={() => {
    //                                             setSizeActive('M');
    //                                         }}
    //                                     >
    //                                         <p>M</p>
    //                                     </div>
    //                                     <div
    //                                         className={
    //                                             sizeActive === 'L'
    //                                                 ? styles.sizeActive
    //                                                 : styles.sizeSingle
    //                                         }
    //                                         onClick={() => {
    //                                             setSizeActive('L');
    //                                         }}
    //                                     >
    //                                         <p>L</p>
    //                                     </div>
    //                                     <div
    //                                         className={
    //                                             sizeActive === 'XL'
    //                                                 ? styles.sizeActive
    //                                                 : styles.sizeSingle
    //                                         }
    //                                         onClick={() => {
    //                                             setSizeActive('XL');
    //                                         }}
    //                                     >
    //                                         <p>XL</p>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className={styles.priceContainer}>
    //                                 <div className={styles.priceWrapper}>
    //                                     <h2>N10,000</h2>
    //                                     <p>
    //                                         46% <span>Discount</span>
    //                                     </p>
    //                                 </div>
    //                                 <div className={styles.cartWrapper}>
    //                                     <div className={styles.cartContainer}>
    //                                         <CartSvg />
    //                                     </div>
    //                                     <button>Buy Now</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className={styles.description}>
    //                         <h2>Description</h2>
    //                         <p>
    //                             Lorem ipsum dolor sit amet, consectetur
    //                             adipiscing elit. Id urna proin elit vestibulum
    //                             imperdiet proin elementum scelerisque amet.
    //                             Senectus morbi fringilla volutpat fermentum,
    //                             blandit blandit risus tellus dui. Integer nisl
    //                             arcu montes, quis suspendisse. Nec fringilla
    //                             egestas nulla adipiscing vitae iaculis viverra
    //                             cras. Sed egestas aliquam phasellus nulla nisi
    //                             leo orci nec. Vitae pulvinar sed pharetra,
    //                             aliquet ipsum viverra odio mi. Quisque arcu, mi
    //                             mollis laoreet est, fringilla eleifend ut elit.
    //                             Id vulputate viverra mi nibh cum pellentesque
    //                             risus urna. Morbi condimentum malesuada
    //                             suspendisse vulputate blandit elementum. Est
    //                             arcu eget orci, ultrices purus odio gravida
    //                             aliquet. Semper sed mi odio feugiat neque amet
    //                             et, id vitae. Quam velit porta mauris
    //                             pellentesque feugiat ornare pellentesque amet,
    //                             dignissim. Elementum vitae vitae elementum, arcu
    //                             ut nunc eget tellus, nulla. Nulla molestie morbi
    //                             mollis sit tellus sit risus maecenas id. Hac
    //                             nunc eleifend dui pharetra etiam mi cursus risus
    //                             adipiscing. Urna aliquet et elit augue. Accumsan
    //                             dignissim mi tristique ut. Aliquam orci
    //                             sagittis, dui erat et tempus posuere vestibulum
    //                             euismod. Nam malesuada dis bibendum aliquet
    //                             netus in felis aliquam. Id mollis condimentum
    //                             leo laoreet sed. Ut nisl enim dolor nibh
    //                             elementum. Aenean viverra.
    //                         </p>
    //                     </div>
    //                     <div className={styles.retailerDiv}>
    //                         <div className={styles.firstRetailerDiv}></div>
    //                         <div className={styles.secondRetailerDiv}>
    //                             <h2>Retailer’s Information</h2>
    //                             <div className={styles.retailerCont}>
    //                                 <img
    //                                     src="./Assets/Images/retailerImg.png"
    //                                     alt=""
    //                                 />
    //                                 <div className={styles.retailerWrapper}>
    //                                     <h3>{title}</h3>
    //                                     <div className={styles.retailerInfo}>
    //                                         <div
    //                                             className={
    //                                                 styles.retailerInfoDiv
    //                                             }
    //                                         >
    //                                             <PhoneSvg color="#6CCF00" />
    //                                             <p>08163546585</p>
    //                                         </div>
    //                                         <div
    //                                             className={
    //                                                 styles.retailerSocials
    //                                             }
    //                                         >
    //                                             <WhatsappSvg />
    //                                             <FacebookSvg />
    //                                             <InstagramSvg />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className={styles.previewBody}>
    //                         <h2 className={styles.customer}>
    //                             Customer also viewed this
    //                         </h2>
    //                         <div>
    //                             {previewDetails?.map((details, index) => {
    //                                 return (
    //                                     <div
    //                                         className={styles.previewSingle}
    //                                         key={index}
    //                                         onClick={() => {
    //                                             setPage(page + 1);
    //                                             setPreviewText(details.name);
    //                                         }}
    //                                     >
    //                                         <div
    //                                             className={
    //                                                 styles.previewWrapper
    //                                             }
    //                                         >
    //                                             <img src={details.img} alt="" />
    //                                             <span>
    //                                                 <FavoriteSvg />
    //                                             </span>
    //                                             <div
    //                                                 className={
    //                                                     styles.previewDetails
    //                                                 }
    //                                             >
    //                                                 <h2>{details.name}</h2>
    //                                                 <p>{details.price}</p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 );
    //                             })}
    //                         </div>
    //                     </div>
    //                 </>
    //             );
    //     }
    // };
    return (
        <DashLayout
            page={headTitle}
            text={title}
            action={() => {
                setPage(page - 1);
                setHeadTitle('Storefront');
                setPreviewSingle(false);
            }}
            preview={preview}
            previewSingle={previewSingle}
            productAction={() => {
                setPage(page - 3);
                setPreview(false);
            }}
        >
            {multi()}
        </DashLayout>
    );
};

export default Storefront;

const TableDetail = ({ header, storeName, orders, link, action }) => {
    return (
        <>
            {header === 'Header' ? (
                <div className={styles.TableDetailHead} key="1">
                    <p className={styles.name}>Name</p>
                    <p className={styles.orders}>Orders</p>
                    <p className={styles.link}>Link</p>
                    <p className={styles.status}>Status</p>
                </div>
            ) : (
                <div className={styles.TableDetailBody} key="1">
                    <p className={styles.bodyName} onClick={action}>
                        {storeName}
                    </p>
                    <p className={styles.orders}>{orders}</p>
                    <p className={styles.link}>{link}</p>
                    <div className={styles.statusBody}>
                        <label className={styles.beneCheck}>
                            <input type="checkbox" />
                            <span>
                                <i></i>
                            </span>
                        </label>
                    </div>
                </div>
            )}
        </>
    );
};
