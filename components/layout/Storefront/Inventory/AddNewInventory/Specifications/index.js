import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddInventory } from '../../../../../../redux/slices/addInventorySlice';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Specifications = ({ ifIsEdit, backToInventories, saveANdContinue }) => {
    const { allStores } = useSelector((store) => store);
    const { storeSlice } = useSelector((store) => store);
    const [notify, setNotify] = useState(0);
    const { addInventory } = useSelector((store) => store);
    const { viewInventory } = useSelector((store) => store);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(
        ifIsEdit ? viewInventory?.quantity : 0
    );
    const affiliate = localStorage.getItem('affiliateCode');
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState('');
    const handleAddSize = (index) => {
        if (newSize.trim() !== '') {
            // Use the functional form of setNewSize to ensure the latest value
            setNewSize((currentNewSize) => {
                const updatedSizes = [...sizes, { size: currentNewSize }];
                setSizes(updatedSizes);

                const updatedSpecs = [...specsData.specs];
                updatedSpecs[index].sizes = updatedSizes;
                updatedSpecs[index].newSize = ''; // Reset newSize for the specific spec
                setSpecsData({ ...specsData, specs: updatedSpecs });

                return ''; // Return the new value for newSize
            });
        }
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
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
        // console.log('Sizes:', sizes);
        // console.log('Colors:', colors);
        // Add logic to send data to the server or perform other actions
    };
    const initEditData = { specs: viewInventory?.specifications };
    const initialSpecData = {
        specs: [
            {
                quantity: 0,
                sizes: [],
                color: '',
                price: ''
            }
        ]
    };
    const [specsData, setSpecsData] = useState(
        ifIsEdit ? initEditData : initialSpecData
    );
    const handleAddSpecs = () => {
        setSpecsData({
            ...specsData,
            specs: [
                ...specsData.specs,
                {
                    quantity: 0,
                    sizes: [],
                    color: '',
                    price: ''
                }
            ]
        });
    };

    const handleCountChange = (index, quantity) => {
        const updatedSpecs = [...specsData.specs];
        updatedSpecs[index].quantity = quantity;
        setSpecsData({ ...specsData, specs: updatedSpecs });
    };
    const handleProductPriceChange = (index, price) => {
        const updatedSpecs = [...specsData.specs];
        updatedSpecs[index].price = price;
        setSpecsData({ ...specsData, specs: updatedSpecs });
    };
    const handleSelColorChange = (index, color) => {
        const updatedSpecs = [...specsData.specs];
        updatedSpecs[index].color = color;
        setSpecsData({ ...specsData, specs: updatedSpecs });
    };
    const handleRemoveSpec = (index) => {
        const updatedSpec = [...specsData.specs];
        updatedSpec.splice(index, 1);
        setSpecsData({ ...specsData, specs: updatedSpec });
    };
    const continueBtn = () => {
        const data = {
            ...addInventory,
            specifications: specsData?.specs
        };
        dispatch(setAddInventory(data));
        saveANdContinue();
    };
    return (
        <div>
            {specsData?.specs?.map((spec, index) => {
                return (
                    <>
                        <div
                            className={styles.removeSpec}
                            onClick={() => handleRemoveSpec(index)}
                        >
                            Remove Specification
                        </div>

                        <div className={styles.flexrs}>
                            <div className={styles.flexeersDivs}>
                                <div>
                                    <label>Quantity</label>
                                    <div className={styles.flexeersDivs}>
                                        <div
                                            className={styles.remove}
                                            onClick={() => {
                                                if (quantity > 0) {
                                                    handleCountChange(
                                                        index,
                                                        quantity
                                                    );

                                                    setQuantity(quantity - 1);
                                                } else
                                                    alert(
                                                        'Numbher of items cant be less than 0'
                                                    );
                                            }}
                                        >
                                            -
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="1"
                                            value={spec.quantity}
                                            className={styles.flexInput}
                                        />
                                        <div
                                            className={styles.add}
                                            onClick={() => {
                                                handleCountChange(
                                                    index,
                                                    quantity
                                                ),
                                                    setQuantity(quantity + 1);
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
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
                                            handleProductPriceChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        value={spec?.price}
                                        type="text"
                                        placeholder="100000"
                                        className={styles.flexInput}
                                    />
                                </div>
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
                                    {spec.sizes.map((item, index) => {
                                        return (
                                            <div className={styles.size}>
                                                <p>{item.size}</p>
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
                                onClick={() => handleAddSize(index)}
                                className={styles.addNews}
                            >
                                Add New Size
                            </p>
                        </div>
                        <select
                            onChange={(e) =>
                                handleSelColorChange(index, e.target.value)
                            }
                        >
                            <option>Choose a color</option>
                            {addInventory?.color?.map((item, index) => {
                                return <option value={item}> {item}</option>;
                            })}
                        </select>
                    </>
                );
            })}
            <div>
                <p className={styles.addNews} onClick={handleAddSpecs}>
                    Add New Specification
                </p>
            </div>
            <div className={styles.saveAnd}>
                <button onClick={continueBtn}>Save and continue</button>
            </div>
        </div>
    );
};

export default Specifications;
