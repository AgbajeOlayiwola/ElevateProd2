import React from 'react';
import styled from 'styled-components';
import IconCard from '../ReusableComponents/IconComponents/IconCard';
import IconArrowForward from '../ReusableComponents/IconComponents/IconArrowForward';
import IconVirtual from '../ReusableComponents/IconComponents/IconVirtual';
import IconRequest from '../ReusableComponents/IconComponents/IconRequest';
import IconRetrieval from '../ReusableComponents/IconComponents/IconRetrieval';
import IconPinCreation from '../ReusableComponents/IconComponents/IconPinCreation';
import IconReplacement from '../ReusableComponents/IconComponents/IconReplacement';
import IconBlockCard from '../ReusableComponents/IconComponents/IconBlockCard';
import IconProtect from '../ReusableComponents/IconComponents/IconProtect';
import { useRouter } from 'next/router';

const CardsInterface = () => {
    const router = useRouter()
    return (
        <section>
            <CardParentHeader>
                <section>Cards</section>
                <p>Manage the cards linked to your business account here.</p>
            </CardParentHeader>
            <ParentFlexContainer>
                <BoxContainer>
                    <article>
                        <FlexIconAndText>
                            <IconCard />
                            <p>Debit Card</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconVirtual />
                            <p>Virtual Card</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>

                    <article>
                        <FlexIconAndText>
                            <IconVirtual />
                            <p>Credit Card</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                </BoxContainer>
                <BoxContainerTwo>
                    <article onClick={ () => router.push( '/Admin/cards/requests' ) }>
                        <FlexIconAndText>
                            <IconRequest />
                            <p>Card requests</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconRetrieval />
                            <p>PIN retrieval</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconPinCreation />
                            <p>PIN creation</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconReplacement />
                            <p>Card replacement</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconBlockCard />
                            <p>Block my card</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <IconProtect />
                            <p>Card protect</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                    <article>
                        <FlexIconAndText>
                            <img src='/dispense.png' />
                            <p>Dispense error complaints</p>
                        </FlexIconAndText>
                        <IconArrowForward />
                    </article>
                </BoxContainerTwo>
            </ParentFlexContainer>
        </section>
    );
};

export default CardsInterface;

const ParentFlexContainer = styled.section`
    display: flex;
    align-items: flex-start;
    column-gap: 28px;
`;
const BoxContainerTwo = styled.section`
    border-radius: 8px;
    background: #fff;
    display: flex;
    width: 616px;
    padding: 28px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    article {
        display: flex;
        padding: 20px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-radius: 8px;
        border: 1.5px solid #ededed;
        box-shadow: 0px 0px 30px 0px rgba(224, 224, 224, 0.71);
        cursor: pointer;
        width: 100%;
        :hover {
            background: rgba(16, 37, 114, 0.15);
            transition: all ease-in-out 0.4s;
        }
    }
`;
const CardParentHeader = styled.section`
    margin-bottom: 24px;
    section {
        color: #005b82;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    p {
        color: var(--Color-Black300, #545454);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
    }
`;

const BoxContainer = styled.section`
    border-radius: 8px;
    background: #fff;
    display: flex;
    width: 432px;
    padding: 28px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    article {
        display: flex;
        padding: 20px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-radius: 8px;
        border: 1.5px solid #ededed;
        cursor: pointer;
        width: 100%;
        :hover {
            background: rgba(16, 37, 114, 0.15);
            transition: all ease-in-out 0.4s;
        }
    }
`;

const FlexIconAndText = styled.section`
    display: flex;
    align-items: center;
    column-gap: 12px;
    p {
        color: #303030;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 0;
    }
`;
