import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
    useCreateCategoryMutation,
    useCreateCollectionMutation,
    useGetAllCategoryMutation,
    useGetAllCollectionsMutation,
    useUpdateStoreFrontMutation
} from '../../../../../redux/api/authApi';
import ButtonComp from '../../../../ReusableComponents/Button';
import Loader from '../../../../ReusableComponents/Loader';
import styles from './styles.module.css';

const CustomizeStoreFront = ({
    actionText,
    storeSlice,
    email,
    logo,
    banner,
    description,
    name,
    whatsapp,
    instagram,
    facebook
}) => {
    const [addCategory, setAddCategory] = useState(false);
    const [categoryname, setCategoryName] = useState('');
    const [collection, setCollction] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [
        createCollection,
        {
            data: createCollectionData,
            isLoading: createCollectionLoad,
            isSuccess: createCollectionSuccess,
            isError: createCollectionFalse,
            error: createCollectionErr,
            reset: createCollectionReset
        }
    ] = useCreateCollectionMutation();
    const [
        createCategory,
        {
            data: createCategoryData,
            isLoading: createCategoryLoad,
            isSuccess: createCategorySuccess,
            isError: createCategoryFalse,
            error: createCategoryErr,
            reset: createCategoryReset
        }
    ] = useCreateCategoryMutation();
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

    const [
        updateStoreFront,
        {
            data: updateStoreFrontData,
            isLoading: updateStoreFrontLoad,
            isSuccess: updateStoreFrontSuccess,
            isError: updateStoreFrontFalse,
            error: updateStoreFrontErr,
            reset: updateStoreFrontReset
        }
    ] = useUpdateStoreFrontMutation();
    const initialValues = {
        storeName: storeSlice?.storeFrontName,
        storeLink: '',
        storeDescription: storeSlice?.storeFrontDescription,
        storePhon: storeSlice?.phoneNumbers[0],
        storEmail: storeSlice?.email,
        storeWhatsapp: storeSlice?.whatsappLink,
        storeFacbbook: storeSlice?.facebookLink,
        storeInstagram: storeSlice?.instagramLink,
        faq1: '',
        faqAnswer1: '',
        returnPolicy: ''
    };
    const [activeBtn, setActiveBtn] = useState(true);
    const router = useRouter();
    useEffect(() => {
        getAllCategory({ storeFrontId: storeSlice?.id });
        getAllCollections({ storeFrontId: storeSlice?.id });
    }, []);

    useEffect(() => {
        if (updateStoreFrontSuccess) {
            router('/Admin/Storefront');
        }
    }, [updateStoreFrontSuccess]);
    useEffect(() => {
        if (createCategorySuccess) {
            setAddCategory(false);
            getAllCategory({ storeFrontId: storeSlice?.id });
        }
    }, [createCategorySuccess]);
    useEffect(() => {
        if (createCollectionSuccess) {
            setCollction(false);
            getAllCollections({ storeFrontId: storeSlice?.id });
        }
    }, [createCollectionSuccess]);

    return (
        <>
            <Formik
                // validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        storeFrontId: storeSlice?.id,
                        storeFrontName: values?.storeName,
                        storeFrontLink: '',
                        storeFrontDescription: values.storeDescription,
                        phoneNumbers: '',
                        email: email,
                        whatsappLink: whatsapp,
                        facebookLink: facebook,
                        instagramLink: instagram,
                        websiteLink: 'www.snowtech.com',
                        isPrimary: false,
                        useBusinessContact: false,
                        logo: logo,
                        banner: banner,
                        color: 'rogbiv'
                    };
                    updateStoreFront(data);
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
                        <h2 className={styles.actionText}>{actionText}</h2>
                        <br />
                        <br />
                        <div className={styles.hrDiv}>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <div className={styles.businessLogoDiv}>
                            <img src="/Assets/Images/businessLogo.png" alt="" />
                        </div>
                        <div className={styles.customizeBody}>
                            <h2 className={styles.profh2}>
                                Storefront Details
                            </h2>
                            <div className={styles.front}>
                                <div className={styles.customizeFirst}>
                                    <div className={styles.customizeForm}>
                                        <label>Store Name</label>
                                        <input
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'storeName',
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            placeholder="Enter Store Name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.customizeFirst}>
                                    <div className={styles.customizeForm}>
                                        <label>
                                            Store description (optional)
                                        </label>
                                        <textarea
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'storeDescription',
                                                    e.target.value
                                                )
                                            }
                                            name=""
                                            id=""
                                            className={styles.area}
                                            placeholder="Tell your customer about your business"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <br />

                            <div className={styles.hrDiv}>
                                <hr />
                            </div>
                            <br />

                            <div className={styles.customizeBody}>
                                {addCategory ? (
                                    <div className={styles.categpory}>
                                        <label>Category Name</label>
                                        <input
                                            type="text"
                                            value={collectionName}
                                            onChange={(e) =>
                                                setCollectionName(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div
                                            className={styles.button}
                                            onClick={() => {
                                                createCategory({
                                                    storeFrontId:
                                                        storeSlice?.id,
                                                    name: collectionName,
                                                    image: 'https://www.ecobank.com/image.png'
                                                });
                                            }}
                                        >
                                            {createCategoryLoad ? (
                                                <Loader />
                                            ) : (
                                                'Add'
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                                <h2 className={styles.profh2}>
                                    Product Categories
                                </h2>
                                <div className={styles.fronts}>
                                    <div
                                        className={styles.addProduvt}
                                        onClick={() => {
                                            setAddCategory(true);
                                        }}
                                    >
                                        <div>+</div>
                                        <p>Add new</p>
                                    </div>
                                    {getAllCategoryLoad ? (
                                        <Loader />
                                    ) : (
                                        getAllCategoryData?.data?.map(
                                            (name, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.addProduvt
                                                        }
                                                    >
                                                        <p>{name?.name}</p>
                                                    </div>
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            </div>
                            <br />

                            <div className={styles.hrDiv}>
                                <hr />
                            </div>
                            <br />

                            <div className={styles.customizeBody}>
                                {collection ? (
                                    <div className={styles.categpory}>
                                        <label>Collection Name</label>
                                        <input
                                            type="text"
                                            value={categoryname}
                                            onChange={(e) =>
                                                setCategoryName(e.target.value)
                                            }
                                        />
                                        <div
                                            className={styles.button}
                                            onClick={() => {
                                                createCollection({
                                                    storeFrontId:
                                                        storeSlice?.id,
                                                    name: categoryname,
                                                    image: 'https://www.ecobank.com/image.png'
                                                });
                                            }}
                                        >
                                            {createCollectionLoad ? (
                                                <Loader />
                                            ) : (
                                                'Add'
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                                <h2 className={styles.profh2}>
                                    Product Collection
                                </h2>
                                <div className={styles.fronts}>
                                    <div
                                        className={styles.addProduvt}
                                        onClick={() => {
                                            setCollction(true);
                                        }}
                                    >
                                        <div>+</div>
                                        <p>Add new</p>
                                    </div>
                                    {getAllCollectionsLoad ? (
                                        <Loader />
                                    ) : (
                                        getAllCollectionsData?.data?.map(
                                            (name, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.addProduvt
                                                        }
                                                    >
                                                        <p>{name?.name}</p>
                                                    </div>
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className={styles.hrDiv}>
                                <hr />
                            </div>
                            <br />
                            <br />
                            <div className={styles.customizeBody}>
                                <h2 className={styles.profh2}>FAQ</h2>
                                <div className={styles.front}>
                                    <div className={styles.customizeFirst}>
                                        <div className={styles.customizeForm}>
                                            <label>Question 1</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Store Name"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'faq1',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.customizeSecond}>
                                        <div className={styles.contactForm}>
                                            <label>Answer to question 1</label>
                                            <div>
                                                <input
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            'faqAnswer1',
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Enter Phone Number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className={styles.hrDiv}>
                                <hr />
                            </div>
                            <br />
                            <br />
                            <div className={styles.customizeBody}>
                                <h2 className={styles.profh2}>
                                    Return Policy - optional
                                </h2>
                                <div className={styles.customizeFirst}>
                                    <div className={styles.customizeForm}>
                                        <label>Your return policy</label>
                                        <textarea
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'returnPolicy',
                                                    e.target.value
                                                )
                                            }
                                            name=""
                                            id=""
                                            className={styles.area}
                                            placeholder="Tell your customer about your business"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className={styles.customizeFirsts}>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Save Update"
                                type="submit"
                                loads={updateStoreFrontLoad}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default CustomizeStoreFront;
