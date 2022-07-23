export const isValidNumberOfCharacters = (textList) => {
    const MAXIMUM_NUMBER_OF_CHARACTER = 5;
    return textList.every(text => text.length <= MAXIMUM_NUMBER_OF_CHARACTER);
}