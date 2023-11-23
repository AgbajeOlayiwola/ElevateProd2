import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../../redux/api/authApi';
import { useGetStationsQuery } from '../../../../redux/api/logisticsApi';
import Loader from '../../../ReusableComponents/Loader';
import PayNow from '../PayNow';
import PaymmentSuccess from '../PaymmentSuccess';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Checkout = ({ num, items, upgradeOrder }) => {
    const { affiliate } = useSelector((store) => store);
    const { storeSlice } = useSelector((store) => store);
    const [isGift, setIsGift] = useState(false);
    const [totalPrice, setTotalPrice] = useState();
    const [informEmail, setInformEMail] = useState(false);
    const [page, setPage] = useState(0);
    const [isSucces, setIsSuccess] = useState(false);
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
    useEffect(() => {
        if (createOrderSuccess) {
            setIsSuccess(true);
        }
    }, [createOrderSuccess]);

    const initialValues = {
        storeFrontId: storeSlice?.id,
        deliveryOption: '',
        recipientFirstName: '',
        recipientLastName: '',
        recipientEmail: '',
        senderName: '',
        senderEmail: '',
        senderPhoneNumber: '',
        shippingAddress: ''
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
                        ipAddress: '234545678',
                        logisticId: values?.deliveryOption,
                        isGift: isGift,
                        recipientFirstName: values?.recipientFirstName,
                        recipientLastName: values?.recipientLastName,
                        recipientMsisdn: '2348148184543',
                        recipientEmail: values?.recipientEmail,
                        isInformRecipientViaEmail: informEmail,
                        senderName: '2349030751428',
                        senderMsisdn: '2349030751428',
                        senderEmail: 'faithuchinonso@gmail.com',
                        affiliateCode: storeSlice?.affiliateCode,
                        shippingAddress: values?.shippingAddress,
                        city: '',
                        state: '',
                        customerEmail: values?.recipientEmail,
                        customerMsisdn: '2348148184543',
                        deliveryCost: 9000,
                        tax: 32.45,
                        totalCost: totalPrice,
                        cart: 'ihgfvbhj',
                        orderDate: '2023-04-23',
                        attachments: [
                            'dfghjkljhfsrtdfyguhklj',
                            'dfghjkl;hgfjdhsrdgfhjgkhljh'
                        ]
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
                            <h1 className={styles.dets}>Recipient details</h1>
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
                                        value={values?.recipientFirstName}
                                        type="text"
                                        placeholder="first name"
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
                                        value={values?.recipientLastName}
                                        type="text"
                                        placeholder="first name"
                                    />
                                </div>
                            </div>
                            <div className={styles.names}>
                                <div className={styles.inputDiv}>
                                    <label>
                                        Recipient’s email address (optional)
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setFieldValue(
                                                'recipientEmail',
                                                e.target.value
                                            );
                                        }}
                                        value={values?.recipientEmail}
                                        type="text"
                                        placeholder="first name"
                                    />
                                </div>
                                <div className={styles.inputDiv}>
                                    <label>Recipient phone number</label>
                                    <input
                                        onChange={(e) => {
                                            setFieldValue(
                                                'senderPhoneNumber',
                                                e.target.value
                                            );
                                        }}
                                        value={values?.senderPhoneNumber}
                                        type="number"
                                        placeholder="first name"
                                    />
                                </div>
                            </div>
                            <div className={styles.isGift}>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        setInformEMail((prev) => !prev)
                                    }
                                />
                                <p>Inform recipient via email</p>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div className={styles.inputDivs}>
                                <label>Your phone number</label>
                                <input type="number" placeholder="first name" />
                            </div>
                            <br />
                            <hr />
                            <br />
                            <h1 className={styles.dets}>Recipient details</h1>
                            <div className={styles.inputDivs}>
                                <label>
                                    Your address (Number and street name)
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'shippingAddress',
                                            e.target.value
                                        )
                                    }
                                    value={values?.shippingAddress}
                                    placeholder="first name"
                                />
                            </div>
                            <div className={styles.names}>
                                <div className={styles.inputDiv}>
                                    <label>State/Province</label>
                                    <select>
                                        <option>Choose</option>
                                    </select>
                                </div>
                                <div className={styles.inputDiv}>
                                    <label>Local Government city/town</label>
                                    <select>
                                        <option>Choose</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div>
                                <label>Delivery option</label>
                                <select
                                    onChange={(e) =>
                                        setFieldValue(
                                            'deliveryOption',
                                            e.target.value
                                        )
                                    }
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
