import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetAllCategoryMutation,
    useGetAllCollectionsMutation
} from '../../../../../../redux/api/authApi';
import { setAddInventory } from '../../../../../../redux/slices/addInventorySlice';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Step1 = ({ saveANdContinue, ifIsEdit }) => {
    const { storeSlice } = useSelector((store) => store);
    const [notify, setNotify] = useState(0);
    const { viewInventory } = useSelector((store) => store);
    const dispatch = useDispatch();
    const [count, setCount] = useState(ifIsEdit ? viewInventory?.quantity : 0);
    const affiliate = localStorage.getItem('affiliateCode');
    const data = {
        logistics: ['GIGM', 'Jumia', 'Express', 'FastFast']
    };
    const [
        getAllCollections,
        {
            data: getAllCollectionsData,
            isLoading: getAllCollectionsLoad,
            isSuccess: getAllCollectionsSuccess,
            isError: getAllCollectionsFalse,
            error: getAllCollectionsErr,
            reset: getAllCollectionsReset
        }
    ] = useGetAllCollectionsMutation();
    const [
        getAllCategory,
        {
            data: getAllCategoryData,
            isLoading: getAllCategoryLoad,
            isSuccess: getAllCategorySuccess,
            isError: getAllCategoryFalse,
            error: getAllCategoryErr,
            reset: getAllCategoryReset
        }
    ] = useGetAllCategoryMutation();
    useEffect(() => {
        getAllCategory({ storeFrontId: storeSlice?.id });
        getAllCollections({ storeFrontId: storeSlice?.id });
    }, []);

    const initialValues = {
        selectedStoreFront: '',
        storeFrontId: storeSlice?.id ? storeSlice?.id : allStores[0]?.id,
        productName: ifIsEdit ? viewInventory?.name : '',
        productCategory: ifIsEdit ? viewInventory?.category?.id : '',
        productCollection: ifIsEdit ? viewInventory?.collection?.id : '',
        productDescription: ifIsEdit ? viewInventory?.description : '',
        productPrice: ifIsEdit ? viewInventory?.price : '',
        discount: ifIsEdit ? viewInventory?.discountPercentage : ''
    };
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState('');

    const handleAddSize = () => {
        if (newSize.trim() !== '') {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
    };

    const handleSizeChange = (index, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = value;
        setSizes(updatedSizes);
    };

    const handleAddColor = () => {
        if (newColor.trim() !== '') {
            setColors([...colors, newColor]);
            setNewColor('');
        }
    };

    const handleRemoveColor = (index) => {
        const updatedColors = [...colors];
        updatedColors.splice(index, 1);
        setColors(updatedColors);
    };

    const handleColorChange = (index, value) => {
        const updatedColors = [...colors];
        updatedColors[index] = value;
        setColors(updatedColors);
    };

    const handleSubmit = () => {
        // Handle submission of sizes and colors
        console.log('Sizes:', sizes);
        console.log('Colors:', colors);
        // Add logic to send data to the server or perform other actions
    };
    const { allStores } = useSelector((store) => store);
    return (
        <>
            <Formik
                // validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        storeFrontId: values?.storeFrontId,
                        name: values?.productName,
                        categoryID: values?.productCategory,
                        collectionID: values?.productCollection,
                        description: values?.productDescription,
                        quantity: count,
                        price: values?.productPrice,
                        lessQuantity: notify,
                        discountPercentage: values?.discount,
                        color: colors,
                        size: sizes
                    };
                    console.log(data);
                    dispatch(setAddInventory(data));
                    saveANdContinue();
                    setSubmitting(false);
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
                    <form onSubmit={handleSubmit}>
                        <div className={styles.firstStep}>
                            {ifIsEdit ? null : (
                                <div>
                                    <label>Select a storefront</label>
                                    <select
                                        onChange={(e) => {
                                            const selectedAccount =
                                                allStores?.find(
                                                    (account) =>
                                                        account?.accountNo ===
                                                        e.target.value
                                                );
                                            if (selectedAccount) {
                                                setFieldValue(
                                                    'ecoSourceAccount',
                                                    selectedAccount?.accountNo
                                                );
                                                setFieldValue(
                                                    'storeFrontId',
                                                    selectedAccount?.accountId
                                                );
                                                setFieldValue(
                                                    'selectedStoreFront',
                                                    e.target.value
                                                );
                                            }
                                        }}
                                    >
                                        {allStores?.map((item, index) => {
                                            return (
                                                <option value="isac stores">
                                                    {item?.storeFrontName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label>Product name</label>
                                <input
                                    onChange={(e) =>
                                        setFieldValue(
                                            'productName',
                                            e.target.value
                                        )
                                    }
                                    value={values?.productName}
                                    type="text"
                                    placeholder="Type name of product"
                                />
                            </div>
                            <div className={styles.flexrs}>
                                <div className={styles.flexeersDiv}>
                                    <label>Select product category</label>
                                    <select
                                        onChange={(e) =>
                                            setFieldValue(
                                                'productCategory',
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>Choose Category</option>

                                        {ifIsEdit ? (
                                            <option
                                                value={
                                                    viewInventory?.category?.id
                                                }
                                            >
                                                {viewInventory?.category?.name}
                                            </option>
                                        ) : (
                                            getAllCategoryData?.data.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            value={item?.id}
                                                            key={index}
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    );
                                                }
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className={styles.flexeersDiv}>
                                    <label>Select product collection</label>
                                    <select
                                        onChange={(e) =>
                                            setFieldValue(
                                                'productCollection',
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>Choose Collection</option>

                                        {ifIsEdit ? (
                                            <option
                                                value={
                                                    viewInventory?.collecction
                                                        ?.id
                                                }
                                            >
                                                {
                                                    viewInventory?.collection
                                                        ?.name
                                                }
                                            </option>
                                        ) : (
                                            getAllCollectionsData?.data?.map(
                                                (name, index) => {
                                                    return (
                                                        <option
                                                            value={name?.id}
                                                            key={index}
                                                        >
                                                            {name?.name}
                                                        </option>
                                                    );
                                                }
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.textArea}>
                                <label>Product description (optional)</label>
                                <textarea
                                    onChange={(e) =>
                                        setFieldValue(
                                            'productDescription',
                                            e.target.value
                                        )
                                    }
                                    value={values?.productDescription}
                                    placeholder="This product is the latest design from Louis Vuitton. It is vintage and of high quality."
                                ></textarea>
                            </div>

                            <div className={styles.flexrs}>
                                <div className={styles.flexeersDivs}>
                                    <div
                                        className={styles.remove}
                                        onClick={() => {
                                            if (count > 0) {
                                                setCount(count - 1);
                                            } else
                                                alert(
                                                    'Numbher of iytems cant be less than 0'
                                                );
                                        }}
                                    >
                                        -
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="1"
                                        value={count}
                                        className={styles.flexInput}
                                    />
                                    <div
                                        className={styles.add}
                                        onClick={() => setCount(count + 1)}
                                    >
                                        +
                                    </div>
                                </div>
                                <div className={styles.flexeersDiv}>
                                    <label>Price of product</label>
                                    <div className={styles.inputIneerDiv}>
                                        <p>
                                            {getSymbolFromCurrency(
                                                countryToCurrency[
                                                    affiliate?.substring(1)
                                                ]
                                            )}
                                        </p>

                                        <input
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'productPrice',
                                                    e.target.value
                                                )
                                            }
                                            value={values?.productPrice}
                                            type="text"
                                            placeholder="100000"
                                            className={styles.flexInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.flexrs}>
                                <div className={styles.flexeersDiv}>
                                    <label>
                                        Notify me when product is less than
                                        (optional)y
                                    </label>
                                    <select
                                        onChange={(e) =>
                                            setNotify(e.target.value)
                                        }
                                    >
                                        <option value={0}>N/A</option>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </select>
                                </div>
                                <div className={styles.flexeersDiv}>
                                    <label>
                                        Discount percentage (optional)
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFieldValue(
                                                'discount',
                                                e.target.value
                                            )
                                        }
                                        value={values?.discount}
                                        type="text"
                                        placeholder="N/A"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={styles.availa}>
                                    {' '}
                                    <p>Sizes available (optional)</p>{' '}
                                    <div className={styles.avail}>
                                        {ifIsEdit
                                            ? viewInventory?.size.map(
                                                  (item, index) => {
                                                      return (
                                                          <div
                                                              className={
                                                                  styles.size
                                                              }
                                                          >
                                                              <p>{item}</p>
                                                          </div>
                                                      );
                                                  }
                                              )
                                            : null}
                                        {sizes.map((item, index) => {
                                            return (
                                                <div className={styles.size}>
                                                    <p>{item}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>{' '}
                                <input
                                    type="text"
                                    placeholder="New Size"
                                    value={newSize}
                                    onChange={(e) => setNewSize(e.target.value)}
                                />
                                <p
                                    onClick={handleAddSize}
                                    className={styles.addNews}
                                >
                                    Add New Size
                                </p>
                            </div>
                            <div>
                                <p>Colours available (optional)</p>
                                <div className={styles.colorsDiv}>
                                    {ifIsEdit
                                        ? viewInventory?.color.map(
                                              (item, index) => {
                                                  return (
                                                      <div
                                                          className={
                                                              styles.size
                                                          }
                                                      >
                                                          <p>{item}</p>
                                                      </div>
                                                  );
                                              }
                                          )
                                        : null}

                                    {colors.map((item, index) => {
                                        return (
                                            <div className={styles.color}>
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                                <input
                                    type="text"
                                    placeholder="New Color"
                                    value={newColor}
                                    onChange={(e) =>
                                        setNewColor(e.target.value)
                                    }
                                />
                                <p
                                    className={styles.addNews}
                                    onClick={handleAddColor}
                                >
                                    Add New Colour
                                </p>
                            </div>
                            <div className={styles.saveAnd}>
                                <button>Save and continue</button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <div></div>
        </>
    );
};

export default Step1;
