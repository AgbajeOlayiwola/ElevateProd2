import React, { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { MdMailOutline, MdMessage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useShipOrderMutation } from '../../../../redux/api/authApi';
import ButtonComp from '../../../ReusableComponents/Button';
import CautionSVg from '../../../ReusableComponents/CautionSvg';
import ProperSuccessSvg from '../../../ReusableComponents/PropperSuccessSvg';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const OrderDetails = ({ back }) => {
    const { orderDetails } = useSelector((store) => store);
    const { storeSlice } = useSelector((store) => store);
    const { profile } = useSelector((store) => store);
    const [isShipOrder, setIsShipOrder] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);
    const [page, setPage] = useState(0);
    console.log(orderDetails);
    const dispatch = useDispatch();
    const affiliate = localStorage.getItem('affiliateCode');

    const preShipmentItems = orderDetails?.cartItems?.map((item, index) => {
        return {
            specialPackageId: `${Math.floor(100 + Math.random() * 900)}`,
            quantity: item?.quantity,
            weight: 50,
            itemType: 'goods',
            weightRange: '20',
            itemName: `${item?.inventory?.data?.name}${Math.floor(
                100 + Math.random() * 900
            )}`,
            value: item?.totalCost,
            shipmentType: 'Regular',
            description: `${
                item?.inventory?.data?.description
            }${index}${Math.floor(100 + Math.random() * 900)}`,
            imageUrl: item?.inventory?.data?.image?.[0]
        };
    });
    const shippingPayload = {
        orderId: orderDetails?.id,
        storeFrontId: orderDetails?.cartItems[0]?.orderDetails,
        receiverAddress: '11 Ehimen Ehon avenue Ogudu',
        senderLocality: `${orderDetails?.city} ${orderDetails?.state}`,
        senderAddress: 'lagos state secretariat, alausa, ikeja, lagos',
        receiverPhoneNumber:
            orderDetails?.recipientMsisdn ||
            orderDetails?.senderMsisdn ||
            '090876543456',
        vehicleType: 'bike',
        senderPhoneNumber: storeSlice?.phoneNumbers[0],
        senderName: storeSlice?.storeFrontName,
        receiverName: `firstname 'lastname'`,
        userId: profile?.user?.user_id,
        receiverStationId: '4',
        senderStationId: '4',
        receiverLocation: {
            longitude: orderDetails?.receiverLocation?.longitude,
            latitude: orderDetails?.receiverLocation?.latitude
        },
        senderLocation: {
            longitude: storeSlice?.senderLocation?.longitude,
            latitude: storeSlice?.senderLocation?.latitude
        },
        preShipmentItems
    };
    const [
        shipOrder,
        {
            isLoading: shipOrderLoad,
            isSuccess: shipOrderSuccess,
            isError: shipOrderFalse,
            error: shipOrderErr,
            reset: shipOrderReset
        }
    ] = useShipOrderMutation();
    const shipTheOrder = () => {
        shipOrder(shippingPayload);
    };
    useEffect(() => {
        if (shipOrderSuccess) {
            setPage(3);
        }
    }, [shipOrderSuccess]);
    const showToastAddErrorMessage = () => {
        toast.error('Order Shipment Failed Try Again', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (shipOrderErr) {
            showToastAddErrorMessage();
        }
    }, [shipOrderErr]);

    const shipOrders = () => {
        switch (page) {
            case 0:
                return (
                    <div className={styles.inner}>
                        <CautionSVg />
                        <h3>Ship Order</h3>
                        <p style={{ textAlign: 'center' }}>
                            You are about to ship order #{orderDetails?.id}
                        </p>
                        <div className={styles.shipButton}>
                            <div
                                className={styles.cancel}
                                onClick={() => setPage(1)}
                            >
                                No
                            </div>
                            <ButtonComp
                                onClick={shipTheOrder}
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Yes, Ship"
                                type="submit"
                                loads={shipOrderLoad}
                            />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className={styles.inner}>
                        <CautionSVg />
                        <h3>Cancel Order?</h3>
                        <label>Cancelation Narration</label>
                        <input type="text" />
                        <div className={styles.shipButton}>
                            <div
                                className={styles.cancel}
                                onClick={() => setPage(2)}
                            >
                                Yes Cancel
                            </div>
                            <div
                                className={styles.cancel}
                                onClick={() => setPage(0)}
                            >
                                No
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.inner}>
                        <CautionSVg />
                        <h3>Cancel Order</h3>
                        <p style={{ textAlign: 'center' }}>
                            We have informed the Customer that the order has
                            been cancelled.
                        </p>
                        <div className={styles.shipButton}>
                            <ButtonComp
                                onClick={() => {
                                    setIsShipOrder(false), setPage(0);
                                }}
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Go to orders"
                                type="submit"
                                // loads={registerLoad}
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className={styles.inner}>
                        <ProperSuccessSvg />
                        <h3>Inventory added successfully</h3>
                        <div className={styles.shipButton}>
                            <ButtonComp
                                onClick={back}
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Go To Orders"
                                type="submit"
                                // loads={shipOrderLoad}
                            />
                        </div>
                    </div>
                );
        }
    };
    return (
        <>
            {' '}
            <ToastContainer />
            <div>
                <div className={styles.gotTOOrder} onClick={back}>
                    <IoMdArrowBack />
                    Go to orders
                </div>
                <br />
                <br />
                <div className={styles.details}>
                    <div className={styles.ordrDetails}>
                        <h2>Order Details</h2>
                        {orderDetails?.cartItems.map((item, index) => {
                            return (
                                <>
                                    <div className={styles.inventorySingle}>
                                        <div
                                            className={
                                                styles.inventorySingleFirst
                                            }
                                        >
                                            <div className={styles.divDets}>
                                                <img
                                                    src={
                                                        item?.inventory?.data
                                                            ?.image[0] !==
                                                        undefined
                                                            ? item?.inventory
                                                                  ?.data
                                                                  ?.image[0]
                                                            : '/Assets/Images/default-store.jpeg'
                                                    }
                                                    width={70}
                                                    height={70}
                                                    alt=""
                                                />
                                                <div className={styles.dets}>
                                                    <div
                                                        className={styles.detss}
                                                    >
                                                        <p
                                                            className={
                                                                styles.productName
                                                            }
                                                        >
                                                            Order{' '}
                                                            {
                                                                item?.inventory
                                                                    ?.data?.name
                                                            }
                                                        </p>
                                                        <div
                                                            className={
                                                                styles.ammount
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    item
                                                                        ?.inventory
                                                                        ?.data
                                                                        ?.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className={
                                                                styles.nameLocation
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    item
                                                                        ?.inventory
                                                                        ?.data
                                                                        ?.quantity
                                                                }
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.nameLocation
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    item
                                                                        ?.inventory
                                                                        ?.data
                                                                        ?.category
                                                                        ?.name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.time
                                                            }
                                                        >
                                                            <p>
                                                                item?.orderDate
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.ship}>
                                            <div className={styles.itemStatus}>
                                                {item?.size}
                                            </div>
                                            <p>
                                                {' '}
                                                {getSymbolFromCurrency(
                                                    countryToCurrency[
                                                        `${affiliate?.substring(
                                                            1
                                                        )}`
                                                    ]
                                                )}{' '}
                                                {parseFloat(
                                                    item?.inventory?.data?.price
                                                ).toLocaleString('en-US')}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div>
                        <h2>Customer Details</h2>
                        <>
                            <div className={styles.inventorySingle}>
                                <div>
                                    <h1></h1>
                                    <p>{orderDetails?.senderEmail}</p>
                                    <p>{orderDetails?.senderMsisdn}</p>
                                </div>{' '}
                                <div className={styles.iconsFlex}>
                                    <div>
                                        <MdMailOutline />
                                    </div>
                                    <div>
                                        <MdMessage />
                                    </div>
                                    <div>
                                        <FaPhoneAlt />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>

                    <div>
                        <h2>Delivery Information</h2>
                        <>
                            <div className={styles.inventorySingle}>
                                <div>
                                    <h1>{orderDetails?.shippingAddress}</h1>
                                    <p>{orderDetails?.state}</p>
                                    <p>{orderDetails?.city}</p>
                                </div>{' '}
                                <div className={styles.iconsFlex}>
                                    <div>
                                        <IoLocationSharp />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div>
                        <h2>Delivery Information</h2>
                        <>
                            <div className={styles.inventorySingle}>
                                <div>
                                    <h1>
                                        {orderDetails?.logistics?.providerName}
                                    </h1>
                                    <p>
                                        {' '}
                                        shipping fee:{' '}
                                        {getSymbolFromCurrency(
                                            countryToCurrency[
                                                `${affiliate?.substring(1)}`
                                            ]
                                        )}{' '}
                                        {parseFloat(
                                            orderDetails?.deliveryCost
                                        ).toLocaleString('en-US')}
                                    </p>
                                </div>{' '}
                                <div className={styles.iconsFlex}>
                                    <div>
                                        <MdMailOutline />
                                    </div>
                                    <div>
                                        <FaPhoneAlt />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <br />
                    <div className={styles.cancelShipDiv}>
                        <div className={styles.cancelShip}>
                            <div className={styles.cancel}>Cancel order</div>
                            <button onClick={() => setIsShipOrder(true)}>
                                Ship Order
                            </button>
                        </div>
                    </div>
                </div>
                {isShipOrder ? (
                    <div className={styles.outer}>{shipOrders()}</div>
                ) : null}
            </div>
        </>
    );
};

export default OrderDetails;
