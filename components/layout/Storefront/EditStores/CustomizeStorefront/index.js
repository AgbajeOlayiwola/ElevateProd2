import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useCreateCategoryMutation,
    useCreateCollectionMutation,
    useDeleteCategoryMutation,
    useDeleteCollectionMutation,
    useGetAllCategoryMutation,
    useGetAllCollectionsMutation,
    useUpdateFaqsMutation,
    useUpdateStoreFrontMutation
} from '../../../../../redux/api/authApi';
import ButtonComp from '../../../../ReusableComponents/Button';
import CloseBtnSvg from '../../../../ReusableComponents/ClosebtnSvg';
import InputFile from '../../../../ReusableComponents/InputFile';
import Loader from '../../../../ReusableComponents/Loader';
import PlusSvg from '../../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
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
    facebook,
    phone,
    goBackTostore
}) => {
    const [addCategory, setAddCategory] = useState(false);
    const [categoryname, setCategoryName] = useState('');
    const [collection, setCollction] = useState(false);
    const [collectionName, setCollectionName] = useState('');

    const initialFaqData = {
        storeFrontId: storeSlice?.id,
        faqs: [{ question: '', answer: '' }],
        returnPolicy: ''
    };

    const [faqData, setFaqData] = useState(initialFaqData);
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
        updateFaqs,
        {
            data: updateFaqsData,
            isLoading: updateFaqsLoad,
            isSuccess: updateFaqsSuccess,
            isError: updateFaqsFalse,
            error: updateFaqsErr,
            reset: updateFaqsReset
        }
    ] = useUpdateFaqsMutation();

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

    const [
        deleteCategory,
        {
            data: deleteCategoryData,
            isLoading: deleteCategoryLoad,
            isSuccess: deleteCategorySuccess,
            isError: deleteCategoryFalse,
            error: deleteCategoryErr,
            reset: deleteCategoryReset
        }
    ] = useDeleteCategoryMutation();
    const [
        deleteCollection,
        {
            data: deleteCollectionData,
            isLoading: deleteCollectionLoad,
            isSuccess: deleteCollectionSuccess,
            isError: deleteCollectionFalse,
            error: deleteCollectionErr,
            reset: deleteCollectionReset
        }
    ] = useDeleteCollectionMutation();

    const initialValues = {
        storeName: storeSlice?.storeFrontName,
        storeLink: '',
        storeDescription: storeSlice?.storeFrontDescription,
        storePhone: phone,
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
            goBackTostore();
        }
    }, [updateStoreFrontSuccess]);
    useEffect(() => {
        if (createCategorySuccess || deleteCategorySuccess) {
            setAddCategory(false);
            getAllCategory({ storeFrontId: storeSlice?.id });
        }
    }, [createCategorySuccess, deleteCategorySuccess]);
    useEffect(() => {
        if (createCollectionSuccess || deleteCollectionSuccess) {
            setCollction(false);
            getAllCollections({ storeFrontId: storeSlice?.id });
        }
    }, [createCollectionSuccess, deleteCollectionSuccess]);
    const handleQuestionChange = (index, question) => {
        const updatedFaqs = [...faqData.faqs];
        updatedFaqs[index].question = question;
        setFaqData({ ...faqData, faqs: updatedFaqs });
    };

    const handleAnswerChange = (index, answer) => {
        const updatedFaqs = [...faqData.faqs];
        updatedFaqs[index].answer = answer;
        setFaqData({ ...faqData, faqs: updatedFaqs });
    };

    const handleAddFaq = () => {
        setFaqData({
            ...faqData,
            faqs: [...faqData.faqs, { question: '', answer: '' }]
        });
    };

    const handleRemoveFaq = (index) => {
        const updatedFaqs = [...faqData.faqs];
        updatedFaqs.splice(index, 1);
        setFaqData({ ...faqData, faqs: updatedFaqs });
    };

    const handleReturnPolicyChange = (returnPolicy) => {
        setFaqData({ ...faqData, returnPolicy });
    };

    const handleSubmitFaqs = () => {
        // Handle submission of faqData
        console.log(faqData);
        // Add logic to send data to the server or perform other actions
        updateFaqs(faqData);
    };
    const showToastMessage = () => {
        toast.success('FAQs and Policies Added', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (updateFaqsSuccess) {
            showToastMessage();
        }
    }, [updateFaqsSuccess]);
    const [bannerImagee, setBannerImage] = useState();
    const onImageUrlChangeBanner = (data) => {
        setBannerImage(data.replace('data:image/png;base64,', ''));
    };
    return (
        <>
            {addCategory ? (
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div>
                            <div className={styles.add}>
                                <h2>Add Category</h2>
                                <CloseBtnSvg
                                    action={() => setAddCategory(false)}
                                />
                            </div>
                            <div className={styles.categpory}>
                                <InputFile
                                    icon={<PlusSvg />}
                                    name="Upload your category banner"
                                    disclaimer=""
                                    uploadLabel="Click to add a catgory banner banner"
                                    logoBanner="banner"
                                    onImageUrlChange={onImageUrlChangeBanner}
                                />
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={collectionName}
                                    onChange={(e) =>
                                        setCollectionName(e.target.value)
                                    }
                                />
                                <br />
                                <div
                                    className={styles.button}
                                    onClick={() => {
                                        createCategory({
                                            storeFrontId: storeSlice?.id,
                                            name: collectionName,
                                            image: bannerImagee
                                        });
                                    }}
                                >
                                    {createCategoryLoad ? <Loader /> : 'Add'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {collection ? (
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div>
                            <div className={styles.add}>
                                <h2>Add Collection</h2>
                                <CloseBtnSvg
                                    action={() => setCollction(false)}
                                />
                            </div>
                            <div className={styles.categpory}>
                                <InputFile
                                    icon={<PlusSvg />}
                                    name="Upload your collection banner"
                                    disclaimer=""
                                    uploadLabel="Click to add a collection banner banner"
                                    logoBanner="banner"
                                    onImageUrlChange={onImageUrlChangeBanner}
                                />

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
                                            storeFrontId: storeSlice?.id,
                                            name: categoryname,
                                            image: bannerImagee
                                        });
                                    }}
                                >
                                    {createCollectionLoad ? <Loader /> : 'Add'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <ToastContainer />
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
                        phoneNumbers: phone,
                        email: email,
                        whatsappLink: whatsapp,
                        facebookLink: facebook,
                        instagramLink: instagram,
                        websiteLink: storeSlice?.storeFrontLink,
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
                                                    <div>
                                                        <div
                                                            key={index}
                                                            className={
                                                                styles.addProduvt
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.addProduvtOverlay
                                                                }
                                                            ></div>
                                                            <img
                                                                src={`data:image/png;base64,${name?.image}`}
                                                                width={10}
                                                                height={50}
                                                            />
                                                            <p
                                                                className={
                                                                    styles.categpryP
                                                                }
                                                            >
                                                                {name?.name}
                                                            </p>
                                                        </div>
                                                        {deleteCategoryLoad ? (
                                                            <Loader />
                                                        ) : (
                                                            <p
                                                                style={{
                                                                    color: 'red',
                                                                    textAlign:
                                                                        'center',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() =>
                                                                    deleteCategory(
                                                                        {
                                                                            storeFrontId:
                                                                                storeSlice?.id,
                                                                            productCategoryId:
                                                                                name?.id
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {' '}
                                                                Delete
                                                            </p>
                                                        )}
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
                                                    <div>
                                                        <div
                                                            key={index}
                                                            className={
                                                                styles.addProduvt
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.addProduvtOverlay
                                                                }
                                                            ></div>
                                                            <img
                                                                src={`data:image/png;base64,${name?.image}`}
                                                                width={10}
                                                                height={50}
                                                            />
                                                            <p
                                                                className={
                                                                    styles.categpryP
                                                                }
                                                            >
                                                                {name?.name}
                                                            </p>
                                                        </div>
                                                        {deleteCollectionLoad ? (
                                                            <Loader />
                                                        ) : (
                                                            <p
                                                                style={{
                                                                    color: 'red',
                                                                    textAlign:
                                                                        'center',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() =>
                                                                    deleteCollection(
                                                                        {
                                                                            storeFrontId:
                                                                                storeSlice?.id,
                                                                            productCollectionId:
                                                                                name?.id
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </p>
                                                        )}
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
                            {faqData.faqs.map((faq, index) => (
                                <div key={index}>
                                    <div className={styles.customizeBody}>
                                        <h2 className={styles.profh2}>FAQ</h2>
                                        <div className={styles.front}>
                                            <div
                                                className={
                                                    styles.customizeFirst
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.customizeForm
                                                    }
                                                >
                                                    <label>Question </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Question"
                                                        value={faq.question}
                                                        onChange={(e) =>
                                                            handleQuestionChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.customizeFirst
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.customizeForm
                                                    }
                                                >
                                                    <label>
                                                        Answer to question{' '}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Answer"
                                                        value={faq.answer}
                                                        onChange={(e) =>
                                                            handleAnswerChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.removeFaq}
                                            onClick={() =>
                                                handleRemoveFaq(index)
                                            }
                                        >
                                            Remove FAQ
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div
                                className={styles.addFaq}
                                type="button"
                                onClick={handleAddFaq}
                            >
                                Add FAQ
                            </div>
                            <br />

                            <div className={styles.hrDiv}>
                                <hr />
                            </div>
                            <br />

                            <div className={styles.customizeBody}>
                                <h2 className={styles.profh2}>
                                    Return Policy - optional
                                </h2>
                                <div className={styles.customizeFirst}>
                                    <div className={styles.customizeForm}>
                                        <label>Your return policy</label>
                                        <textarea
                                            type="text"
                                            value={faqData.returnPolicy}
                                            onChange={(e) =>
                                                handleReturnPolicyChange(
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
                            <div
                                className={styles.addFaq}
                                type="button"
                                onClick={handleSubmitFaqs}
                            >
                                {updateFaqsLoad ? (
                                    <Loader />
                                ) : (
                                    'Submit FAQs and Return Policy'
                                )}
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
