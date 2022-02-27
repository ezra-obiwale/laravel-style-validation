import required from './required'
import { isEmpty } from '../../utils'

const requiredWithAll = (value, { message = null, params = [] }) => {
    let isRequired = true

    for (let targetField in params) {
        isRequired = !isEmpty(data[targetField])

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export default requiredWithAll

export const tests = () => {

}