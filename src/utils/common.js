export const isStringOverLength = (value, length) => {
    return value.toString().length > length
}

export const isMoreThanNumber = (value, number) => {
    if(typeof value !== 'number'){
        return false;
    }

    return value >= number
}

export const getStringFromArray = (array) => {
    if(!Array.isArray(array)){
        return 
    }
    return array.join(', ')
}

export const getRandomInt = (max) => {
    const result = Math.floor(Math.random() * max)
    return result
}