import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Cover from '../../../components/ReusableComponents/Cover';
import ProductTile from '../../../components/ReusableComponents/ProductTile';
import StoreNavbar from '../../../components/layout/navbar/Navbar';
import { useStorelinkGetStoreMutation } from '../../../redux/api/authApi';
import { setCartItem } from '../../../redux/slices/cartItems';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const ViewProduct = () => {
    const affiliate = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    const { viewProductSliceData } = useSelector((store) => store);
    const [
        storelinkGetStore,
        {
            data: storelinkGetStoreData,
            isLoading: storelinkGetStoreLoad,
            isSuccess: storelinkGetStoreSuccess,
            isError: storelinkGetStoreFalse,
            error: storelinkGetStoreErr,
            reset: storelinkGetStoreReset
        }
    ] = useStorelinkGetStoreMutation();
    const router = useRouter();
    const data = {
        size: ['XS', 'S', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Brown', 'Purple', 'Magenta', 'Lilac'],
        logistics: ['GIGM', 'Jumia', 'Express', 'FastFast']
    };
    const buyNow = () => {
        dispatch(setCartItem(viewProductSliceData));
        router.push('/Store/Cart');
    };
    return (
        <>
            <Cover>
                <StoreNavbar />
                <div className={styles.viewProduct}>
                    <div className={styles.left}>
                        <Image
                            height={600}
                            width={632}
                            src={viewProductSliceData?.image[0]}
                            alt="kjhgf"
                        />
                        <div className={styles.sample}>
                            <div className={styles.sampleImh}>
                                {viewProductSliceData?.image.map(
                                    (item, index) => {
                                        return (
                                            <>
                                                <Image
                                                    height={37}
                                                    width={43}
                                                    src={item}
                                                    alt="kjhgf"
                                                />
                                            </>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.rightDiv}>
                            <div className={styles.round}>
                                <h1>{viewProductSliceData?.name}</h1>
                                <p className={styles.name}>Short</p>
                                <p className={styles.stock}>
                                    {viewProductSliceData?.quantity} in Stock
                                </p>
                            </div>
                        </div>
                        <div className={styles.desc}>
                            <h1>Description</h1>
                            <p>{viewProductSliceData?.description}</p>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className={styles.desc}>
                            <h1>Available sizes</h1>
                            <div className={styles.avail}>
                                {viewProductSliceData?.size.map(
                                    (item, index) => {
                                        return (
                                            <div className={styles.size}>
                                                <p>{item}</p>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className={styles.desc}>
                            <h1>Available colors</h1>
                            <div className={styles.col}>
                                {viewProductSliceData?.color.map(
                                    (item, index) => {
                                        return (
                                            <p className={styles.colors}>
                                                {item}
                                            </p>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        {/* <br />
                        <hr />
                        <br /> */}
                        {/* <div className={styles.desc}>
                            <h1>FAQs</h1>
                            <div className={styles.col}>
                                <p>Question 1</p>
                                <p>
                                    Question 1: How long does it take before you
                                    get your order?
                                </p>
                            </div>
                            <div className={styles.col}>
                                <p>Question 1</p>
                                <p>
                                    Question 1: How long does it take before you
                                    get your order?
                                </p>
                            </div>
                            <div className={styles.col}>
                                <p>Question 1</p>
                                <p>
                                    Question 1: How long does it take before you
                                    get your order?
                                </p>
                            </div>
                            <div className={styles.col}>
                                <p>Question 1</p>
                                <p>
                                    Question 1: How long does it take before you
                                    get your order?
                                </p>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className={styles.desc}>
                            <h1>Return Policy </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Amet sit justo, consequat
                                adipiscing dictum praesent sed diam.
                            </p>
                        </div> */}
                        <br />
                        <hr />
                        <br />

                        <div className={styles.price}>
                            <div className={styles.prMoney}>
                                <p>Price</p>
                                <h1>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            affiliate?.substring(1)
                                        ]
                                    )}
                                    {parseFloat(viewProductSliceData?.price)
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </h1>
                            </div>
                            <div className={styles.editAdd}>
                                <div className={styles.edit}>
                                    <MdOutlineRemoveShoppingCart /> Remove From
                                    Cart
                                </div>
                                <div className={styles.buyNow} onClick={buyNow}>
                                    Buy Now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={styles.cust}>Customers also view this</p>
                <div className={styles.products}>
                    <ProductTile />
                    <ProductTile />
                    <ProductTile />
                    <ProductTile />
                </div>
            </Cover>
        </>
    );
};

export default ViewProduct;
