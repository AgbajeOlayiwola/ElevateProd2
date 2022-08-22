import React, { useState } from 'react';
import styles from './styles.module.css';
import DounutComp from '../../components/ReusableComponents/Chart/Dougnut';
import AccountUpgradeSingle from '../../components/ReusableComponents/AccountUpgradeSingle';
import AddressSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddressSvg';
import BillSvg from '../../components/ReusableComponents/ReusableSvgComponents/BillSvg';
import IdCard from '../../components/ReusableComponents/ReusableSvgComponents/IdCardSvg';
import AccountUpgradeComponent from '../../components/ReusableComponents/AccountUpgradeComponent';
import { useRouter } from 'next/router';
import CircleSvg from '../../components/ReusableComponents/ReusableSvgComponents/CircleSvg';
import { location } from '../../components/ReusableComponents/Data';
import DirectorsSvg from '../../components/ReusableComponents/ReusableSvgComponents/DirectorsSvg';
import SignatureRuleSvg from '../../components/ReusableComponents/ReusableSvgComponents/SignatureRuleSvg';

const AccountUpgrade = () => {
    const router = useRouter();

    const [text, setText] = useState('Corporate');
    const [title, setTitle] = useState('First');
    const [photoStatus, setPhotoStatus] = useState(false);
    const [addressStatus, setAddressStatus] = useState(false);
    const [director, setDirector] = useState(false);
    const AccountUpgradeData = {
        individual: [
            {
                title: 'Verify your Address',
                icon: <AddressSvg />
            },
            {
                title: 'Upload Utility BIll',
                icon: <BillSvg />
            },
            {
                title: 'Upload ID Card',
                icon: <IdCard />
            }
        ],
        corporate: [
            {
                title: 'Document',
                icon: <AddressSvg />
            },
            {
                title: 'Upload Utility BIll',
                icon: <BillSvg />
            },
            {
                title: 'Upload ID Card',
                icon: <IdCard />
            },
            {
                title: 'Directors',
                icon: <DirectorsSvg />
            },
            {
                title: 'Signature Rule',
                icon: <SignatureRuleSvg />
            }
        ]
    };
    switch (title) {
        case 'First':
            return (
                <AccountUpgradeComponent
                    title={
                        text === 'Individual'
                            ? 'Individual Account Upgrade'
                            : text === 'Corporate'
                            ? 'Corporate Account Upgrade'
                            : null
                    }
                    action={() => {
                        router.push('./Dashboard');
                    }}
                >
                    <div className={styles.currentLevel}>
                        <div className={styles.currentLevelDonut}>
                            <DounutComp />
                            <p className={styles.perc}>70%</p>
                        </div>
                        <div className={styles.currentLeveltext}>
                            <h2>You’re currently at Level xxx</h2>
                            <div>
                                <p>Account Limit: N1,000,000 </p> .
                                <p>Loan Limit: xxxxxx</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.verifyText}>
                        <p>
                            We need to verity your information, please submit
                            the documents below to process your account upgrade.
                        </p>
                    </div>
                    {text === 'Individual'
                        ? AccountUpgradeData.individual.map((item, index) => {
                              return (
                                  <AccountUpgradeSingle
                                      statusInfo="Pending"
                                      icon={item.icon}
                                      text={item.title}
                                      key={index}
                                      action={() => {
                                          setTitle(item.title);
                                      }}
                                  />
                              );
                          })
                        : text === 'Corporate'
                        ? AccountUpgradeData.corporate.map((item, index) => {
                              return (
                                  <AccountUpgradeSingle
                                      statusInfo="Pending"
                                      icon={item.icon}
                                      text={item.title}
                                      key={index}
                                      action={() => {
                                          setTitle(item.title);
                                      }}
                                  />
                              );
                          })
                        : null}
                    <button>Done</button>
                </AccountUpgradeComponent>
            );
        case 'Verify your Address':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Utility"
                ></AccountUpgradeComponent>
            );
        case 'Upload Utility BIll':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Utility"
                >
                    <div className={styles.utilityHeader}>
                        <CircleSvg
                            action={() => {
                                setPhotoStatus(!photoStatus);
                            }}
                            circleStatus={photoStatus}
                        />
                        <p>Upload Photo</p>
                    </div>
                    <div className={styles.uploadPhoto}>
                        <div
                            className={
                                photoStatus === false ? styles.grey : null
                            }
                        ></div>
                        <h2>Kindly tap to upload photo</h2>
                        <label>
                            <input type="file" /> Tap to Upload
                        </label>
                        <p>Valid period: Not more than 6 months</p>
                    </div>
                    <div className={styles.utilityHeader}>
                        <CircleSvg
                            action={() => {
                                setAddressStatus(!addressStatus);
                            }}
                            circleStatus={addressStatus}
                        />
                        <p>Enter Address</p>
                    </div>
                    <div className={styles.addressBody}>
                        <div className={styles.addressCont}>
                            <div
                                className={
                                    addressStatus === false ? styles.grey : null
                                }
                            ></div>
                            <div className={styles.addressGroup}>
                                <label>Street Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Street Name"
                                />
                            </div>
                            <div className={styles.addressGroup}>
                                <label>State</label>
                                <select name="" id="">
                                    <option value="">Select State</option>
                                    {location?.map((state, index) => {
                                        return (
                                            <option
                                                value={state.state}
                                                key={index}
                                            >
                                                {state.state}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={styles.addressGroup}>
                                <label>City</label>
                                <input type="text" placeholder="Enter City" />
                            </div>
                            <div className={styles.addressGroup}>
                                <label>Local Government Area (LGA)</label>
                                <select name="" id="">
                                    <option value="">Select LGA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button>Update Profile</button>
                </AccountUpgradeComponent>
            );
        case 'Upload ID Card':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Means of Identification"
                >
                    <div className={styles.idPhoto}></div>
                    <div className={styles.meansIdentification}>
                        <div className={styles.identificationGroup}>
                            <label>Choose Means of Identification</label>
                            <select name="" id="">
                                <option value="">Select regulatory ID</option>
                            </select>
                        </div>
                        <div className={styles.identificationGroup}>
                            <label>ID Number</label>
                            <input type="text" placeholder="Enter ID  Number" />
                        </div>
                    </div>
                    <div className={styles.signature}>
                        <h2>Your Signature</h2>
                        <div className={styles.signatureGroup}>
                            <p>
                                Kindly scan your signature or sign
                                electronically
                            </p>
                            <label>
                                <input type="file" /> Tap to Upload
                            </label>
                        </div>
                    </div>
                    <button>Update Profile</button>
                </AccountUpgradeComponent>
            );
        case 'Document':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Documents"
                >
                    <div className={styles.rcNumber}>
                        <label>RC Number/Business Registration Number</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="rc123456789"
                        />
                    </div>
                    <div className={styles.documentSingle}>
                        <label>
                            Upload SCUML certificate <span>(optional)</span>
                        </label>
                        <div className={styles.documentCont}>
                            <p>Kindly tap to upload your SCUML certificate</p>
                            <label>
                                <input type="file" /> Tap to Upload
                            </label>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <label>Upload MEMART</label>
                        <div className={styles.documentCont}>
                            <p>Kindly tap to upload your MEMART</p>
                            <div className={styles.share}>
                                <div>
                                    <label>
                                        <input type="" /> Tap to Share
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="file" /> Tap to Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <label>Share Reference Form</label>
                        <div className={styles.documentCont}>
                            <p>Kindly tap to share and upload your Reference</p>
                            <div className={styles.share}>
                                <div>
                                    <label>
                                        <input type="" /> Tap to Share
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="file" /> Tap to Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <label>Upload Board Resolution</label>
                        <div className={styles.documentCont}>
                            <p>Kindly tap to upload Board Resolution</p>
                            <label>
                                <input type="file" /> Click to Upload
                            </label>
                        </div>
                    </div>
                    <button>Update Profile</button>
                </AccountUpgradeComponent>
            );
        case 'Directors':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Directors"
                >
                    <div className={styles.directorsSingle}>
                        <p>Director 1</p>
                        <div className={styles.directorsBody}>
                            <div className={styles.directorsGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Full name"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Make Signatory</label>
                                <div className={styles.radio}>
                                    <div>
                                        <input type="radio" name="signatory" />
                                        <p>Yes</p>
                                    </div>
                                    <div>
                                        <input type="radio" name="signatory" />
                                        <p>No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.directorsSingle}>
                        <p>Director 2</p>
                        <div className={styles.directorsBody}>
                            <div className={styles.directorsGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Full name"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Make Signatory</label>
                                <div className={styles.radio}>
                                    <div>
                                        <input type="radio" name="signatory" />
                                        <p>Yes</p>
                                    </div>
                                    <div>
                                        <input type="radio" name="signatory" />
                                        <p>No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p
                        className={styles.addNew}
                        onClick={() => {
                            setDirector(!director);
                        }}
                    >
                        + Add New
                    </p>
                    {director ? (
                        <div className={styles.directorsSingle}>
                            <p>Director 3</p>
                            <div className={styles.directorsBody}>
                                <div className={styles.directorsGroup}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Full name"
                                    />
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Phone Number"
                                    />
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Make Signatory</label>
                                    <div className={styles.radio}>
                                        <div>
                                            <input
                                                type="radio"
                                                name="signatory"
                                            />
                                            <p>Yes</p>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="signatory"
                                            />
                                            <p>No</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <button>Send Invite</button>
                </AccountUpgradeComponent>
            );
    }
};

export default AccountUpgrade;
