import React, { useState } from 'react';
import styled from 'styled-components';
import LogoSVG from '../../ReusableComponents/IconComponents/LogoSVG';
import { SaveAndContinueFlex, SaveAsDraft, Seperator } from '../InvoicesStyle';
import {
    ButtonContainer,
    FirstFlexOuter,
    FlexThreeContainer,
    ProductCardStyled,
    ProductDetailContainer,
    ScrollAreas,
    SecondFlexOuter
} from './Product';
import { Dashed } from './TaxDiscount';
import Modal from '../../ReusableComponents/Modal';
import SuccessDialog from '../../ReusableComponents/SuccessDialog';
import IconShare from '../../ReusableComponents/IconComponents/IconShare';
import IconDownload from '../../ReusableComponents/IconComponents/IconDownload';
import ShareComponent from '../../ReusableComponents/ShareModalDisplay';

const product = [
    {
        name: 'Nike Shirt.',
        description: 'This is the product description....',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        unitPrice: 'N1,580',
        count: 2,
        id: 222,
        gross: 'N3,160'
    },
    {
        name: 'Nike Shirt.',
        description: 'This is the product description....',
        imageUrl:
            'https://res.cloudinary.com/rashot/image/upload/v1704297812/Frame_427321487_k6irtq.png',
        unitPrice: 'N1,580',
        count: 2,
        id: 2222,
        gross: 'N3,160'
    }
];
const Review = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    return (
        <section>
            <Text>
                ***This is how the customer will see your invoice when you send
                it it them.
            </Text>
            <Flex>
                <Box>
                    <LogoSVG />
                    <section>
                        <p className="name">Isaac Store</p>
                        <p className="email">iakinyemi@ecobank.com</p>
                        <FlexNumber>
                            <p className="phone">08108928747</p>
                            <section>
                                <CircleBox />
                                <p className="phone">08108928747</p>
                            </section>
                        </FlexNumber>
                    </section>
                </Box>
                <BoxInvoice>Invoice #ISC - 09829</BoxInvoice>
            </Flex>
            <Seperator width={100} style={{ margin: '20px 0' }} />
            <FlexTwo>
                <section className="account">Account number:</section>
                <section>
                    <AccountNumber>4203210982</AccountNumber>
                    <FlexNumber>
                        <p className="phone">Akinyemi Isaac</p>
                        <section>
                            <CircleBox />
                            <p className="phone">Ecobank</p>
                        </section>
                    </FlexNumber>
                </section>
            </FlexTwo>
            <FlexTwo>
                <section className="account">Date created:</section>
                <section>
                    <AccountNumber>12/12/2021</AccountNumber>
                </section>
            </FlexTwo>
            <FlexTwo>
                <section className="account">Due date:</section>
                <section>
                    <AccountNumber>12/12/2021</AccountNumber>
                </section>
            </FlexTwo>
            <FlexTwo>
                <section className="account">Bill to:</section>
                <section>
                    <AccountNumber>Fortune Ekezie</AccountNumber>
                    <FlexNumber>
                        <p className="phone">08108928747</p>
                        <section>
                            <CircleBox />
                            <p className="phone">fekezie@gmail.com</p>
                        </section>
                    </FlexNumber>
                </section>
            </FlexTwo>
            <Seperator width={70} style={{ margin: '20px 0' }} />
            <IntroText>Item details</IntroText>
            <ScrollAreas>
                <Spacer>
                    {product.map((value) => {
                        return <ProductCard key={value.id} {...value} />;
                    })}
                </Spacer>
            </ScrollAreas>
            <Seperator width={100} style={{ margin: '20px 0' }} />
            <IntroText>Payment details</IntroText>
            <FlexTwo>
                <section className="account" style={{ color: '#7A7978' }}>
                    Subtotal
                </section>
                <section>
                    <AccountNumber style={{ color: '#455A64' }}>
                        N45,000.00
                    </AccountNumber>
                </section>
            </FlexTwo>
            <FlexTwo>
                <section className="account" style={{ color: '#7A7978' }}>
                    Tax (VAT) - 7.5%
                </section>
                <section>
                    <AccountNumber style={{ color: '#455A64' }}>
                        +N5,750.00
                    </AccountNumber>
                </section>
            </FlexTwo>
            <FlexTwo style={{ marginTop: '2px' }}>
                <section className="account" style={{ color: '#7A7978' }}>
                    Discount - 5%
                </section>
                <section>
                    <AccountNumber style={{ color: '#455A64' }}>
                        -N4,500.00
                    </AccountNumber>
                </section>
            </FlexTwo>
            <Dashed></Dashed>
            <FlexTwo style={{ marginTop: '16px' }}>
                <section className="account" style={{ color: '#7A7978' }}>
                    Amount due to pay:
                </section>
                <section>
                    <AccountNumber
                        style={{
                            color: '#102572',
                            fontWeight: 800,
                            fontSize: '20px'
                        }}
                    >
                        N49,500.00
                    </AccountNumber>
                </section>
            </FlexTwo>
            <BtnContainer>
                <Button>Pay vendor now</Button>
            </BtnContainer>
            <FooterText>This invoice was created using</FooterText>
            <BtnContainer>
                <img src="/MY_SME_LOGO_GREEN_RGB@4x1.png" loading="lazy" />
            </BtnContainer>
            <SaveAndContinueFlex>
                <p>
                    Not creating now? <SaveAsDraft>Save as Draft</SaveAsDraft>
                </p>
                <button
                    style={{ width: 176, marginTop: 0 }}
                    onClick={() => setShowSuccess(true)}
                >
                    Create invoice
                </button>
            </SaveAndContinueFlex>
            {showSuccess && (
                <Modal
                    size={'product'}
                    onClose={() => setShowSuccess(false)}
                    withCloseButton={false}
                >
                    <SuccessDialog
                        path="/Admin/Invoices"
                        btnComponent={
                            <FlexBtn>
                                <ShareAccess
                                    onClick={() => setOpenShareModal(true)}
                                >
                                    <IconShare />
                                    <a>Share invoice</a>
                                </ShareAccess>
                                <ShareAccess
                                    style={{
                                        background: 'rgba(16, 37, 114, 0.10)'
                                    }}
                                >
                                    <IconDownload />
                                    <a>Download</a>
                                </ShareAccess>
                            </FlexBtn>
                        }
                    />
                </Modal>
            )}
            {openShareModal && (
                <Modal
                    size={'product'}
                    onClose={() => setOpenShareModal(false)}
                    withCloseButton={true}
                >
                    <ShareComponent
                       
                    />
                </Modal>
            )}
        </section>
    );
};

export default Review;
const ProductCard = ({ name, description, gross, unitPrice, count }) => {
    return (
        <ProductCardStyled>
            <FirstFlexOuter>
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
                            {description}
                        </p>
                        <p style={{ marginTop: '4px' }} className="twopcs">
                            Unit price: <SpanPrice>{unitPrice} </SpanPrice>
                        </p>
                    </FlexThreeContainer>
                </ProductDetailContainer>
            </FirstFlexOuter>
            <SecondFlexOuter
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}
            >
                <Count className="count">{count}</Count>
                <p className="amount">{gross}</p>
            </SecondFlexOuter>
        </ProductCardStyled>
    );
};

const FooterText = styled.section`
    color: #323232;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 16px;
`;
const FlexBtn = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    column-gap: 20px;
    margin-bottom: 20px;
`;
const ShareAccess = styled.section`
    display: flex;
    height: 48px;
    align-items: center;
    box-sizing: border-box;
    gap: 12px;
    flex: 1 0 0;
    border-radius: 8px;
    border: 1px solid #102572;
    padding-left: 25px;
    padding-right: 16px;
    cursor: pointer;
    a {
        color: #102572;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;
const Button = styled.button`
    width: 364px;
    height: 48px;
    border-radius: 8px;
    background: var(--primary-deepBlue, #102572);
    padding: 0;
    :hover {
        width: 364px;
        height: 48px;
        border-radius: 8px;
        background: var(--primary-deepBlue, #102572);
        padding: 0;
    }
`;
const BtnContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Spacer = styled.section`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    row-gap: 20px;
`;
const SpanPrice = styled.span`
    color: #2d375b;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const Count = styled.section`
    display: flex;
    width: 16px;
    height: 16px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    color: white;
    align-items: center;
    border-radius: 50%;
    background: var(--primary-deepBlue, #102572);
    color: #fff;
    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 22px;
`;
const IntroText = styled.section`
    color: var(--Digital-Color-MobileApp-Black, #000);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const AccountNumber = styled.section`
    color: var(--Digital-Color-MobileApp-Black, #000);
    text-align: right;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const CircleBox = styled.div`
    background-color: ${(props) =>
        props.color ? `${props.color}` : '#B9B9B9'};
    box-shadow: 0px 0px 37px 0px rgba(157, 147, 147, 0.12);
    width: 4px;
    height: 4px;
    border-radius: 100%;
`;
const Text = styled.section`
    color: #2b4551;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-top: 16px;
`;
const Flex = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 15px;
    .account {
        color: var(--Digital-Color-MobileApp-Black, #000);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
const FlexTwo = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 16px;
    .account {
        color: var(--Digital-Color-MobileApp-Black, #000);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    p {
        margin: 0;
    }
`;
const FlexNumber = styled.section`
    display: flex;
    align-items: flex-start;
    column-gap: 5px;
    .phone {
        color: var(--Digital-Color-MobileApp-Black, #000);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    section {
        display: flex;
        align-items: center;
        column-gap: 4px;
    }
`;
const Box = styled.section`
    p {
        margin: 0;
    }
    .email {
        color: var(--Digital-Color-MobileApp-Black, #000);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 4px;
    }
    .name {
        color: var(--Digital-Color-MobileApp-Black, #000);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;
const BoxInvoice = styled.section`
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    background: rgba(16, 37, 114, 0.1);
    color: var(--primary-deepBlue, #102572);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
