import React, { useState } from 'react';
import ConfirmLoan from './Confirm';
import RequestCont from './Request';
const LoansRequest = () => {
    const [page, setPage] = useState(0);
    const multiStep = () => {
        switch (page) {
            case 0:
                return <RequestCont type={true} title="Request loan" />;
            case 1:
                return <ConfirmLoan backward={() => setPage(0)} />;
        }
    };
    return <div>{multiStep()}</div>;
};

export default LoansRequest;
