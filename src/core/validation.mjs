export function isEmpty(str) {
    const carsNames = str.split(",");

    return !(carsNames.length === 0 || carsNames.some((name) => name.trim() === ""));
}

export function validationTryCount(str) {
    const count = parseInt(str, 10);

    return !(!count || isNaN(count));
}
