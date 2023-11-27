import React from 'react';
import RequestCont from '../../../ReusableComponents/RequestCont';

const LoanRequest = ({ nextPage }) => {
    return <RequestCont type={true} title="Request loan" nextPage={nextPage} />;
};

export default LoanRequest;
