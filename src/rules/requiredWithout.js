import required from './required'
import { isEmpty } from '../utils'

const requiredWithout = (value, { message = null, params = [] }) => {
    let isRequired = true

    for (let targetField in params) {
        isRequired = isEmpty(data[targetField])

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export default requiredWithout

export const tests = () => {

}