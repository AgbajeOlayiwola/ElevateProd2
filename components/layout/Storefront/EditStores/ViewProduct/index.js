import Image from 'next/image';
import React, { useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteByInventoryidMutation } from '../../../../../redux/api/authApi';
import Loader from '../../../../ReusableComponents/Loader';
import SwitchComponent from '../../../../ReusableComponents/SwitchComponent';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const ViewProduct = ({ retrunBack, editInventory }) => {
    const { storeSlice } = useSelector((store) => store);
    const affiliate = localStorage.getItem('affiliateCode');
    const { viewInventory } = useSelector((store) => store);
    const data = {
        size: ['XS', 'S', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Brown', 'Purple', 'Magenta', 'Lilac'],
        logistics: ['GIGM', 'Jumia', 'Express', 'FastFast']
    };
    const showToastMessage = () => {
        toast.success('Storefront Link Copied', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    const [
        deleteByInventoryid,
        {
            data: deleteByInventoryidData,
            isLoading: deleteByInventoryidLoad,
            isSuccess: deleteByInventoryidSuccess,
            isError: deleteByInventoryidFalse,
            error: deleteByInventoryidErr,
            reset: deleteByInventoryidReset
        }
    ] = useDeleteByInventoryidMutation();
    useEffect(() => {
        if (deleteByInventoryidSuccess) {
            retrunBack();
        }
    }, [deleteByInventoryidSuccess]);

    return (
        <>
            <ToastContainer />
            <div className={styles.backArrow} onClick={retrunBack}>
                <IoArrowBackOutline />
                <p>Back to inventory</p>
            </div>
            <div className={styles.viewProduct}>
                <div className={styles.left}>
                    <Image
                        height={600}
                        width={632}
                        src={
                            viewInventory?.image[0] ||
                            '/Assets/Images/Rectangle45.png'
                        }
                        alt="kjhgf"
                    />
                    <div className={styles.sample}>
                        <div className={styles.sampleImh}>
                            {viewInventory?.image.map((item, index) => {
                                return (
                                    <Image
                                        height={37}
                                        width={43}
                                        src={item}
                                        alt="kjhgf"
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightDiv}>
                        <div className={styles.round}>
                            <h1>{viewInventory?.name}</h1>
                            <p className={styles.name}>
                                {viewInventory?.category?.name}
                            </p>
                            <p className={styles.stock}>
                                {viewInventory?.quantity} in Stock
                            </p>
                        </div>
                        <div className={styles.switcBtn}>
                            <div className={styles.btns}>
                                <SwitchComponent />
                            </div>
                            <button
                                onClick={() => {
                                    {
                                        navigator.clipboard
                                            .writeText(
                                                `${storeSlice?.storeFrontLink}`
                                            )
                                            .then(() => {});
                                    }
                                    showToastMessage();
                                }}
                            >
                                {' '}
                                Share link
                            </button>
                        </div>
                    </div>
                    <br />
                    <div
                        className={styles.delete}
                        onClick={() =>
                            deleteByInventoryid({
                                storeFrontId: viewInventory?.storeFrontId,
                                inventoryId: viewInventory?.id
                            })
                        }
                    >
                        {deleteByInventoryidLoad ? (
                            <Loader />
                        ) : (
                            'Delete Inventory'
                        )}
                    </div>
                    <br />
                    <div className={styles.desc}>
                        <h1>Description</h1>
                        <p>{viewInventory?.description}</p>
                    </div>
                    <div className={styles.desc}>
                        <h1>Available sizes</h1>
                        <div className={styles.avail}>
                            {viewInventory?.size.map((item, index) => {
                                return (
                                    <div className={styles.size}>
                                        <p>{item}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <h1>Available colors</h1>
                        <div className={styles.col}>
                            {viewInventory?.color.map((item, index) => {
                                return <p>{item},</p>;
                            })}
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <h1>
                            Discount <span>(optional)</span>
                        </h1>
                        <div>
                            {viewInventory?.discountPercentage ? (
                                `${viewInventory?.discountPercentage}%`
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </div>
                    {/* <div className={styles.desc}>
                        <h1>Assigned logistics</h1>
                        <div className={styles.col}>
                            {data?.logistics.map((item, index) => {
                                return <p>{item},</p>;
                            })}
                        </div>
                    </div> */}
                    <hr />
                    <div className={styles.price}>
                        <div className={styles.prMoney}>
                            <p>Price</p>
                            <h1>
                                {getSymbolFromCurrency(
                                    countryToCurrency[affiliate?.substring(1)]
                                )}
                                {parseFloat(viewInventory?.price)
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </h1>
                        </div>
                        <div className={styles.edit} onClick={editInventory}>
                            Edit Inventory
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProduct;
