import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { IoArrowBack, IoMailOutline } from 'react-icons/io5';
import { MdContentCopy, MdOutlineLocalPhone, MdShare } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDeletStorefrontMutation } from '../../../../redux/api/authApi';
import BvnSvg from '../../../ReusableComponents/BvnSvg';
import CustomerSingle from '../../../ReusableComponents/CustomerSingle';
import InputFile from '../../../ReusableComponents/InputFile';
import Loader from '../../../ReusableComponents/Loader';
import CustomizeSvg from '../../../ReusableComponents/ReusableSvgComponents/CustomizeSvg';
import PlusSvg from '../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import StoreOrdersSvg from '../../../ReusableComponents/ReusableSvgComponents/StoreOrdersSvg';
import ProfileLayout from '../../ProfileLayout';
import Inventory from '../Inventory';
import EditSvg from '../editSvg';
import CustomizeStoreFront from './CustomizeStorefront';
import Orders from './Orders';
import styles from './styles.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditStores = ({ showProduct, inventory, nextPage, goBackward }) => {
    const { storeSlice } = useSelector((store) => store);
    const [preview, setPreview] = useState(false);
    const [previewSingle, setPreviewSingle] = useState(false);
    const [previewAll, setPreviewAll] = useState(true);
    const [previewTop, setPreviewTop] = useState(false);
    const [previewRec, setPreviewRec] = useState(false);
    const [previewClear, setPreviewClear] = useState(false);
    const [previewText, setPreviewText] = useState('');
    const [sizeActive, setSizeActive] = useState('XS');
    const [logo, setLogo] = useState('');
    const [editBanner, setEditBanner] = useState(false);
    const [editLogo, setEditLogo] = useState(false);
    const [actionText, setActionText] = useState('Customize Storefront');
    const [editNameDesc, setEditNameDesc] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
    const [name, setName] = useState(storeSlice?.storeFrontName);
    const [description, setDescription] = useState(
        storeSlice?.storeFrontDescription
    );
    const [logoImag, setLogoImage] = useState(storeSlice?.logo);
    const [bannerImagee, setBannerImage] = useState(storeSlice?.banner);
    const [email, setEmail] = useState(storeSlice?.email);
    const [facebookLink, setFacebookLink] = useState(storeSlice?.facebookLink);
    const [instaLink, setInstaLink] = useState();
    const [whatsaplink, setWhatsappLink] = useState(storeSlice?.whatsappLink);
    const [banner, setBanner] = useState('');
    const [title, setTitle] = useState('');
    const [orderType, setOrderType] = useState('Open');
    const [headTitle, setHeadTitle] = useState('Storefront');
    const [checkd, setChecked] = useState(true);
    const router = useRouter();
    const [alert, setAlert] = useState(false);
    console.log(storeSlice);
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

    const [
        deletStorefront,
        {
            data: deletStorefrontData,
            isLoading: deletStorefrontLoad,
            isSuccess: deletStorefrontSuccess,
            isError: deletStorefrontFalse,
            error: deletStorefrontErr,
            reset: deletStorefrontReset
        }
    ] = useDeletStorefrontMutation();
    useEffect(() => {
        if (deletStorefrontSuccess) {
            goBackward();
        }
    }, [deletStorefrontSuccess]);
    const onImageUrlChangeBanner = (data) => {
        setBannerImage(data.replace('data:image/png;base64,', ''));
    };
    const onImageUrlChange = (data) => {
        setLogoImage(data.replace('data:image/png;base64,', ''));
    };
    const loremIpsumText = storeSlice?.storeFrontDescription;
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    const displayedText = showFullText
        ? loremIpsumText
        : `${loremIpsumText.slice(0, 100)}...`;

    const [phoneNumbers, setPhoneNumbers] = useState(
        storeSlice?.phoneNumbers || ['']
    );

    useEffect(() => {
        // Update state when storeSlice changes
        setPhoneNumbers(storeSlice?.phoneNumbers || ['']);
    }, [storeSlice]);

    const handlePhoneNumberChange = (index, value) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers[index] = value;
        setPhoneNumbers(updatedPhoneNumbers);
    };

    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const handleRemovePhoneNumber = (index) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers.splice(index, 1);
        setPhoneNumbers(updatedPhoneNumbers);
    };

    const handleSubmit = () => {
        // Handle submission of phoneNumbers
        console.log(phoneNumbers);
        // Add logic to send data to the server or perform other actions
    };
    const [sure, setSure] = useState(false);
    const showToastMessage = () => {
        toast.success('Storefront Link Copied', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };

    return (
        <>
            <ToastContainer />
            {sure ? (
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <h2>Delete Store front</h2>
                        <p>ARe you sure you wanrt to delete storfront</p>
                        <div className={styles.delDiv}>
                            <div
                                onClick={() => {
                                    setSure(false);
                                }}
                            >
                                Cancel
                            </div>
                            <div
                                onClick={() => {
                                    deletStorefront({
                                        storeFrontId: storeSlice?.id
                                    });
                                }}
                            >
                                {deletStorefrontLoad ? <Loader /> : 'Delete'}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className={styles.top}>
                <div className={styles.Name} onClick={() => goBackward()}>
                    <IoArrowBack />
                    <p>{storeSlice?.storeFrontName}</p>
                </div>
                <div className={styles.del} onClick={() => setSure(true)}>
                    Delete store front
                </div>
            </div>
            <ProfileLayout
                head={
                    <>
                        <div className={styles.profileHeaderHead}>
                            <div
                                className={styles.editbtn}
                                onClick={() => {
                                    setEditBanner((prev) => !prev);
                                }}
                            >
                                <EditSvg />
                            </div>
                            <div>
                                {editBanner ? (
                                    <InputFile
                                        icon={<PlusSvg />}
                                        name="Upload your store banner"
                                        disclaimer=""
                                        uploadLabel="Click to add a banner"
                                        logoBanner="banner"
                                        onImageUrlChange={
                                            onImageUrlChangeBanner
                                        }
                                    />
                                ) : (
                                    <Image
                                        src={`data:image/png;base64,${bannerImagee}`}
                                        width="100%"
                                        height="30px"
                                        layout="responsive"
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.subProfileHead}>
                            <div className={styles.accountNumber}>
                                <div className={styles.logoDIv}>
                                    <div
                                        className={styles.Logoeditbtn}
                                        onClick={() => {
                                            setEditLogo((prev) => !prev),
                                                console.log(editBanner);
                                        }}
                                    >
                                        <EditSvg />
                                    </div>
                                    {editLogo ? (
                                        <div className={styles.logoUpload}>
                                            <InputFile
                                                icon={<PlusSvg />}
                                                name=""
                                                disclaimer=""
                                                uploadLabel=""
                                                logoBanner="logo"
                                                logoChange={true}
                                                onImageUrlChange={
                                                    onImageUrlChange
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src={`data:image/png;base64,${logoImag}`}
                                            width={78}
                                            height={70}
                                            alt="logo"
                                        />
                                    )}
                                </div>
                                <div>
                                    <div
                                        className={styles.accountNumberCopy}
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(
                                                        `${storeSlice?.storeFrontLink}`
                                                    )
                                                    .then(() => {
                                                        setAlert(true);
                                                        setTimeout(() => {
                                                            setAlert(false);
                                                        }, 1500);
                                                    });
                                            }
                                            showToastMessage();
                                        }}
                                    >
                                        Share link
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.freezeAccount}>
                            <div
                                className={styles.Logoeditbtn}
                                onClick={() => {
                                    setEditNameDesc((prev) => !prev),
                                        console.log(editBanner);
                                }}
                            >
                                {/* <EditSvg /> */}
                            </div>
                            {/* {editNameDesc ? (
                                <>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <br />
                                    <textarea
                                        cols={8}
                                        rows={8}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </>
                            ) : ( */}
                            <>
                                <h1>{name}</h1>
                                <div className={styles.saveBene}>
                                    <p>{displayedText}</p>
                                    {loremIpsumText?.length > 100 && (
                                        <p
                                            onClick={toggleShowFullText}
                                            className={styles.seeMore}
                                        >
                                            {showFullText
                                                ? 'See less'
                                                : 'See more'}
                                        </p>
                                    )}
                                </div>
                            </>
                            {/* )} */}
                        </div>
                        <br />
                        <div className={styles.info}>
                            <div
                                className={styles.Logoeditbtn}
                                onClick={() => setEditInfo((prev) => !prev)}
                            >
                                <EditSvg />
                            </div>
                            {editInfo ? (
                                <>
                                    <div className={styles.links}>
                                        <label>whatsapp link</label>
                                        <input
                                            type="text"
                                            placeholder="whatsaplink"
                                            value={whatsaplink}
                                            onChange={(e) =>
                                                setWhatsappLink(e.target.value)
                                            }
                                        />
                                        <br />
                                        <label>facebook</label>
                                        <input
                                            type="text"
                                            placeholder="facebooklink"
                                            value={facebookLink}
                                            onChange={(e) =>
                                                setFacebookLink(e.target.vale)
                                            }
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.links}>
                                        <label>Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            type="text"
                                            placeholder="email"
                                        />
                                        <div>
                                            {phoneNumbers.map(
                                                (phoneNumber, index) => (
                                                    <div key={index}>
                                                        <input
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            value={phoneNumber}
                                                            onChange={(e) =>
                                                                handlePhoneNumberChange(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                styles.remove
                                                            }
                                                            onClick={() =>
                                                                handleRemovePhoneNumber(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            <div className={styles.addSubmit}>
                                                <div
                                                    type="button"
                                                    onClick={
                                                        handleAddPhoneNumber
                                                    }
                                                >
                                                    Add Phone Number
                                                </div>
                                                <div
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Submit
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.link}>
                                        <p>
                                            <BsInstagram />
                                            {whatsaplink}
                                        </p>

                                        <p>
                                            <BsTwitterX />
                                            {facebookLink}
                                        </p>
                                    </div>
                                    <div className={styles.link}>
                                        <p>
                                            <IoMailOutline />
                                            {email}
                                        </p>

                                        {storeSlice?.phoneNumbers?.map(
                                            (phone) => {
                                                return (
                                                    <p>
                                                        <MdOutlineLocalPhone />
                                                        {phone}
                                                    </p>
                                                );
                                            }
                                        )}
                                        <a
                                            href={storeSlice?.storeFrontLink}
                                            target="_blank"
                                        >
                                            <MdOutlineLocalPhone />
                                            Store link
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
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
                                            active={
                                                actionText === store?.title
                                                    ? true
                                                    : false
                                            }
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
                                    <div
                                        className={styles.accountNumberCopy}
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(
                                                        `${storeSlice?.storeFrontLink}`
                                                    )
                                                    .then(() => {
                                                        setAlert(true);
                                                        setTimeout(() => {
                                                            setAlert(false);
                                                        }, 1500);
                                                    });
                                            }
                                            showToastMessage();
                                        }}
                                    >
                                        <MdContentCopy />
                                        Copy link
                                    </div>
                                    <div
                                        className={styles.accountNumberCopy}
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(
                                                        `${storeSlice?.storeFrontLink}`
                                                    )
                                                    .then(() => {
                                                        setAlert(true);
                                                        setTimeout(() => {
                                                            setAlert(false);
                                                        }, 1500);
                                                    });
                                            }
                                            showToastMessage();
                                        }}
                                    >
                                        <MdShare />
                                        Share storefront link
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <button
                                className={styles}
                                onClick={() => {
                                    setPreview(true);
                                    router.push({
                                        pathname: '/Admin/Storefront/store',
                                        query: { id: storeSlice?.id }
                                    });
                                    // setPage(page + 3);
                                }}
                            >
                                Preview Storefront
                            </button>
                        </div>
                    </>
                }
            >
                {actionText === 'Customize Storefront' ? (
                    <CustomizeStoreFront
                        actionText={actionText}
                        storeSlice={storeSlice}
                        banner={bannerImagee}
                        logo={logoImag}
                        email={email}
                        whatsapp={whatsaplink}
                        instagram={instaLink}
                        facebook={facebookLink}
                        phone={phoneNumbers}
                        goBackTostore={() => goBackward()}
                    />
                ) : actionText === 'Inventory' ? (
                    <Inventory
                        storeSlice={storeSlice}
                        actionText={actionText}
                        showProduct={showProduct}
                        nextPage={nextPage}
                    />
                ) : actionText == 'Orders' ? (
                    <Orders actionText={actionText} />
                ) : actionText === 'Logistics' ? (
                    <h2 className={styles.actionText}>{actionText}</h2>
                ) : null}
            </ProfileLayout>
        </>
    );
};

export default EditStores;
