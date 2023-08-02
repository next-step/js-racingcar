export function containsOnlyNumbers(input) {
    const numberRegex = /^-?\d+(\.\d+)?$/;
    return numberRegex.test(input);
}