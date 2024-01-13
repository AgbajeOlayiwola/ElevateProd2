import { InitializeSmileIdTokenUrl } from '../../utils/constants';
import { apiCallInit } from '../../utils/helper';

export default async function handler(req, res) {
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

    // console.log('URL::', url);
    // console.log('Headers::', headers);

    try {
        const response = await apiCallInit(headers).post(
            url,
            requestPayload,
            fetchConfig
        );
        const data = response.data;
        // console.log('Data from InitializeSmileIdTokenCall::' + data);
        res.status(200).json(data);
    } catch (e) {
        // console.log(`API: ${e?.name}, ${e?.message}`);
        res.status(500).json({ message: 'Error fetching token' });
    }
}
