export const isStringOverLength = (value, length) => {
    return value.toString().length > length
}

export const getStringFromArray = (array) => {
    if(!Array.isArray(array)){
        return 
    }
    return array.join(', ')
}