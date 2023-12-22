import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useCreatStorefrontMutation,
    useLogisticsGigStationsMutation
} from '../../../../redux/api/authApi';
import { useGetStationsQuery } from '../../../../redux/api/logisticsApi';
import ButtonComp from '../../../ReusableComponents/Button';
import InputFile from '../../../ReusableComponents/InputFile';
import Loader from '../../../ReusableComponents/Loader';
import PlusSvg from '../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import CreateStoreSuccess from '../CreateStoreSuccess';
import styles from './styles.module.css';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { lgasArr } from '../../../ReusableComponents/Data';
const CreateStore2 = ({ nextPage }) => {
    const [succes, setSucces] = useState(false);
    const [selectedLogisticsIds, setSelectedLogisticsIds] = useState([]);
    const { profile } = useSelector((store) => store);
    const [assignLog, setAssignLog] = useState(true);
    const [useAddres, setUseAddress] = useState(false);
    const [typeAddress, setTypeAddress] = useState(
        useAddres ? profile?.user?.address : ''
    );
    const [localGove, setLocalGov] = useState();
    const [city, setCity] = useState();
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');
    const { createStoreSliceData } = useSelector((store) => store);
    const [activeBtn, setActiveBtn] = useState(true);
    const {
        data: getStationsData,
        isLoading,
        isError,
        refetch // This function can be used to manually trigger a refetch
    } = useGetStationsQuery();
    useEffect(() => {
        refetch();
    }, []);
    const [
        creatStorefront,
        {
            data: creatStorefrontData,
            isLoading: creatStorefrontLoad,
            isSuccess: creatStorefrontSuccess,
            isError: creatStorefrontFalse,
            error: creatStorefrontErr,
            reset: creatStorefrontReset
        }
    ] = useCreatStorefrontMutation();
    const [
        logisticsGigStations,
        {
            data: logisticsGigStationsData,
            isLoading: logisticsGigStationsLoad,
            isSuccess: logisticsGigStationsSuccess,
            isError: logisticsGigStationsFalse,
            error: logisticsGigStationsErr,
            reset: logisticsGigStationsReset
        }
    ] = useLogisticsGigStationsMutation();
    const saveandcontinue = (e) => {
        e.preventDefault();
        const data = {
            ...createStoreSliceData,
            logo: logo,
            banner: banner,
            logisticsId: selectedLogisticsIds,
            address: typeAddress,
            city: city,
            state: '',
            stationId: selectedLogisticsIds,
            color: 'rogbiv',
            senderLocation: {
                latitude: '23456754321475689',
                longitude: '8976543098765987'
            }
        };
        creatStorefront(data);
        // nextPage();
    };
    useEffect(() => {
        if (creatStorefrontSuccess) {
            setSucces(true);
        }
    }, [creatStorefrontSuccess]);
    const showToastMessage = () => {
        toast.error(creatStorefrontErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    const showToastLogisticsMessage = () => {
        toast.error(logisticsGigStationsErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (logisticsGigStationsErr) {
            showToastLogisticsMessage();
        }
    }, [logisticsGigStationsErr]);
    useEffect(() => {
        if (creatStorefrontErr) {
            showToastMessage();
        }
    }, [creatStorefrontErr]);

    const onImageUrlChange = (data) => {
        setLogo(data.replace('data:image/png;base64,', ''));
    };
    const onImageUrlChangeBanner = (data) => {
        setBanner(data.replace('data:image/png;base64,', ''));
    };
    const addNew = () => {
        setAssignLog((prev) => !prev);
    };
    const handleCheckboxChange = (id) => {
        // Convert id to string
        const stringId = id.toString();

        // Check if the stringId is already in the selectedLogisticsIds array
        if (selectedLogisticsIds.includes(stringId)) {
            // If yes, remove it
            setSelectedLogisticsIds((prevIds) =>
                prevIds.filter((selectedId) => selectedId !== stringId)
            );
        } else {
            // If no, add it
            setSelectedLogisticsIds((prevIds) => [...prevIds, stringId]);
        }
    };
    const saveANdContinue = () => {
        const imageArray = [
            image1 ? image1 : null,
            image2 ? image2 : null,
            image3 ? image3 : null,
            image4 ? image4 : null
        ].filter(Boolean);
        const data = {
            ...addInventory,
            image: imageArray
        };
        const updateDta = {
            ...addInventory,
            image: imageArray,
            logisticsId: selectedLogisticsIds,
            inventoryId: viewInventory?.id,
            logisticsId: selectedLogisticsIds,
            address: typeAddress,
            city: city,
            state: '',
            stationId: selectedLogisticsIds,
            color: 'rogbiv',
            senderLocation: {
                latitude: coordinaten?.lat,
                longitude: coordinaten?.lng
            }
        };
        if (ifIsEdit) {
            updateInventory(updateDta);
        } else {
            createeInventory(data);
        }
        // alert('Done');
    };
    const [coordinate, setCoordinate] = useState({
        lat: null,
        lng: null
    });
    const handleSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const ll = await getLatLng(result[0]);

        setCoordinate(ll);
        console.log(coordinate);
    };
    return (
        <>
            <ToastContainer />
            {succes ? (
                <CreateStoreSuccess />
            ) : (
                <div className={styles.createStore}>
                    {assignLog ? (
                        <div className={styles.assignFe}>
                            <div className={styles.assign}>
                                <p>Assign logistics</p>
                                <div onClick={() => addNew()}>
                                    Add new logistics
                                </div>
                                <p>
                                    This helps you set delivery prices based on
                                    location
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.companys}>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                getStationsData?.data?.map((item, index) => {
                                    const stringId = item.id.toString();
                                    const isChecked =
                                        selectedLogisticsIds.includes(stringId);

                                    return (
                                        <div
                                            className={styles.fass}
                                            key={index}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item.id
                                                    )
                                                }
                                            />
                                            <img
                                                src={item.imageUrl}
                                                height={28}
                                                width={28}
                                                alt={item.providerName}
                                            />
                                            <p>{item.providerName}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                    <br />
                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            onChange={() => setUseAddress((prev) => !prev)}
                        />
                        <label>Use business address</label>
                    </div>
                    <div className={styles.address}>
                        <label>Store addrss (Number and street name)</label>
                        {/* <input
                            type="text"
                            className={styles.addressInput}
                            value={
                                useAddres === true
                                    ? profile?.user?.address
                                    : typeAddress
                            }
                            onChange={(e) => setTypeAddress(e.target.value)}
                        /> */}
                    </div>
                    <PlacesAutocomplete
                        value={typeAddress}
                        onChange={setTypeAddress}
                        onSelect={handleSelect}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading
                        }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input'
                                    })}
                                    value={typeAddress}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? {
                                                  backgroundColor: '#fafafa',
                                                  cursor: 'pointer'
                                              }
                                            : {
                                                  backgroundColor: '#ffffff',
                                                  cursor: 'pointer'
                                              };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(
                                                    suggestion,
                                                    {
                                                        className,
                                                        style
                                                    }
                                                )}
                                                onClick={() =>
                                                    setTypeAddress(
                                                        suggestion.description
                                                    )
                                                }
                                            >
                                                <span>
                                                    {suggestion.description}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <br />
                    <div className={styles.stateLocal}>
                        <div>
                            <label>State/Province</label>
                            <select
                                onChange={(e) => {
                                    logisticsGigStations({
                                        stateName: e.target.value.toUpperCase()
                                    });
                                }}
                            >
                                <option>Choose</option>
                                {lgasArr.map((item, index) => {
                                    return (
                                        <option value={item.state} key={index}>
                                            {item.state}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {logisticsGigStationsLoad ? (
                            <Loader />
                        ) : logisticsGigStationsSuccess ? (
                            <div>
                                <label>Delivery Locations</label>
                                <select>
                                    <option>Choose</option>
                                    {logisticsGigStationsData?.data?.map(
                                        (item, index) => {
                                            return (
                                                <option value={item?.id}>
                                                    {item?.stationName}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        ) : null}
                        {/* <div>
                            <label>Local Government</label>
                            <input
                                type="text"
                                className={styles.addressInput}
                                value={localGove}
                                onChange={(e) => setLocalGov(e.target.value)}
                            />
                        </div> */}
                    </div>

                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store logo"
                        disclaimer="Only images are allowed, max of 1mb."
                        uploadLabel="Click to add a logo"
                        logoBanner="logo"
                        onImageUrlChange={onImageUrlChange}
                    />
                    <br />
                    <br />
                    <hr className={styles.hr} />
                    <br />
                    <br />
                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store banner"
                        disclaimer="Use a banner of 364px by 160px for maximum resolution"
                        uploadLabel="Click to add a banner"
                        logoBanner="banner"
                        onImageUrlChange={onImageUrlChangeBanner}
                    />
                    <div className={styles.saveAnd}>
                        <ButtonComp
                            onClick={saveandcontinue}
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Save and continue"
                            type="submit"
                            loads={creatStorefrontLoad}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateStore2;
