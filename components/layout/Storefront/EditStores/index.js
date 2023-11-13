import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdContentCopy, MdShare } from 'react-icons/md';
import BvnSvg from '../../../ReusableComponents/BvnSvg';
import CustomerSingle from '../../../ReusableComponents/CustomerSingle';
import CustomizeSvg from '../../../ReusableComponents/ReusableSvgComponents/CustomizeSvg';
import StoreLogisticsSvg from '../../../ReusableComponents/ReusableSvgComponents/StoreLogisticsSvg';
import StoreOrdersSvg from '../../../ReusableComponents/ReusableSvgComponents/StoreOrdersSvg';
import ProfileLayout from '../../ProfileLayout';
import Inventory from '../Inventory';
import styles from './styles.module.css';

const EditStores = ({ showProduct, inventory, nextPage }) => {
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
    const [checkd, setChecked] = useState(true);
    const router = useRouter();
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
    return (
        <ProfileLayout
            head={
                <>
                    <div className={styles.profileHeaderHead}>
                        <div>
                            <img
                                src="/Assets/Images/Frame.png"
                                width="100%"
                                height="100%"
                                layout="responsive"
                            />
                        </div>
                    </div>

                    <div className={styles.subProfileHead}>
                        <div className={styles.accountNumber}>
                            <div className={styles.accountNumberCopy}>
                                Share link
                            </div>
                            <label
                                className={
                                    checkd
                                        ? styles.beneChecked
                                        : styles.beneCheck
                                }
                            >
                                <input
                                    type="checkbox"
                                    // onChange={(e) => {
                                    //     if (
                                    //         profile?.user
                                    //             ?.freezeTransactions === 'N'
                                    //     ) {
                                    //         freezeAcct();
                                    //     } else if (
                                    //         profile?.user
                                    //             ?.freezeTransactions === 'Y'
                                    //     ) {
                                    //         unfreezeAcct();
                                    //     }
                                    // }}
                                />
                                <span>
                                    <i></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className={styles.freezeAccount}>
                        <h1>Isaac Stores</h1>
                        <div className={styles.saveBene}>
                            <p>
                                This is a text that describes the store. It was
                                originally entered by the vendor. It describes
                                the store. It was originally ente... see more
                            </p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={styles.hrDiv}>
                        <hr />
                    </div>
                    <br />
                    <br />
                    <div className={styles.storeWrapper}>
                        <div className={styles.storeAction}>
                            {storeAction?.map((store, index) => {
                                return (
                                    <CustomerSingle
                                        icon={store.icon}
                                        profileText={store.title}
                                        action={() => {
                                            setActionText(store.title);
                                        }}
                                        color={store.color}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                        <br />
                        <br />
                        <div className={styles.hrDiv}>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <div className={styles.share}>
                            <div className={styles.copy}>
                                <div className={styles.accountNumberCopy}>
                                    <MdContentCopy />
                                    Copy link
                                </div>
                                <div className={styles.accountNumberCopy}>
                                    <MdShare />
                                    Share storefront link
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
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
                    <h2 className={styles.actionText}>{actionText}</h2>
                    <br />
                    <br />
                    <div className={styles.hrDiv}>
                        <hr />
                    </div>
                    <br />
                    <br />
                    <div className={styles.businessLogoDiv}>
                        <img src="./Assets/Images/businessLogo.png" alt="" />
                    </div>
                    <div className={styles.customizeBody}>
                        <h2>Storefront Details</h2>
                        <div className={styles.front}>
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
                                    <label>Storefront link</label>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Phone Number"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.customizeFirst}>
                                <div className={styles.customizeForm}>
                                    <label>Store description (optional)</label>
                                    <textarea
                                        name=""
                                        id=""
                                        className={styles.area}
                                        placeholder="Tell your customer about your business"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className={styles.hrDiv}>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <div className={styles.customizeBody}>
                            <h2>FAQ</h2>
                            <div className={styles.front}>
                                <div className={styles.customizeFirst}>
                                    <div className={styles.customizeForm}>
                                        <label>Question 1</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Store Name"
                                        />
                                    </div>
                                </div>
                                <div className={styles.customizeSecond}>
                                    <div className={styles.contactForm}>
                                        <label>Answer to question 1</label>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Enter Phone Number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className={styles.hrDiv}>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <div className={styles.customizeBody}>
                            <h2>Return Policy - optional</h2>
                            <div className={styles.customizeFirst}>
                                <div className={styles.customizeForm}>
                                    <label>Your return policy</label>
                                    <textarea
                                        name=""
                                        id=""
                                        className={styles.area}
                                        placeholder="Tell your customer about your business"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={styles.customizeFirsts}>
                        <button>Save Update</button>
                    </div>
                </>
            ) : actionText === 'Inventory' ? (
                <Inventory
                    actionText={actionText}
                    showProduct={showProduct}
                    nextPage={nextPage}
                />
            ) : actionText == 'Orders' ? (
                <>
                    <h2 className={styles.actionText}>{actionText}</h2>
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
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <h3 className={styles.orderNumber}>2 Pcs</h3>
                            </div>
                            <div className={styles.inventorySingle}>
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <h3 className={styles.orderNumber}>2 Pcs</h3>
                            </div>
                            <div className={styles.inventorySingle}>
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <h3 className={styles.orderNumber}>2 Pcs</h3>
                            </div>
                        </>
                    ) : orderType === 'Close' ? (
                        <>
                            <div className={styles.inventorySingle}>
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <div className={styles.orderDuration}>
                                    <p>25-10-2022</p>
                                    <h3>Shipped</h3>
                                </div>
                            </div>
                            <div className={styles.inventorySingle}>
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <div className={styles.orderDuration}>
                                    <p>25-10-2022</p>
                                    <h3>Shipped</h3>
                                </div>
                            </div>
                            <div className={styles.inventorySingle}>
                                <div className={styles.inventorySingleFirst}>
                                    <img
                                        src="./Assets/Images/cloth.png"
                                        alt=""
                                    />
                                    <div className={styles.details}>
                                        <p className={styles.productName}>
                                            Gucci Black Shirt
                                        </p>
                                        <p className={styles.productPrice}>
                                            N10,000
                                        </p>
                                        <h5>Order #1234567890</h5>
                                    </div>
                                </div>
                                <div className={styles.orderDuration}>
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
};

export default EditStores;
