import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useCreateeInventoryMutation,
    useUpdateInventoryMutation
} from '../../../../../../redux/api/authApi';
import InputFile from '../../../../../ReusableComponents/InputFile';
import Loader from '../../../../../ReusableComponents/Loader';
import PlusSvg from '../../../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import styles from './styles.module.css';
const Step2 = ({ ifIsEdit }) => {
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
    const filteredData = logisticsProviders?.data.filter((item) =>
        item?.providerName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const {
        data: logisticsProviders,
        isLoading,
        isError,
        refetch // This function can be used to manually trigger a refetch
    } = useGetLogisticsProvidersQuery();
    const [inventories, setInventorie] = useState([]);
    const saveANdContinue = () => {
        const data = {
            ...addInventory,
            images: [image1, image2, image3, image4]
        };
        const updateDta = {
            ...addInventory,
            images: [image1, image2, image3, image4],
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
            router.reload();
        }
    }, [createeInventorySuccess, updateInventorySuccess]);

    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();

    const [image3, setImage3] = useState();

    const [image4, setImage4] = useState();

    const onProdChange1 = (data) => {
        setImage1(data.replace('data:image/png;base64,', ''));
    };
    const onProdChange2 = (data) => {
        setImage2(data.replace('data:image/png;base64,', ''));
    };
    const onProdChange3 = (data) => {
        setImage3(data.replace('data:image/png;base64,', ''));
    };
    const onProdChange4 = (data) => {
        setImage4(data.replace('data:image/png;base64,', ''));
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
                    {filteredData?.map((item, index) => {
                        return (
                            <div className={styles.fass} key={index}>
                                <input type="checkbox" />
                                <img
                                    src={item?.imageUrl}
                                    height={28}
                                    width={28}
                                    alt={item?.providerName}
                                />
                                <p>{item?.providerName}</p>
                            </div>
                        );
                    })}
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
