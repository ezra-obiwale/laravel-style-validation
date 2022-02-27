import accepted from '../accepted'
import { arrayToObject } from '../../utils'

const acceptedIf = (value, options = {}) => {
    const { data = {}, message = null, params = [] } = options
    const paramsObject = arrayToObject(params)

    let acceptable = true

    for (let targetField in paramsObject) {
        acceptable = paramsObject[targetField] == data[targetField]

        if (!acceptable) {
            break
        }
    }

    if (!acceptable) {
        return true
    }

    return accepted(value, { message })
}

export default acceptedIf
