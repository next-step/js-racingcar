export const isAlphabet = (str) => {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(str);
};