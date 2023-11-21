import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useCreateeInventoryMutation,
    useUpdateInventoryMutation
} from '../../../../../../redux/api/authApi';
import { useGetStationsQuery } from '../../../../../../redux/api/logisticsApi';
import InputFile from '../../../../../ReusableComponents/InputFile';
import Loader from '../../../../../ReusableComponents/Loader';
import PlusSvg from '../../../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import styles from './styles.module.css';
const Step2 = ({ ifIsEdit, backToInventories }) => {
    const [assignLog, setAssignLog] = useState(true);
    const { viewInventory } = useSelector((store) => store);
    const router = useRouter();
    const { addInventory } = useSelector((store) => store);
    const [
        createeInventory,
        {
            data: createeInventoryData,
            isLoading: createeInventoryLoad,
            isSuccess: createeInventorySuccess,
            isError: createeInventoryFalse,
            error: createeInventoryErr,
            reset: createeInventoryReset
        }
    ] = useCreateeInventoryMutation();

    const [
        updateInventory,
        {
            data: updateInventoryData,
            isLoading: updateInventoryLoad,
            isSuccess: updateInventorySuccess,
            isError: updateInventoryFalse,
            error: updateInventoryErr,
            reset: updateInventoryReset
        }
    ] = useUpdateInventoryMutation();

    console.log(addInventory);

    const {
        data: getStationsData,
        isLoading,
        isError,
        refetch // This function can be used to manually trigger a refetch
    } = useGetStationsQuery();
    useEffect(() => {
        refetch();
    }, []);
    const [selectedLogisticsIds, setSelectedLogisticsIds] = useState([]);

    const [inventories, setInventorie] = useState([]);
    const [logisticsId, stLogisticsID] = useState([]);
    const handleCheckboxChange = (id) => {
        // Convert id to string
        const stringId = id.toString();

        // Check if the stringId is already in the selectedLogisticsIds array
        if (selectedLogisticsIds.includes(stringId)) {
            // If yes, remove it
            setSelectedLogisticsIds((prevIds) =>
                prevIds.filter((selectedId) => selectedId !== stringId)
            );
        } else {
            // If no, add it
            setSelectedLogisticsIds((prevIds) => [...prevIds, stringId]);
        }
    };
    const saveANdContinue = () => {
        const imageArray = [
            image1 ? image1 : null,
            image2 ? image2 : null,
            image3 ? image3 : null,
            image4 ? image4 : null
        ].filter(Boolean);
        const data = {
            ...addInventory,
            image: imageArray,
            logisticsId: selectedLogisticsIds
        };
        const updateDta = {
            ...addInventory,
            image: imageArray,
            logisticsId: selectedLogisticsIds,
            inventoryId: viewInventory?.id
        };
        if (ifIsEdit) {
            updateInventory(updateDta);
        } else {
            createeInventory(data);
        }
        // alert('Done');
    };
    const addNew = () => {
        setAssignLog((prev) => !prev);
    };
    useEffect(() => {
        if (createeInventorySuccess || updateInventorySuccess) {
            backToInventories();
        }
    }, [createeInventorySuccess, updateInventorySuccess]);

    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();

    const [image3, setImage3] = useState();

    const [image4, setImage4] = useState();

    const onProdChange1 = (data) => {
        setImage1(data);
    };
    const onProdChange2 = (data) => {
        setImage2(data);
    };
    const onProdChange3 = (data) => {
        setImage3(data);
    };
    const onProdChange4 = (data) => {
        setImage4(data);
    };
    return (
        <div className={styles.second}>
            {assignLog ? (
                <div className={styles.assignFe}>
                    <div className={styles.assign}>
                        <p>Assign logistics</p>
                        <div onClick={() => addNew()}>Add new logistics</div>
                        <p>
                            This helps you set delivery prices based on location
                        </p>
                    </div>
                </div>
            ) : (
                <div className={styles.companys}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        getStationsData?.data?.map((item, index) => {
                            const stringId = item.id.toString();
                            const isChecked =
                                selectedLogisticsIds.includes(stringId);

                            return (
                                <div className={styles.fass} key={index}>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() =>
                                            handleCheckboxChange(item.id)
                                        }
                                    />
                                    <img
                                        src={item.imageUrl}
                                        height={28}
                                        width={28}
                                        alt={item.providerName}
                                    />
                                    <p>{item.providerName}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
            <br />
            <div className={styles.images}>
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer="'"
                    uploadLabel="Add image"
                    logoBanner="banner"
                    onImageUrlChange={onProdChange1}
                />
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                    onImageUrlChange={onProdChange2}
                />
            </div>
            <div className={styles.images}>
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                    onImageUrlChange={onProdChange3}
                />
                <InputFile
                    icon={<PlusSvg />}
                    name=""
                    disclaimer=""
                    uploadLabel="Add image"
                    logoBanner="banner"
                    onImageUrlChange={onProdChange4}
                />
            </div>
            <br />
            <p className={styles.faReturn}>FAQ</p>
            <div className={styles.fas}>
                <input type="checkbox" />
                <p>
                    Use already added storefront <span>FAQs</span>
                </p>
            </div>
            <p className={styles.faReturn}>Return Policy</p>
            <div className={styles.fas}>
                <input type="checkbox" />
                <p>
                    Use already added storefront Return Policy{' '}
                    <span>Return Policy</span>
                </p>
            </div>
            <div className={styles.saveAnd}>
                <button onClick={saveANdContinue}>
                    {createeInventoryLoad || updateInventoryLoad ? (
                        <Loader />
                    ) : (
                        'Save and continue'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Step2;
