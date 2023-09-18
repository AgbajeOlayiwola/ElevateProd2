import React from 'react';
import Iframe from 'react-iframe';
import DashLayout from '../../../components/layout/Dashboard';
import withAuth from '../../../components/HOC/withAuth';

const Dispute = () => {
    return (
        // <DashLayout>
        <Iframe
            url="https://ice.ecobank.com/chatbotui"
            width="540px"
            height="820px"
            id=""
            className=""
            display="block"
            position="relative"
        />
        // </DashLayout>
    );
};

export default withAuth(Dispute);
