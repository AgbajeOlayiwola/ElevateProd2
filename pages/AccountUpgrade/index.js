import React, { useState } from 'react';
import styles from './styles.module.css';
import DounutComp from '../../components/ReusableComponents/Chart/Dougnut';
import AccountUpgradeSingle from '../../components/ReusableComponents/AccountUpgradeSingle';
import AddressSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddressSvg';
import BillSvg from '../../components/ReusableComponents/ReusableSvgComponents/BillSvg';
import IdCard from '../../components/ReusableComponents/ReusableSvgComponents/IdCardSvg';
import AccountUpgradeComponent from '../../components/ReusableComponents/AccountUpgradeComponent';
import { useRouter } from 'next/router';
// import { location } from '../../components/ReusableComponents/Data';
import DirectorsSvg from '../../components/ReusableComponents/ReusableSvgComponents/DirectorsSvg';
import SignatureRuleSvg from '../../components/ReusableComponents/ReusableSvgComponents/SignatureRuleSvg';
import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    cacData,
    identificationDocData,
    memartData,
    scmulData,
    uploadUtilityData,
    statesData,
    loadsetTransactionPin,
    loadUserProfile,
    uploadRefFormData
} from '../../redux/actions/actions';

import { useForm } from 'react-hook-form';
import Loader from '../../components/ReusableComponents/Loader';
import PaymentSuccess from '../../components/ReusableComponents/SuccessPage';

const AccountUpgrade = () => {
    const router = useRouter();
    const { setTransactionPin, setTransactionPinError } = useSelector(
        (state) => state.setTransactionPinReducer
    );
    const { userProfile } = useSelector((state) => state.userProfileReducer);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        dispatch(loadsetTransactionPin(data));
    };

    const transactionPin = () => {
        if (setTransactionPin !== null) {
            setMessage('Transaction Pin Set Successfully');
            setStatusbar('success');
            setTitle('Success');
            // setTitle('First');
        } else if (setTransactionPinError !== null) {
            setMessage(setTransactionPinError);
            setStatusbar('error');
            setTitle('Success');
        }
    };

    useEffect(() => {
        transactionPin();
    }, [setTransactionPin, setTransactionPinError]);
    useEffect(() => {
        dispatch(loadUserProfile());
    }, []);

    useEffect(() => {
        if (userProfile !== null) {
            setText(userProfile.customerCategory);
        }
    }, [userProfile]);
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [localState, setLocalState] = useState('');
    const [location, setLocation] = useState([]);
    const [localGovernment, setLocalGovernment] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState('');
    const [title, setTitle] = useState('First');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [director, setDirector] = useState(false);
    const [scmulfile, setScmulFile] = useState('');
    const [scmulfileName, setScmulFileName] = useState('');
    const [co2file, setCo2File] = useState('');
    const [co2FileName, setCo2FileName] = useState('');
    const [co7file, setCo7File] = useState('');
    const [co7FileName, setCo7FileName] = useState('');
    const [utilityFile, setUtilityFile] = useState('');
    const [utilityFileName, setUtilityFileName] = useState('');
    const [landMark, setLandMark] = useState('');
    const [selstate, setState] = useState('');
    const [city, setCity] = useState('');
    const [streetName, setStreetName] = useState('');
    const [localGovernmane, setLocalGovernmane] = useState('');
    const [statusbar, setStatusbar] = useState('');
    const [meansOfIdentification, setMeansOfIdentifiction] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [IDType, setIDType] = useState('');
    const [identificationDocumentFile, setIdentificationDocument] = useState(
        ''
    );
    const [
        identificationDocumentFileName,
        setIdentificationDocumentName
    ] = useState('');
    const [refoneno, setRefoneNo] = useState('');
    const [refoneemail, setRefoneEmail] = useState('');
    const [reftwono, setReftTwoNo] = useState('');
    const [reftwoemail, setRefTwoEmail] = useState('');
    const { cac, cacErrorMessages } = useSelector(
        (state) => state.cacUploadReducer
    );
    const { scmul, scmulErrorMessages } = useSelector(
        (state) => state.uploadScmulReducer
    );
    const { memart, memartErrorMessages } = useSelector(
        (state) => state.uploadMemartReducer
    );
    const { uploadRefForm, uploadRefFormErrorMessages } = useSelector(
        (state) => state.uploadMemartReducer
    );
    const { utilityUpload, utilityUplodaErrorMessages } = useSelector(
        (state) => state.uploadUtilityReducer
    );
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);
    //Cac Registratiom
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        // console.log(file);
    };
    const cacRegistration = () => {
        // console.log('test');
        const cacDatas = {
            cacCert: file
        };
        dispatch(cacData(cacDatas));
    };
    useEffect(() => {
        console.log(cac);
        console.log(cacErrorMessages);
    }, [cac, cacErrorMessages]);

    //CAC Registration end

    //SMUL Certyificate
    const saveScmulFile = (e) => {
        setScmulFile(e.target.files[0]);
        setScmulFileName(e.target.files[0].name);
    };
    const uploadScmul = () => {
        console.log('test');
        const scmulDatas = {
            scumlCert: scmulfile
        };
        dispatch(scmulData(scmulDatas));
    };
    useEffect(() => {
        console.log(scmul);
        console.log(scmulErrorMessages);
    }, [scmul, scmulErrorMessages]);

    //SCMUL Certificate end

    //Memart Submit
    const saveMemart2lFile = (e) => {
        setCo2File(e.target.files[0]);
        setCo2FileName(e.target.files[0].name);
    };
    const saveMemart7lFile = (e) => {
        setCo7File(e.target.files[0]);
        setCo7FileName(e.target.files[0].name);
    };
    // console.log(co2file);
    const memartUpload = () => {
        const mmemmartDatas = {
            co2: co2file,
            co7: co7file
        };
        dispatch(memartData(mmemmartDatas));
    };
    useEffect(() => {
        console.log(memart);
        console.log(memartErrorMessages);
    }, [memart, memartErrorMessages]);
    //Memart Submit ENd

    //utility Upload
    const saveUtilityFile = (e) => {
        setUtilityFile(e.target.files[0]);
        setUtilityFileName(e.target.files[0].name);
    };
    const utilityUploads = () => {
        // console.log(utilityFile);
        const utilityThingd = {
            streetName: streetName,
            lga: localGovernmane,
            state: localState,
            utilityDocument: utilityFile
        };
        dispatch(uploadUtilityData(utilityThingd));
        // console.log('state', localState, localGovernment, utilityFile);
    };
    useEffect(() => {
        console.log(utilityUpload);
        console.log(utilityUplodaErrorMessages);
    }, [utilityUpload, utilityUplodaErrorMessages]);
    //Utility Upload End

    //Identification Upload
    const saveIdentificationFile = (e) => {
        setIdentificationDocument(e.target.files[0]);
        setIdentificationDocumentName(e.target.files[0].name);
    };
    const IdentificationyUpload = () => {
        const identificationThings = {
            meansOfIdentification: IDType,
            idNumber: idNumber,
            identificationDocument: identificationDocumentFile
        };
        dispatch(identificationDocData(identificationThings));
    };

    //Identification Upload End

    //Refference
    const reffernceUpload = () => {
        // const identificationThings = {
        //     meansOfIdentification: meansOfIdentification,
        //     idNumber: idNumber,
        //     identificationDocument: identificationDocumentFile
        // };

        const emailToshareData = {
            emailsToShare: [refoneemail, refoneno]
        };
        console.log(emailToshareData);
        dispatch(uploadRefFormData(emailToshareData));
    };

    //Refference

    const [document, setDocument] = useState(false);
    const AccountUpgradeData = {
        individual: [
            {
                title: 'Verify your Address',
                icon: <AddressSvg />
            },
            {
                title: 'Transaction Pin',
                icon: <SignatureRuleSvg />
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
                title: 'Documents',
                icon: <AddressSvg />
            },
            {
                title: 'Transaction Pin',
                icon: <SignatureRuleSvg />
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
                title: 'Referee',
                icon: <DirectorsSvg />
            },
            {
                title: 'Signature Rule',
                icon: <SignatureRuleSvg />
            }
        ],
        document: [
            {
                title: 'CAC Registration'
            },
            {
                title: 'SCUML Certificate'
            },
            {
                title: 'MEMAT'
            }
        ]
    };
    const { states } = useSelector((state) => state.statesReducer);
    const newStates = () => {
        if (states !== null) {
            setLocation(states);
        }
    };
    useEffect(() => {
        dispatch(statesData());
    }, []);
    useEffect(() => {
        newStates();
    }, [states]);
    useEffect(() => {
        location?.filter((item) => {
            if (item.code === selstate) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [selstate]);
    switch (title) {
        case 'First':
            return (
                <AccountUpgradeComponent
                    title={
                        text === 'INDIVIDUAL'
                            ? 'Individual Account Upgrade'
                            : text === 'CORPORATE'
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
                                <p>Account Limit: N1,000,000 </p>
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
                    {text === 'INDIVIDUAL'
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
                              if (item.title === 'Documents') {
                                  return (
                                      <>
                                          <AccountUpgradeSingle
                                              statusInfo="Pending"
                                              icon={item.icon}
                                              text={item.title}
                                              key={index}
                                              action={() => {
                                                  setDocument(!document);
                                              }}
                                          />
                                          {document
                                              ? AccountUpgradeData.document.map(
                                                    (item, index) => {
                                                        return (
                                                            <AccountUpgradeSingle
                                                                text={
                                                                    item.title
                                                                }
                                                                key={index}
                                                                statusInfo="Pending"
                                                                action={() => {
                                                                    setTitle(
                                                                        item.title
                                                                    );
                                                                }}
                                                            />
                                                        );
                                                    }
                                                )
                                              : null}
                                      </>
                                  );
                              } else {
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
                              }
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
                                <label>Address </label>
                                <input
                                    value={streetName}
                                    onChange={(e) =>
                                        setStreetName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter Address "
                                />
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Landmark</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Landmark"
                                            value={landMark}
                                            onInput={(e) => {
                                                setLandMark(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>State</label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={(event) => {
                                                setState(event.target.value);
                                                // console.log(selstate);
                                            }}
                                        >
                                            <option value="">
                                                Select State
                                            </option>
                                            {location?.map((state, index) => {
                                                return (
                                                    <option
                                                        value={state.code}
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
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Enter City"
                                        />
                                    </div>
                                </div>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Local Government Area</label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={(event) => {
                                                setLocalGovernmane(
                                                    event.target.value
                                                );
                                            }}
                                        >
                                            <option value="">Select LGA</option>
                                            {localGovernment
                                                ? localGovernment?.map(
                                                      (item, index) => {
                                                          return (
                                                              <option
                                                                  value={
                                                                      item.lgaCode
                                                                  }
                                                                  key={index}
                                                              >
                                                                  {item.lgaName}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={{
                                pathname:
                                    'https://ecocomonoreact.azurewebsites.net/customer-details/',
                                query: {
                                    workitemId: 'AO-095734358976187628-CO',
                                    customerName: userProfile?.preferredName,
                                    customerEmail: userProfile?.email,
                                    branchCode: 'A02',
                                    segmentId: 'ADB',
                                    // houseNumber: '25',
                                    address: streetName,
                                    // streetName: 'Igbobi College Road',
                                    // areaName: 'Yaba',
                                    landmark: landMark,
                                    state: selstate,
                                    lga: localGovernmane,
                                    createdBy: 'RealMg',
                                    customerImage: '',
                                    Latitude: latitude,
                                    Longitude: longitude
                                }
                            }}
                        >
                            <button>Confirm Address</button>
                        </Link>
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
                                <p>
                                    {' '}
                                    {utilityFileName
                                        ? utilityFileName
                                        : 'No file chosen...'}
                                </p>
                                <label>
                                    <input
                                        type="file"
                                        onChange={saveUtilityFile}
                                    />{' '}
                                    Upload
                                </label>
                            </div>
                        </div>
                        <div className={styles.addressBody}>
                            <div className={styles.addressGroup}>
                                <label>Street </label>
                                <input
                                    value={streetName}
                                    onChange={(e) =>
                                        setStreetName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter Street "
                                />
                            </div>
                            <div className={styles.addressCont}>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Landmark</label>
                                        <input
                                            value={landMark}
                                            onChange={(e) =>
                                                setLandMark(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Enter Landmark"
                                        />
                                    </div>
                                </div>

                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>State</label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={(event) => {
                                                setState(event.target.value);
                                                // console.log(selstate);
                                            }}
                                        >
                                            <option value="">
                                                Select State
                                            </option>
                                            {location?.map((state, index) => {
                                                return (
                                                    <option
                                                        value={state.code}
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
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Enter City"
                                        />
                                    </div>
                                </div>
                                <div className={styles.midCont}>
                                    <div className={styles.addressGroup}>
                                        <label>Local Government Area</label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={(event) => {
                                                setLocalGovernmane(
                                                    event.target.value
                                                );
                                            }}
                                        >
                                            <option value="">Select LGA</option>
                                            {localGovernment
                                                ? localGovernment?.map(
                                                      (item, index) => {
                                                          return (
                                                              <option
                                                                  value={
                                                                      item.lgaName
                                                                  }
                                                                  key={index}
                                                              >
                                                                  {item.lgaName}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {utilityUpload ? (
                        utilityUpload.data.message
                    ) : (
                        <button onClick={utilityUploads}>Update Profile</button>
                    )}
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
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setIDType(e.target.value);
                                }}
                            >
                                <option value="">Select regulatory ID</option>
                                <option value="Voters Card">Voters Card</option>
                                <option value="National ID card">
                                    National ID card
                                </option>
                                <option value="Drivers License">
                                    Drivers License
                                </option>
                                <option value="International Passport">
                                    International Passport
                                </option>
                            </select>
                        </div>
                        <div className={styles.identificationGroup}>
                            <label>ID Number</label>
                            <input
                                type="text"
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="Enter ID  Number"
                            />
                        </div>
                    </div>
                    <div className={styles.signature}>
                        <div className={styles.signatureGroup}>
                            <p>Upload ID</p>
                            <div className={styles.signatureFormGroup}>
                                <p>
                                    {' '}
                                    {identificationDocumentFileName
                                        ? identificationDocumentFileName
                                        : 'No file chosen...'}
                                </p>
                                <label>
                                    <input
                                        onChange={saveIdentificationFile}
                                        type="file"
                                    />{' '}
                                    Upload
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={IdentificationyUpload}
                        className={styles.updateBtn}
                    >
                        Update Profiles
                    </button>
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
                            <p>Upload MEMAT</p>
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
        case 'CAC Registration':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                        setDocument(false);
                    }}
                    title="CAC Registration"
                >
                    <div className={styles.documentBody}>
                        <div className={styles.identificationGroup}>
                            <label>CAC Registration Number</label>
                            <input
                                type="text"
                                placeholder="Enter CAC Registration Number"
                            />
                        </div>
                        <div className={styles.signature}>
                            <div className={styles.signatureGroup}>
                                <p>Upload CAC Certificate</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {' '}
                                        {fileName
                                            ? fileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            type="file"
                                            onChange={saveFile}
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        {cac === 'success' ? (
                            <>
                                <p>Document Upload SUccessful</p>
                            </>
                        ) : (
                            <button
                                className={styles.updateBtn}
                                onClick={cacRegistration}
                            >
                                Update Profile
                            </button>
                        )}
                    </div>
                </AccountUpgradeComponent>
            );
        case 'SCUML Certificate':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                        setDocument(false);
                    }}
                    title="SCUML Certificate"
                >
                    <div className={styles.documentBody}>
                        <div className={styles.identificationGroup}>
                            <label>SCUML Certificate Number</label>
                            <input
                                type="text"
                                placeholder="Enter SCUML Certificate Number"
                            />
                        </div>
                        <div className={styles.signature}>
                            <div className={styles.signatureGroup}>
                                <p>Upload SCUML Certificate</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {' '}
                                        {scmulfileName
                                            ? scmulfileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            onChange={saveScmulFile}
                                            type="file"
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        {scmul ? (
                            scmul.data.message
                        ) : (
                            <button
                                className={styles.updateBtn}
                                onClick={uploadScmul}
                            >
                                Update Profile
                            </button>
                        )}
                    </div>
                </AccountUpgradeComponent>
            );
        case 'MEMAT':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                        setDocument(false);
                    }}
                    title="MEMAT"
                >
                    <div className={styles.documentBody}>
                        <div className={styles.signature}>
                            <div className={styles.signatureGroup}>
                                <p>Upload CO2</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {' '}
                                        {co2FileName
                                            ? co2FileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            onChange={saveMemart2lFile}
                                            type="file"
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.signature}>
                            <div className={styles.signatureGroup}>
                                <p>Upload CO7</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {co7FileName
                                            ? co7FileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            onChange={saveMemart7lFile}
                                            type="file"
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        {memart ? (
                            memart.data.message
                        ) : (
                            <button
                                onClick={memartUpload}
                                className={styles.updateBtn}
                            >
                                Update Profile
                            </button>
                        )}
                    </div>
                </AccountUpgradeComponent>
            );
        case 'Referee':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Referee"
                >
                    <div className={styles.directorsBody}>
                        <h2>Reference 1</h2>
                        <div className={styles.directorsGroup}>
                            <label>Email</label>
                            <input
                                type="text"
                                name=""
                                placeholder="Enter Email"
                                value={refoneemail}
                                onChange={(e) => setRefoneEmail(e.target.value)}
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
                    <div className={styles.directorsBody}>
                        <h2>Reference 2</h2>
                        <div className={styles.directorsGroup}>
                            <label>Email</label>
                            <input
                                type="text"
                                name=""
                                placeholder="Enter Email"
                                value={refoneno}
                                onChange={(e) => setRefoneNo(e.target.value)}
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
                    <button onClick={reffernceUpload}>Send Invite</button>
                </AccountUpgradeComponent>
            );
        case 'Transaction Pin':
            return (
                <AccountUpgradeComponent
                    action={() => {
                        setTitle('First');
                    }}
                    title="Transaction Pin"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.documentBody}>
                            {/* {message ? (
                                message ===
                                'Transaction Pin Set Successfully' ? (
                                    <p className={styles.success}>
                                        Transaction Pin Set Successfully
                                    </p>
                                ) : (
                                    <p className={styles.errors}>{message}</p>
                                )
                            ) : null} */}
                            <div className={styles.directorsGroup}>
                                <label>Transaction Pin</label>
                                <input
                                    type="password"
                                    name="transactionPin"
                                    {...register('transactionPin', {
                                        required: 'Transaction Pin is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Min length is 6'
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: 'Max length is 6'
                                        },
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Transaction Pin can only be number '
                                        }
                                    })}
                                    placeholder="Enter Transaction Pin"
                                />
                                <p className={styles.error}>
                                    {errors.transactionPin?.message}
                                </p>
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    {...register('password', {
                                        required: 'Password is required'
                                    })}
                                    placeholder="Enter Password"
                                />
                                <p className={styles.error}>
                                    {errors.password?.message}
                                </p>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button type="submit">Submit</button>
                        )}
                    </form>
                </AccountUpgradeComponent>
            );
        case 'Success':
            return (
                <PaymentSuccess
                    type="profile"
                    heading={message}
                    error={message}
                    statusbar={statusbar}
                />
                // <PaymentSuccess/>
            );
    }
};

export default AccountUpgrade;
