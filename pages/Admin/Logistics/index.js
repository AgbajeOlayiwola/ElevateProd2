import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import InputWithSvg from '../../../components/ReusableComponents/InputWithSvg';
import Loader from '../../../components/ReusableComponents/Loader';
import LogisticsTile from '../../../components/layout/Logistics/LogisticTiles';
import { useGetLogisticsProvidersQuery } from '../../../redux/api/logisticsApi';
import styles from './styles.module.css';
const Logistics = () => {
    const {
        data: logisticsProviders,
        isLoading,
        isError,
        refetch // This function can be used to manually trigger a refetch
    } = useGetLogisticsProvidersQuery();
    useEffect(() => {
        refetch();
    }, []);
    const [checkStates, setCheckStates] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = logisticsProviders?.data.filter((item) =>
        item?.providerName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.logistics}>
            <h1 className={styles.logiH1}>Logistics</h1>
            <p>
                See a list of logistics integration enabled for your storefront
                deliveries
            </p>
            <div className={styles.logi}>
                <p className={styles.numOfLogi}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <span>{logisticsProviders?.data?.length} </span>
                    )}
                    logistics company available
                </p>
                <div className={styles.search}>
                    <InputWithSvg
                        svg={<BiSearch />}
                        placeholder="...Search for an inventory"
                        type="text"
                        label=""
                        name="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className={styles.logDiv}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        filteredData?.map((item, index) => {
                            return <LogisticsTile data={item} />;
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Logistics;
