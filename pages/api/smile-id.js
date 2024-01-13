import { NextResponse } from 'next/server';
import { InitializeSmileIdTokenUrl, PRODUCTNAME } from '../../utils/constants';
import { apiCallInit } from '../../utils/helper';

export async function POST(req) {
    const requestPayload = req.body;

    const url = InitializeSmileIdTokenUrl;
    const fetchConfig = {};
    fetchConfig.cache = 'no-cache';
    fetchConfig.mode = 'cors';
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    };

    // // console.log("Req::", req);
    // console.log('Url::', url);
    // // console.log("Body::", requestPayload);
    // console.log('Headers::', headers);

    try {
        const response = await apiCallInit(headers).post(url, {
            productName: PRODUCTNAME
        });
        // const response = await axios.post(url, JSON.stringify(requestPayload), {
        //   headers,
        // });

        const data = response.data;
        // console.log('Data from InitializeSmileIdTokenCall::' + data);
        // res.status(200).json(data);
        return NextResponse.json({ data });
    } catch (e) {
        console.error(e.response.data);
        // // console.log(`API: ${e?.name}, ${e?.message}`);
        // res.status(500).json({ message: "Error fetching token" });
    }
}
