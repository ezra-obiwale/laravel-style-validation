import required from './required'
import { arrayToObject } from '../../utils'

const requiredIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let isRequired = true

    for (let targetField in params) {
        isRequired = params[targetField] == data[targetField]

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export default requiredIf

export const tests = () => {

}