import { Formik } from 'formik';
import React, { useState } from 'react';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Step1 = ({ saveANdContinue }) => {
    const [count, setCount] = useState(0);
    const affiliate = localStorage.getItem('affiliateCode');
    const data = {
        size: ['XS', 'S', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Brown', 'Purple', 'Magenta', 'Lilac'],
        logistics: ['GIGM', 'Jumia', 'Express', 'FastFast']
    };

    const initialValues = {
        selectedStoreFront: '',
        productName: '',
        productCategory: '',
        productCollection: '',
        productDescription: '',
        productPrice: '',
        discount: ''
    };
    return (
        <>
            <Formik
                // validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        storeFrontId: '6546320819b9ed320de119bd',

                        name: values?.productName,
                        categoryID: '6546323819b9ed320de119bf',
                        collectionID: '6546322c19b9ed320de119be',
                        description: values?.productDescription,
                        quantity: count,
                        price: values?.productPrice,
                        lessQuantity: 2,
                        discountPercentage: values?.discount,
                        color: ['RED', 'GREY', 'GREEN', 'YELLOW']
                    };

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
                            <div>
                                <label>Select a storefront</label>
                                <select
                                    onChange={(e) =>
                                        setFieldValue(
                                            'selectedStoreFront',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="isac stores">
                                        Isac Store
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label>Product name</label>
                                <input
                                    onChange={(e) =>
                                        setFieldValue(
                                            'productName',
                                            e.target.value
                                        )
                                    }
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
                                        <option value="isacstores">
                                            Isac Store
                                        </option>
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
                                        <option value="isac stores">
                                            Isac Store
                                        </option>
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
                                    <select>
                                        <option>N/A</option>
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
                                        {data?.size.map((item, index) => {
                                            return (
                                                <div className={styles.size}>
                                                    <p>{item}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <p className={styles.addNews}>Add New Size</p>
                            </div>
                            <div>
                                <p>Colours available (optional)</p>
                                <div>
                                    <div className={styles.color}>Red</div>
                                </div>
                                <p className={styles.addNews}>Add New Colour</p>
                            </div>
                            <div className={styles.saveAnd}>
                                <button onClick={saveANdContinue}>
                                    Save and continue
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Step1;
