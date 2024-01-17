export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol'
});
export const createFormatter = (currency) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: currency === 'ECM' ? 0 : 2,
        maximumFractionDigits: currency === 'ECM' ? 0 : 2
    });
};
