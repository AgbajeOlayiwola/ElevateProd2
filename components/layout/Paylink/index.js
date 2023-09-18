import React, { useState } from 'react';
import PaylinkStepOne from './StepOne';

const PaylinkLayout = () => {
    const [page, setPage] = useState(0);
    const conditionalCommponent = () => {
        switch (page) {
            case 0:
                return <PaylinkStepOne />;
        }
    };
    return <div>{conditionalCommponent()}</div>;
};

export default PaylinkLayout;
