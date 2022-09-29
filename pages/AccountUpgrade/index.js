import React, { useState } from 'react';
import styles from './styles.module.css';
import DounutComp from '../../components/ReusableComponents/Chart/Dougnut';
import AccountUpgradeSingle from '../../components/ReusableComponents/AccountUpgradeSingle';
import AddressSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddressSvg';
import BillSvg from '../../components/ReusableComponents/ReusableSvgComponents/BillSvg';
import IdCard from '../../components/ReusableComponents/ReusableSvgComponents/IdCardSvg';
import AccountUpgradeComponent from '../../components/ReusableComponents/AccountUpgradeComponent';
import { useRouter } from 'next/router';
import { location } from '../../components/ReusableComponents/Data';
import DirectorsSvg from '../../components/ReusableComponents/ReusableSvgComponents/DirectorsSvg';
import SignatureRuleSvg from '../../components/ReusableComponents/ReusableSvgComponents/SignatureRuleSvg';
import { useEffect } from 'react';

const AccountUpgrade = () => {
    const router = useRouter();

    const [text, setText] = useState('Individual');
    const [title, setTitle] = useState('First');
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
                    <button className={styles.buttonDone}>Done</button>
                </AccountUpgradeComponent>
            );
        case 'Verify your Address':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Verify your Address"
                >
                    <div className={styles.verifyBody}>
                        <p>
                            Provide the address you previously entered while
                            registering for verification.
                        </p>
                        <div className={styles.addressBody}>
                            <div className={styles.addressGroup}>
                                <label>Street </label>
                                <input
                                    type="text"
                                    placeholder="Enter Street "
                                />
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Landmark</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Landmark"
                                        />
                                    </div>
                                </div>

                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>State</label>
                                        <select name="" id="">
                                            <option value="">
                                                Select State
                                            </option>
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
                                </div>
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            placeholder="Enter City"
                                        />
                                    </div>
                                </div>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Local Government Area</label>
                                        <select name="" id="">
                                            <option value="">Select LGA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={test}>Confirm Address</button>
                    </div>
                </AccountUpgradeComponent>
            );
        case 'Upload Utility BIll':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Utility"
                >
                    <div className={styles.utilityBody}>
                        <div className={styles.signatureGroup}>
                            <p>Upload Photo</p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <label>
                                    <input type="file" /> Upload
                                </label>
                            </div>
                        </div>
                        <div className={styles.addressBody}>
                            <div className={styles.addressGroup}>
                                <label>Street </label>
                                <input
                                    type="text"
                                    placeholder="Enter Street "
                                />
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Landmark</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Landmark"
                                        />
                                    </div>
                                </div>

                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>State</label>
                                        <select name="" id="">
                                            <option value="">
                                                Select State
                                            </option>
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
                                </div>
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            placeholder="Enter City"
                                        />
                                    </div>
                                </div>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Local Government Area</label>
                                        <select name="" id="">
                                            <option value="">Select LGA</option>
                                        </select>
                                    </div>
                                </div>
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
                        <div className={styles.signatureGroup}>
                            <p>Upload Signature</p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <label>
                                    <input type="file" /> Upload
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className={styles.updateBtn}>Update Profile</button>
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
                        <div className={styles.signatureGroup}>
                            <p>
                                Upload SCUML Certificate <span>(optional)</span>{' '}
                            </p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <label>
                                    <input type="file" /> Upload
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <div className={styles.signatureGroup}>
                            <p>Upload MEMART</p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <div>
                                    <label>
                                        <input type="file" /> Share
                                    </label>
                                    <label>
                                        <input type="file" /> Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <div className={styles.signatureGroup}>
                            <p>Share Reference Form</p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <div>
                                    <label>
                                        <input type="file" /> Share
                                    </label>
                                    <label>
                                        <input type="file" /> Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.documentSingle}>
                        <div className={styles.signatureGroup}>
                            <p>Upload Board Resolution</p>
                            <div className={styles.signatureFormGroup}>
                                <p>No file chosen...</p>
                                <label>
                                    <input type="file" /> Upload
                                </label>
                            </div>
                        </div>
                    </div>
                    <button>Submit</button>
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
                        </div>
                    ) : null}
                    <button>Send Invite</button>
                </AccountUpgradeComponent>
            );
    }
};

export default AccountUpgrade;
