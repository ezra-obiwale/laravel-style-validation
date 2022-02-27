import { notIn as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const notIn = (value, { message = null, params = [] }) => {
    const isValid = !params.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default notIn

export const tests = () => {

}