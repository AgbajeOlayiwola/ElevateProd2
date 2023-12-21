const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/api/createproxy',
    createProxyMiddleware({
        target: 'https://eidev.ecobank.com:7507/smeapp-service/',
        changeOrigin: true
    })
);

app.listen(3002, () => {
    console.log('running on 3002');
});
