import React, { useState } from 'react';
import Card from './Card/index';
import ButtonComp from '../../ReusableComponents/Button';
import RegisteredForm from './RegisteredForm';
import StepTwoBVNAuthenticator from './StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from './StepThreeCompleteProfile1';
import Link from 'next/link';

const ProfileSetups = () => {
    const [page, setPage] = useState(0);
    const [activeBtn, setActiveBtn] = useState(true);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <RegisteredForm />;
            case 1:
                return <StepTwoBVNAuthenticator />;
            case 2:
                return <StepThreeCompleteProfile1 />;
            default:
                return <RegisteredForm />;
        }
    };
    function handleSubmit() {
        setPage(page + 1);
    }
    return (
        <Card>
            {conditionalComponent()}
            {page === 2 ? null : (
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    onClick={handleSubmit}
                    type="submit"
                    text={page === 2 ? 'Next' : 'Next'}
                />
            )}
        </Card>
    );
};

export default ProfileSetups;
