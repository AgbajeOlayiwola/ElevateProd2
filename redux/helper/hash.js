import React from 'react';
import CryptoJS from 'crypto-js';

export const encrypt = (content) => {
    var key = CryptoJS.enc.Utf8.parse('TheBestSecretKey');
    var encryptResult = CryptoJS.AES.encrypt(content, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptResult.toString();
};
//console.log(encrypt('password'));

export const decrypt = (content) => {
    var key = CryptoJS.enc.Utf8.parse('TheBestSecretKey');
    const bytes = CryptoJS.AES.decrypt(content.toString(), key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    return decryptResult.toString();
};

// dead code
