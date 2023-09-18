import Image from 'next/image';
import React, { useState } from 'react';
import DashLayout from '../../../components/layout/Dashboard';
import ProfileLayout from '../../../components/layout/ProfileLayout';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import CustomerSingle from '../../../components/ReusableComponents/CustomerSingle';
import BusinessSvg from '../../../components/ReusableComponents/ReusableSvgComponents/BusinessSvg';
import CardsSvg from '../../../components/ReusableComponents/ReusableSvgComponents/CardsSvg';
import Cheques from '../../../components/ReusableComponents/ReusableSvgComponents/Cheques';
import DisputeSvg from '../../../components/ReusableComponents/ReusableSvgComponents/DisputeSvg';
import EditProfileSvg from '../../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import FXSalesSvg from '../../../components/ReusableComponents/ReusableSvgComponents/FXSalesSvg';
import RmSvg from '../../../components/ReusableComponents/RmSvg';
import styles from './styles.module.css';

const Customer = () => {
    const [text, setText] = useState('Manage Cards');
    const [pickupMode, setPickupMode] = useState('');
    const [type, setType] = useState('');
    const [count, setCount] = useState(0);
    const profileData = [
        {
            text: 'Manage Cards',
            icon: <CardsSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Cheques',
            icon: <Cheques />,
            color: '#7A7978'
        },
        {
            text: 'Manage Disputes',
            icon: <DisputeSvg />,
            color: '#7A7978'
        },
        {
            text: 'Create Additional Account',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        {
            text: 'Schedule Business Advisory Session',
            icon: <BusinessSvg />,
            color: '#7A7978'
        },
        {
            text: 'FX Sales',
            icon: <FXSalesSvg />,
            color: '#7A7978'
        },

        {
            text: 'KYC Update',
            icon: <RmSvg />,
            color: '#7A7978'
        }
    ];
    const renderForm = () => {
        switch (text) {
            case 'Manage Cards':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>Manage Cards</h2>
                                {/* <div className={styles.profileBodyHead}>
                                    <div className={styles.profileBodyHeadImg}>
                                        <img
                                            src="/Assets/Images/profileImg.png"
                                            width="100%"
                                            height="100%"
                                            layout="responsive"
                                        />
                                    </div>
                                    <div className={styles.groupForm}>
                                        <div className={styles.formGroup}>
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Babatune Abiodun"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="babatuneabiodun@gmail.com"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Phone Number</label>
                                            <div className={styles.phone}>
                                                <div
                                                    className={
                                                        styles.phoneHeader
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            src={
                                                                countryNames
                                                                    .flags.svg
                                                            }
                                                            alt=""
                                                        />
                                                    </span>
                                                    <p>
                                                        {
                                                            countryNames.baseCurrency
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        styles.phoneDetails
                                                    }
                                                >
                                                    <p>{countryNames.countryCode}</p>
                                                    <input
                                                        type="number"
                                                        placeholder="812 345 6789"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.profileBodyButton}
                                        >
                                            <button>Save Changes</button>
                                        </div>
                                    </div>
                                </div> */}
                            </>
                        );
                    // case 1:
                    //     return <OtpForm overlay={overlay} />;
                }

            case 'Manage Cheques':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>Manage Cheques</h2>
                                <p className={styles.confirmCheque}>
                                    Confirm and Request Cheque Books from your
                                    Ellevate account. Tap Requested Cheque to
                                    confirm.
                                </p>
                                <img
                                    src="/Assets/Images/chequeBook.png"
                                    alt=""
                                    className={styles.chequeImg}
                                />
                                <div className={styles.chequeButton}>
                                    <button
                                        onClick={() => {
                                            setCount(count + 1);
                                            setType('Request');
                                        }}
                                    >
                                        Request New Cheque Book
                                    </button>
                                </div>
                                <div className={styles.confirmChequeButton}>
                                    <button
                                        onClick={() => {
                                            setCount(count + 1);
                                            setType('Confirm');
                                        }}
                                    >
                                        Confirm Cheque Book
                                    </button>
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <>
                                {type === 'Request' ? (
                                    <>
                                        <h2 className={styles.title}>
                                            <span>
                                                <ArrowBackSvg
                                                    color="#878787"
                                                    action={() => {
                                                        setCount(count - 1);
                                                    }}
                                                />
                                            </span>
                                            Request Cheque Book
                                        </h2>
                                        <div className={styles.customerForm}>
                                            <form>
                                                <div
                                                    className={
                                                        styles.customerFormGroup
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Account Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Account Number"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Choose No. of Cheque
                                                            Book
                                                        </label>
                                                        <select name="" id="">
                                                            <option value="">
                                                                Select No. of
                                                                Cheque Book
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.customerFormGroup
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Choose PickUp Mode
                                                        </label>
                                                        <select
                                                            name=""
                                                            id=""
                                                            onChange={(e) => {
                                                                setPickupMode(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            <option value="">
                                                                Select Pickup
                                                                Mode
                                                            </option>
                                                            <option value="In Branch">
                                                                In Branch
                                                            </option>
                                                            <option value="Doorstep Delivery">
                                                                Doorstep
                                                                Delivery
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {pickupMode ===
                                                    'Doorstep Delivery' ? (
                                                        <div
                                                            className={
                                                                styles.formGroup
                                                            }
                                                        >
                                                            <label>
                                                                Total Amount of
                                                                Charge
                                                            </label>
                                                            <select
                                                                name=""
                                                                id=""
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    Amount of
                                                                    Charge
                                                                </option>
                                                            </select>
                                                        </div>
                                                    ) : pickupMode ===
                                                      'In Branch' ? (
                                                        <div
                                                            className={
                                                                styles.formGroup
                                                            }
                                                        >
                                                            <label>
                                                                Choose Pickup
                                                                Branch
                                                            </label>
                                                            <select
                                                                name=""
                                                                id=""
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    Pickup
                                                                    Branch
                                                                </option>
                                                            </select>
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div
                                                    className={
                                                        styles.profileBodyButton
                                                    }
                                                >
                                                    <button>Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                ) : type === 'Confirm' ? (
                                    <>
                                        <h2>
                                            <span>
                                                <ArrowBackSvg
                                                    color="#878787"
                                                    action={() => {
                                                        setCount(count - 1);
                                                    }}
                                                />
                                            </span>
                                            Confirm Cheque Book
                                        </h2>
                                        <div className={styles.customerForm}>
                                            <form>
                                                <div
                                                    className={
                                                        styles.customerFormGroup
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Account Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Account Number"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>Cheque No</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Cheque Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.customerFormGroup
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Cheque Date
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="DD  |  MM  |  YYYY"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>Amount</label>
                                                        <input
                                                            type="text"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.customerFormGroup
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>Payee</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Payee"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>Remark</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Remark"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.profileBodyButton
                                                    }
                                                >
                                                    <button>
                                                        Confirm Cheque
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                ) : null}
                            </>
                        );
                }
            case 'Manage Disputes':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>
                                    Initiate Dispute
                                </h2>
                                <div className={styles.disputeCont}>
                                    <form action="">
                                        <div className={styles.formGroup}>
                                            <label>Transaction Amount</label>
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>
                                                Transaction Ref. Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Ref. Number"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Transaction Date</label>
                                            <input
                                                type="text"
                                                placeholder="DD  |  MM |  YYYY"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Transaction Date</label>
                                            <textarea
                                                name=""
                                                id=""
                                                placeholder="Enter Transaction Description"
                                            ></textarea>
                                        </div>
                                        <div
                                            className={styles.profileBodyButton}
                                        >
                                            <button>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        );
                    case 1:
                        return <></>;
                }
        }
    };
    return (
        // <DashLayout page="Customer Self Service">
        <ProfileLayout
            head={profileData?.map((profile, index) => {
                return (
                    <CustomerSingle
                        key={index}
                        profileText={profile.text}
                        icon={profile.icon}
                        color={profile.color}
                        action={() => {
                            setText(profile.text);
                            setCount(0);
                        }}
                    />
                );
            })}
        >
            {renderForm()}
        </ProfileLayout>
    );
};

export default Customer;
