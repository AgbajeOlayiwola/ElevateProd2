import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { CompProfile, statesData } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const VerifyAddress = () => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState([]);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lga, setlga] = useState('');
    const [localGovernment, setLocalGovernment] = useState([]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    const { profile } = useSelector((state) => state.profile);
    useEffect(() => {
        dispatch(CompProfile());
    }, []);
    const newAccountTest1 = () => {
        console.log(details);
        if (profile !== null) {
            setDetails(profile.data);
        }
    };
    useEffect(() => {
        newAccountTest1();
    }, [profile]);
    const { states } = useSelector((state) => state.statesReducer);
    useEffect(() => {
        dispatch(statesData());
    }, []);
    const newStates = () => {
        if (states !== null) {
            setLocation(states);
        }
    };
    useEffect(() => {
        newStates();
    }, [states]);
    useEffect(() => {
        location?.filter((item) => {
            if (item.code === state) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [state]);
    return (
        <div className={styles.verifyAddress}>
            <div className={styles.verifyAddressPopup}>
                <div className={styles.verifyAddressSingle}>
                    <h2>Verify Address</h2>
                    <p>
                        Provide the address you previously entered while
                        registering for verification.
                    </p>
                    {details.address === null ? (
                        <div className={styles.addressGroup}>
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="Enter Street Name"
                                required
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                value={address}
                            />
                        </div>
                    ) : (
                        <div className={styles.addressGroup}>
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="Enter Street Name"
                                value={details.address}
                                readOnly
                            />
                        </div>
                    )}

                    <div className={styles.jointGroup}>
                        {details.state === null ? (
                            <div className={styles.addressJointGroup}>
                                <label>State</label>
                                <select
                                    name=""
                                    required
                                    onChange={(e) => {
                                        setState(e.target.value);
                                    }}
                                >
                                    <option value="">Select State</option>
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
                        ) : (
                            <div className={styles.addressJointGroup}>
                                <label>State</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Landmark"
                                    value={details.state}
                                />
                            </div>
                        )}
                        {details.city === null ? (
                            <div className={styles.addressJointGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter City"
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                    value={city}
                                />
                            </div>
                        ) : (
                            <div className={styles.addressJointGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter City"
                                    value={details.city}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.jointGroup}>
                        {details.lga === null ? (
                            <div className={styles.addressJointGroup}>
                                <label>Local Government Area</label>
                                <select
                                    name=""
                                    onChange={(e) => {
                                        setlga(e.target.value);
                                    }}
                                >
                                    <option value="">Select LGA</option>
                                    {localGovernment?.map((local, index) => {
                                        return (
                                            <option
                                                value={local.lgaCode}
                                                key={index}
                                            >
                                                {local.lgaName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        ) : (
                            <div className={styles.addressJointGroup}>
                                <label>Local Government Area</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Landmark"
                                    value={details.lga}
                                />
                            </div>
                        )}

                        <div className={styles.addressJointGroup}>
                            <label>Landmark</label>
                            <input
                                type="text"
                                name=""
                                placeholder="Enter Landmark"
                                onChange={(e) => {
                                    setLandmark(e.target.value);
                                }}
                                value={landmark}
                            />
                        </div>
                    </div>
                    <Link
                        href={{
                            pathname:
                                'https://ecocomonoreact.azurewebsites.net/customer-details/',
                            query: {
                                workitemId: details.customerID,
                                customerName: details.fullName,
                                customerEmail: details.email,
                                branchCode: '007',
                                segmentId: 'ADB',
                                houseNumber: '25',
                                streetName: address,
                                areaName: city,
                                landmark: landmark,
                                state: state,
                                lga: lga,
                                createdBy: 'RealMg',
                                customerImage: '',
                                Latitude: latitude,
                                Longitude: longitude
                            }
                        }}
                    >
                        <button>Confirm Address</button>
                    </Link>
                    <Link href=" https://ecocomonoreact.azurewebsites.net/customer-details/?workitemId=AO-095734358976187628-CO&customerName=Test%20Customer&customerEmail=boluwatobi%40gmail.com&branchCode=007&segmentId=ADB&houseNumber=25&streetName=Pilot%20Crescent&areaName=Surulere&landmark=Shoprite&state=LG&lga=694&createdBy=RealMg&customerImage&Latitude=6.4886218&Longitude=3.3567333">
                        <button>Test</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyAddress;
