import React, { useState } from 'react';
import styles from './styles.module.css';

const Search = ({ placeholder, array, onBankSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isListOpen, setIsListOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setSelectedItem(null);
        setIsListOpen(!!e.target.value); // Show the list when the search query is not empty
    };

    const handleBankSelect = (selectedBank) => {
        setSelectedItem(selectedBank);
        onBankSelect(selectedBank);
        setIsListOpen(false);
    };

    const filteredItems = array?.data?.filter((item) =>
        item.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.input}>
            <input
                type="text"
                placeholder={placeholder}
                value={
                    selectedItem ? selectedItem.institutionName : searchQuery
                }
                onChange={handleSearchChange}
            />
            {isListOpen && (
                <ul className={styles.searchItem}>
                    {filteredItems?.map((item, index) => (
                        <li key={index} onClick={() => handleBankSelect(item)}>
                            {item.institutionName},{item.institutionCode}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
