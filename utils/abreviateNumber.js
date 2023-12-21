export const abbreviateNumber = (number) => {
    if (number === 0) {
        return '0';
    }

    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const order = Math?.min(
        Math.floor(Math?.log10(Math?.abs(number)) / 3),
        suffixes.length - 1
    );
    const roundedNumber = (number / Math?.pow(1000, order))?.toFixed(2);
    return roundedNumber + suffixes[order];
};
