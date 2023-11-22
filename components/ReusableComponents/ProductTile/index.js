import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useAddCartMutation } from '../../../redux/api/authApi';
import { setCartItem } from '../../../redux/slices/cartItems';
import { setviewProductSliceData } from '../../../redux/slices/viewProductSlice';
import Loader from '../Loader';
import styles from './styles.module.css';

const ProductTile = ({ data, call }) => {
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [
        addCart,
        {
            data: addCartData,
            isLoading: addCartLoad,
            isSuccess: addCartSuccess,
            isError: addCartFalse,
            error: addCartErr,
            reset: addCartReset
        }
    ] = useAddCartMutation();
    const addToCart = () => {
        // addCart({
        //     storeFrontId: data?.storeFrontId,
        //     inventoryId: data?.id,
        //     dateAdded: '2023/04/23',
        //     affiliateCode: data?.affiliateCode,
        //     size: data?.size[0] ? data?.size[0] : 'No Size',
        //     color: data?.color[0] ? data?.color[0] : 'No Color',
        //     quantity: 1,
        //     currentPrice: data?.price,
        //     totalCost: 50000
        // });
        const newItem = {
            storeFrontId: data?.storeFrontId,
            inventoryId: data?.id,
            id: data?.id, // replace with the actual identifier of your product
            name: data?.name,
            price: data?.price,
            image: data?.image[0],
            size: data?.size[0],
            quantity: 1 // you can adjust the quantity as needed
        };

        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
        dispatch(setCartItem(cartItems));
    };
    useEffect(() => {
        if (addCartSuccess) {
            call();
        }
    }, [addCartSuccess]);
    const router = useRouter();
    const viewProduct = (val) => {
        dispatch(setviewProductSliceData(val));
        router.push('/Store/ViewProduct');
    };

    return (
        <div className={styles.items}>
            {data ? (
                <div style={{ cursor: 'pointer' }}>
                    <Image
                        onClick={() => viewProduct(data)}
                        src={
                            data?.image[0] &&
                            data?.image[0].startsWith('data:image/png;base64,')
                                ? data?.image[0]
                                : `data:image/png;base64,${data?.image[0]}`
                        }
                        width={307}
                        height={220}
                        alt="hi"
                    />

                    <div className={styles.roundDiv}>
                        <p className={styles.round}>{data?.name}</p>
                        <div className={styles.proce}>
                            {' '}
                            <h1>{data?.price}</h1>
                            <p>N1.00</p>
                        </div>
                    </div>
                    <div className={styles.addtoCrta} onClick={addToCart}>
                        {addCartLoad ? (
                            <Loader />
                        ) : (
                            <>
                                {' '}
                                <MdAddShoppingCart /> Add to cart
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <p>There are no inventories</p>
            )}
        </div>
    );
};

export default ProductTile;
