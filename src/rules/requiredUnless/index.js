import required from '../required'
import { arrayToObject } from '../../utils'

const requiredUnless = (value, options = {}) => {
    const { data = {}, message = null, params = [] } = options
    const paramsObject = arrayToObject(params)

    let isRequired = false

    for (let targetField in paramsObject) {
        isRequired = paramsObject[targetField] != data[targetField]

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export default requiredUnless
