import React from 'react';
import Head from 'next/head';

const TestPage = () => {
    return (
        <>
            <h1>Text Page</h1>
            <Head>
                <script src="https://web-button.mati.io/button.js"></script>
            </Head>
            <mati-button
                clientId="622f44566ac1c1001cd1daac" // from your Mati dashboard
                flowId="62fb9b12235dfd001ed92fec" // from your Mati dashboard
                color="#000000" // any color
                metadata='{"user_id":"1234778"}'
            />
        </>
    );
};

export default TestPage;
