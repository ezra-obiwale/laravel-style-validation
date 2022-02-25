import required from './required'
import { isEmpty } from '../utils'

export default requiredWithoutAll = (value, { message = null, params = [] }) => {
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

export const tests = () => {

}