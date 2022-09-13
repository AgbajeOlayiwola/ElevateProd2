import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

const TestPage = () => {
    return (
        <>
            <h1>Text Page</h1>
            <Script src="https://web-button.mati.io/button.js"></Script>

            <mati-button
                clientId="622f44566ac1c1001cd1daac" // from your Mati dashboard
                flowId="622f44566ac1c1001cd1daab" // from your Mati dashboard
                color="#000000" // any color
                metadata='{"user_id":"1234778"}'
            />
        </>
    );
};

export default TestPage;
