import prohibited from './prohibited'
import { arrayToObject } from '../utils'

const prohibitedIf = (value, { data = {}, field = null, message = null, params = [] }) => {
    params = arrayToObject(params)

    let prohibitable = true

    for (let targetField in params) {
        prohibitable = data[targetField] == params[targetField]

        if (!prohibitable) {
            break
        }
    }

    if (!prohibitable) {
        return true
    }

    return prohibited(value, { field, message })
}

export default prohibitedIf

export const tests = () => {

}