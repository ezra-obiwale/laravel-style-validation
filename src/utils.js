export const arrayToObject = arr => {
    const obj = {}

    if (!Array.isArray(arr)) {
        return obj
    }

    let key = null

    arr.forEach(value => {
        if (!key) {
            key = value
        } else {
            obj[key] = value
            key = null
        }
    })

    return obj
}