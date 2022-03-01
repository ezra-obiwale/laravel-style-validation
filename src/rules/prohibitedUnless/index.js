import prohibited from '../prohibited'
import { arrayToObject } from '../../utils'

const prohibitedUnless = (value, options = {}) => {
    const { data = {}, field = null, message = null, params = [] } = options
    const paramsObject = arrayToObject(params)

    let prohibitable = true

    for (let targetField in paramsObject) {
        prohibitable = JSON.stringify(data[targetField]) === JSON.stringify(paramsObject[targetField])

        if (prohibitable) {
            break
        }
    }

    if (!prohibitable) {
        return true
    }

    return prohibited(value, { data, field, message })
}

export default prohibitedUnless
