import required from './required'
import { isEmpty } from '../utils'

const requiredWith = (value, { data = {}, message = null, params = [] }) => {
    let isRequired = false

    for (let targetField in params) {
        isRequired = !isEmpty(data[targetField])

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export default requiredWith

export const tests = () => {

}