import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import IconSearch from '../../ReusableComponents/IconComponents/IconSearch';
import {
    Flex,
    FlexBadgeContainer,
    SaveAndContinueFlex,
    SaveAsDraft,
    SelectCustomerText,
    Seperator
} from '../InvoicesStyle';
import DropDown from '../../ReusableComponents/DropDown';
import IconPlus from '../../ReusableComponents/IconComponents/IconPlus';
import CustomCheckBox from '../../ReusableComponents/CustomCheckBox';
import Pagination from '../../ReusableComponents/UsePagination/Pagination';
import Modal from '../../ReusableComponents/Modal';
import IconNaira from '../../ReusableComponents/IconComponents/IconNaira';
import Previewer from '../../ReusableComponents/UploadPlaceholder/previewer';
import { UploadPlaceholder } from '../../ReusableComponents/UploadPlaceholder';

let PageSize = 3;
const product = [
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 10,
        id: 222
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 10,
        id: 23
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 15,
        id: 22
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 12,
        id: 222
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 20,
        id: 22
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 30,
        id: 22432
    },
    {
        name: 'Name of product',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 33,
        id: 2234
    },
    {
        name: 'Nike Shirt',
        subName: '2pcs available',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        number: 34,
        id: 26432
    }
];

const Product = ({ nextPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return product.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    const [imageURL, setImageURL] = useState('');
    const handleImageUpload = async (e) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/png', 'image/jpeg'];
        const { size = 0 } = e.target.files?.[0] || {};
        if (e.target.files && e.target.files.length) {
            if (e.target.files.length > 0 && size <= maxSize) {
                if (
                    e.target.files?.[0] &&
                    allowedTypes.includes(e.target.files?.[0].type) &&
                    size <= maxSize
                ) {
                    const res = URL.createObjectURL(e.target.files[0]);
                    setImageURL(res);
                }
            } else {
                toast.error('Sorry! File is larger than 5MB', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };
    return (
        <>
            <FlexContainer>
                <p className="add_product">Add products</p>
                <div
                    className="inner-flex"
                    onClick={() => setShowAddProduct(true)}
                >
                    <IconPlus />
                    <p>Add a new product</p>
                </div>
            </FlexContainer>
            <InputWrapper>
                <div>
                    <IconSearch />
                </div>
                <input placeholder="...Search for an item" />
            </InputWrapper>
            <FlexBadgeContainer style={{ marginTop: '20px' }}>
                <DropDown defaultVal={'All items'} />
                <DropDown defaultVal={'All collections'} />
            </FlexBadgeContainer>
            <ScrollAreas>
                <Box>
                    {currentTableData.map((value) => {
                        return <ProductCard key={value.id} {...value} />;
                    })}
                </Box>
            </ScrollAreas>
            <FlexPageOf className="pagination-space-top flex_container">
                <span>{`${currentPage} - ${Math.round(
                    product.length / PageSize
                )} of ${product.length}`}</span>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={product.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </FlexPageOf>
            <SaveAndContinueFlex>
                <p>
                    Not creating now? <SaveAsDraft>Save as Draft</SaveAsDraft>
                </p>
                <button style={{ width: 176, marginTop: 0 }} onClick={nextPage}>
                    Save and Continue
                </button>
            </SaveAndContinueFlex>
            {showAddProduct && (
                <Modal
                    size={'product'}
                    onClose={() => setShowAddProduct(false)}
                >
                    <ScrollAreas height={400}>
                        <SelectCustomerText>
                            Add a new product
                        </SelectCustomerText>
                        <div
                            style={{ marginTop: '24px', marginBottom: '24px' }}
                        >
                            <label
                                style={{
                                    marginBottom: '8px',
                                    display: 'inline-block'
                                }}
                            >
                                Product name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter customer’s name"
                            />
                        </div>
                        <div
                            style={{ marginTop: '24px', marginBottom: '24px' }}
                        >
                            <label>Price of product</label>
                            <PriceFlexContainer>
                                <IconNaira />
                                <input
                                    type="text"
                                    placeholder="Enter customer’s email address"
                                    value={'00,000.00'}
                                />
                            </PriceFlexContainer>
                            <Seperator width={100} />
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <label style={{ display: 'block' }}>
                                Product description (optional)
                            </label>
                            <TextArea type="text" />
                            <Words>0/50 words</Words>
                        </div>
                        <Flex>
                            {imageURL === '' ? (
                                <UploadPlaceholder
                                    handleUpload={handleImageUpload}
                                    title="Upload product image"
                                    type="image"
                                />
                            ) : (
                                <Previewer
                                    imageURL={imageURL}
                                    onClick={() => setImageURL('')}
                                />
                            )}
                        </Flex>
                    </ScrollAreas>
                    <button style={{ marginTop: 16, }}>Add product</button>
                </Modal>
            )}
        </>
    );
};

export default Product;

const ProductCard = ({ name, subName, number }) => {
    return (
        <ProductCardStyled>
            <FirstFlexOuter>
                <CustomCheckBox />
                <ProductDetailContainer>
                    <img
                        src="https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png"
                        styles={{
                            borderRadius: '2px',
                            width: '56px',
                            height: '56px'
                        }}
                        alt="product image"
                    />
                    <FlexThreeContainer>
                        <p className="name_product">{name}</p>
                        <p style={{ marginTop: '4px' }} className="twopcs">
                            {subName}
                        </p>
                    </FlexThreeContainer>
                </ProductDetailContainer>
            </FirstFlexOuter>
            <SecondFlexOuter>
                <p className="amount">N5,080.00</p>
                <ButtonContainer>
                    <button className="minus">-</button>
                    <input defaultValue={number} />
                    <button className="add">+</button>
                </ButtonContainer>
            </SecondFlexOuter>
        </ProductCardStyled>
    );
};

export const TextArea = styled.textarea`
    border-radius: 8px;
    background: #f4f4f4;
    padding: 16px;
    width: 100%;
    height: 92px;
    margin-top: 8px;
`;
export const Words = styled.section`
    color: #727272;
    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
export const PriceFlexContainer = styled.section`
    display: flex;
    align-items: center;

    input {
        border-bottom: 1px solid red;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: none;
        background-color: white;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;
const FlexPageOf = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    span {
        color: #787878;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`;
export const ButtonContainer = styled.section`
    display: flex;
    align-items: end;
    margin-top: 5px;
    column-gap: 8px;
    input {
        width: 32px;
        border-radius: 5px !important;
        height: 32px;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0px;
        padding-bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        border: 0.5px solid var(--primary-deepBlue, #102572);
        background: #f3f4f8;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
    }
    button {
        display: flex;
        width: 32px;
        height: 32px;
        padding: 8px;
        justify-content: center;
        align-items: center;
        border-radius: 200px;

        /* pf/shadow */
        box-shadow: 0px 14px 34px 0px rgba(34, 37, 169, 0.1);
    }
    .add {
        background: var(--primary-deepBlue, #102572);
    }
    .minus {
        border-radius: 200px;
        border: 0.5px solid var(--primary-deepBlue, #102572);
        background: rgba(16, 37, 114, 0.1);
        color: #102572;
    }
`;
export const SecondFlexOuter = styled.section`
    p {
        margin-top: 0;
        margin-bottom: 0;
        margin-right: 0;
        text-align: right;
    }
    .amount {
        color: var(--primary-deepBlue, #102572);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
`;
const InputWrapper = styled.div`
    position: relative;
    margin-top: 24px;
    div {
        position: absolute;
        top: 18px;
        left: 16px;
        z-index: 10;
    }
    input {
        background-color: white;
        padding-left: 40px;
    }
`;
export const FirstFlexOuter = styled.section`
    display: flex;
    align-items: flex-start;
    column-gap: 8px;
`;
const Box = styled.section`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    row-gap: 20px;
`;
export const ProductDetailContainer = styled.section`
    display: flex;
    column-gap: 8px;
    p {
        margin: 0;
    }
    .twopcs {
        color: #121212;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
export const FlexThreeContainer = styled.section`
    display: flex;
    flex-direction: column;
    .name_product {
        color: #121212;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;
export const ProductCardStyled = styled.section`
    border-radius: 5px;
    border: 1px solid #e4e4e4;
    padding: 15px 12px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 20px;
    :hover {
        transition: all 0.5s ease-in-out;
        border: 2px solid var(--primary-deepBlue, #102572);
        background: #eef0f5;
    }
    cursor: pointer;
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    margin-top: 25px;
    p {
        margin: 0;
    }
    .add_product {
        color: #121212;
        font-family: Inter;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .inner-flex {
        display: flex;
        align-items: center;
        column-gap: 2px;
        p {
            color: #005b82;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-decoration-line: underline;
            cursor: pointer;
        }
    }
`;
export const ScrollAreas = styled.section`
    max-height: ${({ height }) => (height ? `${height}px` : `500px`)};
    margin-top: 12px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: black;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: black;
    }
`;
