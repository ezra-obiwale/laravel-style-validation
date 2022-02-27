import declined from '../declined'
import { arrayToObject } from '../../utils'

const declinedIf = (value, options = {}) => {
    const { data = {}, message = null, params = [] } = options
    const paramsObject = arrayToObject(params)

    let declinable = true

    for (let targetField in paramsObject) {
        declinable = paramsObject[targetField] == data[targetField]

        if (!declinable) {
            break
        }
    }

    if (!declinable) {
        return true
    }

    return declined(value, { message })

}

export default declinedIf
