import required from '../required'
import { arrayToObject } from '../../utils'

const requiredIf = (value, options = {}) => {
    const { data = {}, params = [] } = options
    const paramsObject = arrayToObject(params)

    let isRequired = false

    for (let targetField in paramsObject) {
        isRequired = JSON.stringify(paramsObject[targetField]) === JSON.stringify(data[targetField])

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, options)
}

export default requiredIf
