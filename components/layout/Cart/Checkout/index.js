import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
    useCreateOrderMutation,
    useLogisticsGigStationsMutation
} from '../../../../redux/api/authApi';
import { useGetStationsQuery } from '../../../../redux/api/logisticsApi';
import Loader from '../../../ReusableComponents/Loader';
import PayNow from '../PayNow';
import PaymmentSuccess from '../PaymmentSuccess';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { lgasArr } from '../../../ReusableComponents/Data';
const Checkout = ({ num, items, upgradeOrder }) => {
    const { affiliate } = useSelector((store) => store);
    const { storeSlice } = useSelector((store) => store);
    const [isGift, setIsGift] = useState(false);
    const [totalPrice, setTotalPrice] = useState();
    const [informEmail, setInformEMail] = useState(false);
    const [city, setCity] = useState('');
    const [page, setPage] = useState(0);
    const [isSucces, setIsSuccess] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [rciepientAddress, setRecipientAddrss] = useState('');
    const [snderAddress, setSenderAddress] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [lga, setLga] = useState('');
    const {
        data: getStationsData,
        isLoading,
        isError,
        refetch // This function can be used to manually trigger a refetch
    } = useGetStationsQuery();
    useEffect(() => {
        refetch();
    }, []);

    const close = () => {
        setIsSuccess(false);
    };
    const { cartItem } = useSelector((store) => store);
    useEffect(() => {
        setTotalPrice(
            cartItem?.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            )
        );
        const formatDate = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set the initial formatted date
        setFormattedDate(formatDate());
    }, []);
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <PayNow nextStep={() => setPage(page + 1)} close={close} />
                );
            case 1:
                return <PaymmentSuccess close={close} />;
        }
    };
    const [
        createOrder,
        {
            data: createOrderData,
            isLoading: createOrderLoad,
            isSuccess: createOrderSuccess,
            isError: createOrderFalse,
            error: createOrderErr,
            reset: createOrderReset
        }
    ] = useCreateOrderMutation();
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
    useEffect(() => {
        if (createOrderSuccess) {
            setIsSuccess(true);
        }
    }, [createOrderSuccess]);

    const callLogistics = () => {
        logisticsGigStations({ stateName: 'LAGOS' });
    };

    const initialValues = {
        storeFrontId: storeSlice?.id,
        deliveryOption: '',
        recipientFirstName: '',
        recipientLastName: '',
        recipientEmail: '',
        senderName: '',
        senderEmail: '',
        senderPhoneNumber: '',
        shippingAddress: '',
        firstName: '',
        lastName: '',
        yourEmail: '',
        yourPhoneNumber: ''
    };

    const [coordinate, setCoordinate] = useState({
        lat: null,
        lng: null
    });
    const [senderCoordinate, setSenderCoordinate] = useState({
        lat: null,
        lng: null
    });
    const handleSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const ll = await getLatLng(result[0]);

        setCoordinate(ll);
        console.log(coordinate);
    };
    const handleSenderSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const ll = await getLatLng(result[0]);

        setSenderCoordinate(ll);
        console.log(coordinate);
    };
    return (
        <div className={styles.Checkout}>
            <div className={styles.itemDetails}>
                <p>Order #SME661012</p>
                <p className={styles.order}>See order details</p>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div>
                        <p className={styles.prod}>PRODUCT</p>
                        {cartItem?.map((item, index) => {
                            return <p key={{ index }}>{item?.name}</p>;
                        })}
                    </div>
                    <div>
                        <p className={styles.prod}>QTY</p>
                        <p>
                            {' '}
                            {cartItem?.map((item, index) => {
                                return (
                                    <p key={{ index }}>{item?.quantity} pcs</p>
                                );
                            })}
                        </p>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div className={styles.prods}>
                        {cartItem?.map((item, index) => {
                            return (
                                <div className={styles.pricePCsFlex}>
                                    {' '}
                                    <p className={styles.products}>
                                        <span>{item?.quantity} pcs </span> of{' '}
                                        {item?.name}
                                    </p>
                                    <pdiv className={styles.ammt}>
                                        {' '}
                                        {getSymbolFromCurrency(
                                            countryToCurrency[
                                                affiliate?.substring(1)
                                            ]
                                        )}{' '}
                                        {parseFloat(item?.price * item.quantity)
                                            .toFixed(2)
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                    </pdiv>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr />
                <div className={styles.products}>
                    <div>
                        <p className={styles.total}>Total PRice</p>
                    </div>
                    <div>
                        <p className={styles.totalPrice}>
                            {getSymbolFromCurrency(
                                countryToCurrency[affiliate?.substring(1)]
                            )}
                            {parseFloat(
                                cartItem?.reduce(
                                    (total, item) =>
                                        total + item.price * item.quantity,
                                    0
                                )
                            )
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    </div>
                </div>
                <div className={styles.proceef}>
                    <button onClick={upgradeOrder}>Update your order</button>
                </div>
            </div>
            <Formik
                // validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        storeFrontId: storeSlice?.id,
                        cartId: '253456789765446',
                        cart: cartItem,
                        logisticId: '1',
                        isGift: isGift,
                        recipientFirstName: values?.recipientFirstName,
                        recipientLastName: values?.recipientLastName,
                        recipientMsisdn: values?.senderPhoneNumber,
                        recipientEmail: values?.recipientEmail,
                        isInformRecipientViaEmail: false,
                        senderName: `${values?.firstName} ${values?.lastName}`,
                        senderMsisdn: values?.yourPhoneNumber,
                        senderEmail: values?.yourEmail,
                        affiliateCode: affiliate,
                        shippingAddress: rciepientAddress,
                        city: city,
                        state: lga,
                        customerEmail: values?.yourEmail,
                        customerMsisdn: values?.yourPhoneNumber,
                        deliveryCost: 450,
                        totalCost: totalPrice,
                        orderDate: formattedDate,
                        attachments: [],
                        senderLocation: {
                            latitude: senderCoordinate?.lat,
                            longitude: senderCoordinate?.lng
                        },
                        receiverLocation: {
                            latitude: coordinate?.lat,
                            longitude: coordinate?.lng
                        }
                    };

                    createOrder(data);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleSubmit
                }) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.checkoutInfo}>
                            <div className={styles.isGift}>
                                <input
                                    type="checkbox"
                                    onChange={() => setIsGift((prev) => !prev)}
                                />
                                <p>Is this a gift?</p>
                            </div>
                            {isGift ? (
                                <>
                                    <h1 className={styles.dets}>
                                        Recipint details
                                    </h1>
                                    <div className={styles.names}>
                                        <div className={styles.inputDiv}>
                                            <label>Recipient first name</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'recipientFirstName',
                                                        e.target.value
                                                    );
                                                }}
                                                name="firstname"
                                                value={
                                                    values?.recipientFirstName
                                                }
                                                type="text"
                                                placeholder="Recipient first name"
                                            />
                                        </div>
                                        <div className={styles.inputDiv}>
                                            <label>Recipient last name</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'recipientLastName',
                                                        e.target.value
                                                    );
                                                }}
                                                name="lastname"
                                                value={
                                                    values?.recipientLastName
                                                }
                                                type="text"
                                                placeholder="Recipient last name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Recipient Address</label>
                                        <PlacesAutocomplete
                                            value={rciepientAddress}
                                            onChange={setRecipientAddrss}
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
                                                            placeholder:
                                                                'Search Places ...',
                                                            className:
                                                                'location-search-input'
                                                        })}
                                                        value={rciepientAddress}
                                                    />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && (
                                                            <div>
                                                                Loading...
                                                            </div>
                                                        )}
                                                        {suggestions.map(
                                                            (suggestion) => {
                                                                const className =
                                                                    suggestion.active
                                                                        ? 'suggestion-item--active'
                                                                        : 'suggestion-item';
                                                                // inline style for demonstration purpose
                                                                const style =
                                                                    suggestion.active
                                                                        ? {
                                                                              backgroundColor:
                                                                                  '#fafafa',
                                                                              cursor: 'pointer'
                                                                          }
                                                                        : {
                                                                              backgroundColor:
                                                                                  '#ffffff',
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
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setRecipientAddrss(
                                                                                    suggestion.description
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                suggestion.description
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
                                    </div>
                                    <div className={styles.names}>
                                        <div className={styles.inputDiv}>
                                            <label>Your phone number</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'senderPhoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                name="phone number"
                                                value={
                                                    values?.senderPhoneNumber
                                                }
                                                type="number"
                                                placeholder="081 234 5678"
                                            />
                                        </div>
                                        <div className={styles.inputDiv}>
                                            <label>
                                                Your email address (optional)
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'recipientEmail',
                                                        e.target.value
                                                    );
                                                }}
                                                name="email"
                                                value={values?.recipientEmail}
                                                type="text"
                                                placeholder="email@email.com"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className={styles.dets}>
                                        Your details
                                    </h1>
                                    <div className={styles.names}>
                                        <div className={styles.inputDiv}>
                                            <label>First name</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'firstName',
                                                        e.target.value
                                                    );
                                                }}
                                                value={values?.firstName}
                                                type="text"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div className={styles.inputDiv}>
                                            <label>Last name</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'lastName',
                                                        e.target.value
                                                    );
                                                }}
                                                value={values?.lastName}
                                                type="text"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.names}>
                                        <div className={styles.inputDiv}>
                                            <label>
                                                Email address (optional)
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'yourEmail',
                                                        e.target.value
                                                    );
                                                }}
                                                value={values?.yourEmail}
                                                type="text"
                                                placeholder="Email@email.com"
                                            />
                                        </div>
                                        <div className={styles.inputDiv}>
                                            <label>Your phone number</label>
                                            <input
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'yourPhoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                value={values?.yourPhoneNumber}
                                                type="number"
                                                placeholder="081 234 5678"
                                            />
                                        </div>
                                    </div>

                                    <br />
                                </>
                            )}
                            <br />
                            <h1 className={styles.dets}>Recipient details</h1>
                            <div className={styles.inputDivs}>
                                <label>
                                    Your address (Number and street name)
                                </label>
                                <PlacesAutocomplete
                                    value={snderAddress}
                                    onChange={setSenderAddress}
                                    onSelect={handleSenderSelect}
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
                                                    placeholder:
                                                        'Search Places ...',
                                                    className:
                                                        'location-search-input'
                                                })}
                                                value={snderAddress}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && (
                                                    <div>Loading...</div>
                                                )}
                                                {suggestions.map(
                                                    (suggestion) => {
                                                        const className =
                                                            suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                        // inline style for demonstration purpose
                                                        const style =
                                                            suggestion.active
                                                                ? {
                                                                      backgroundColor:
                                                                          '#fafafa',
                                                                      cursor: 'pointer'
                                                                  }
                                                                : {
                                                                      backgroundColor:
                                                                          '#ffffff',
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
                                                            >
                                                                <span
                                                                    onClick={() =>
                                                                        setSenderAddress(
                                                                            suggestion.description
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            <div className={styles.names}>
                                <div className={styles.inputDiv}>
                                    <label>State/Province</label>
                                    <select
                                        onChange={(e) => setLga(e.target.value)}
                                    >
                                        {lgasArr.map((item, index) => {
                                            return (
                                                <option value={item.state}>
                                                    {item.state}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className={styles.inputDiv}>
                                    <label>Local Government city/town</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div>
                                <label>Delivery option</label>
                                <select
                                    onChange={(e) => {
                                        callLogistics(),
                                            setFieldValue(
                                                'deliveryOption',
                                                e.target.value
                                            );
                                    }}
                                >
                                    <option>Choose</option>
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        getStationsData?.data?.map(
                                            (item, index) => {
                                                return (
                                                    <option value={item?.id}>
                                                        {item?.providerName}
                                                    </option>
                                                );
                                            }
                                        )
                                    )}
                                </select>
                            </div>
                            <br />
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
                            <div className={styles.del}>
                                <MdOutlineInfo />{' '}
                                <p>Delivery time affects price range.</p>
                            </div>
                            <div className={styles.proceed}>
                                <button>
                                    {createOrderLoad ? (
                                        <Loader />
                                    ) : (
                                        'Proceed to payment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            {isSucces ? multi() : null}
        </div>
    );
};

export default Checkout;
