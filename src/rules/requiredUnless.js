import required from './required'
import { arrayToObject } from '../utils'

const requiredUnless = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let isRequired = false

    for (let targetField in params) {
        isRequired = params[targetField] == data[targetField]

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

export const tests = () => {

}